// Initialize Bootstrap components
document.addEventListener('DOMContentLoaded', function() {
    // Initialize tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    });

    // Add event listener to the application form
    const applicationForm = document.getElementById('applicationForm');
    if (applicationForm) {
        applicationForm.addEventListener('submit', handleApplicationSubmit);
    }
});

// Show application form for specific role
function showApplicationForm(role) {
    const modalElement = document.getElementById('applicationModal');
    if (!modalElement) return;

    const modal = new bootstrap.Modal(modalElement);
    const jobRoleInput = document.getElementById('jobRole');
    if (jobRoleInput) {
        jobRoleInput.value = role;
    }

    // Update modal title
    const modalTitle = modalElement.querySelector('.modal-title');
    if (modalTitle) {
        modalTitle.textContent = `${role.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} Application`;
    }

    modal.show();
}

// Handle form submission
function handleApplicationSubmit(event) {
    event.preventDefault();
    
    // Get form values directly
    const jobRole = document.getElementById('jobRole').value;
    const discordUsername = document.getElementById('discordUsername').value;
    const experience = document.getElementById('experience').value;
    const timezone = document.getElementById('timezone').value;
    const motivation = document.getElementById('motivation').value;

    // Basic validation
    if (!discordUsername || !experience || !timezone || !motivation) {
        alert('Please fill in all required fields');
        return;
    }

    // Close modal first
    const modalElement = document.getElementById('applicationModal');
    const modal = bootstrap.Modal.getInstance(modalElement);
    if (modal) {
        modal.hide();
    }

    // Reset form
    event.target.reset();

    // Create email content
    const subject = `New ${jobRole.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} Application`;
    const body = `
Job Role: ${jobRole}
Discord Username: ${discordUsername}
Experience: ${experience}
Timezone: ${timezone}
Motivation: ${motivation}
    `.trim();

    // Create and open mailto link
    const email = 'lufthansaxbaapply@gmail.com';
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Use a small delay to ensure modal is closed first
    requestAnimationFrame(() => {
        location.href = mailtoLink;
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});
