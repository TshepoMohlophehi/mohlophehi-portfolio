// Initialize EmailJS with your Public Key
(function() {
    emailjs.init("nBnRkLs8beq2jewOi"); // Replace with your actual Public Key
  })();
  
  // Handle form submission
  document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const formStatus = document.getElementById('form-status');
  
    if (contactForm) {
      contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Disable button and show sending state
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        formStatus.textContent = '';
        formStatus.className = 'form-status';
  
        // Send email using EmailJS
        emailjs.sendForm(
          'service_tcs5yua', // Replace with your Service ID
          'template_xh51reo', // Replace with your Template ID
          this
        ).then(
          function(response) {
            // Success
            formStatus.textContent = 'Message sent successfully! I\'ll get back to you soon.';
            formStatus.className = 'form-status success';
            contactForm.reset();
          },
          function(error) {
            // Error
            formStatus.textContent = 'Failed to send message. Please try again or email me directly.';
            formStatus.className = 'form-status error';
            console.error('EmailJS error:', error);
          }
        ).finally(function() {
          // Re-enable button
          submitBtn.disabled = false;
          submitBtn.textContent = 'Send Message';
        });
      });
    }
  });