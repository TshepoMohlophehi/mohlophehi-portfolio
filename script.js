const menuIcon = document.querySelector('#menu-icon');
const navLinks = document.querySelector('.nav-links');

menuIcon.onclick = () => {
    navLinks.classList.toggle('active');
}

window.onscroll = () => {
    navLinks.classList.remove('active');
}



const typed = new Typed('.multiple-text', {
    strings: ['Frontend Developer', 'Backend Developer', 'Full Stack Web Developer'],
    typeSpeed: 60,
    backSpeed: 60,
    backDelay: 1000,
    loop: true,
});



document.addEventListener("DOMContentLoaded", function() {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-links a");

  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
            
              navLinks.forEach(link => link.classList.remove("active"));
              
            
              const activeLink = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
              if (activeLink) {
                  activeLink.classList.add("active");
              }
          }
      });
  }, {
      threshold: 0.2
  });

  sections.forEach(section => {
      observer.observe(section);
  });
});