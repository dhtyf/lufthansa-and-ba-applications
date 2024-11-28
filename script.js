// Initialize Bootstrap components
document.addEventListener('DOMContentLoaded', function() {
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    })
});

// Handle application form display
function showApplicationForm(role) {
    const modal = new bootstrap.Modal(document.getElementById('applicationModal'));
    document.getElementById('jobRole').value = role;
    
    // Update modal title based on role
    const modalTitle = document.querySelector('.modal-title');
    modalTitle.textContent = `${role.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} Application`;
    
    modal.show();
}

// Handle form submission
function submitApplication(event) {
    event.preventDefault();
    
    // Get form data
    const formData = new FormData(document.getElementById('applicationForm'));
    const jobRole = formData.get('jobRole');
    const discordUsername = formData.get('discordUsername');
    const experience = formData.get('experience');
    const timezone = formData.get('timezone');
    const motivation = formData.get('motivation');
    
    // Prepare email content
    const subject = `New ${jobRole.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} Application`;
    const body = `
Job Role: ${jobRole}
Discord Username: ${discordUsername}
Experience: ${experience}
Timezone: ${timezone}
Motivation: ${motivation}
    `.trim();
    
    // Create mailto link
    const mailtoLink = `mailto:lufthansaxbaapply@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Close modal and reset form
    const modal = bootstrap.Modal.getInstance(document.getElementById('applicationModal'));
    modal.hide();
    document.getElementById('applicationForm').reset();
    
    // Show success message
    alert('Thank you for your application! Your email client should now open to send your application.');
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
