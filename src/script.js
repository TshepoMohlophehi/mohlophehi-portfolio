// Mobile menu toggle
const menuIcon = document.querySelector("#menu-icon");
const navLinks = document.querySelector(".nav-links");

if (menuIcon) {
  menuIcon.onclick = () => {
    navLinks.classList.toggle("active");
  };
}

window.onscroll = () => {
  navLinks.classList.remove("active");
};

// Typed.js animation
const typed = new Typed(".multiple-text", {
  strings: [
    "Frontend Developer",
    "Backend Developer",
    "Software Developer",
    "Full Stack Web Developer",
  ],
  typeSpeed: 60,
  backSpeed: 60,
  backDelay: 1000,
  loop: true,
});

// Active navigation highlight on scroll
document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-links a");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => link.classList.remove("active"));

          const activeLink = document.querySelector(
            `.nav-links a[href="#${entry.target.id}"]`
          );
          if (activeLink) {
            activeLink.classList.add("active");
          }
        }
      });
    },
    {
      threshold: 0.2,
    }
  );

  sections.forEach((section) => {
    observer.observe(section);
  });
});

// Automatic spinning image transition
document.addEventListener("DOMContentLoaded", function () {
  const profileSpin = document.querySelector(".profile-spin");
  if (!profileSpin) return;

  // Function to spin the images
  function spinImages() {
    profileSpin.classList.add("spin");
    
    // Remove the spin class after animation completes
    setTimeout(() => {
      profileSpin.classList.remove("spin");
      
      // Swap which image is considered "active" for next spin
      const imgs = profileSpin.querySelectorAll(".profile-img");
      if (imgs.length >= 2) {
        imgs.forEach(img => img.classList.remove("active-img"));
        // Toggle active class - if first was active, now second becomes active
        const currentlyActive = imgs[0].classList.contains("active-img");
        if (currentlyActive) {
          imgs[1].classList.add("active-img");
        } else {
          imgs[0].classList.add("active-img");
        }
      }
    }, 800); // Match this with CSS transition duration
  }

  // Initial setup - ensure first image is active
  const imgs = profileSpin.querySelectorAll(".profile-img");
  if (imgs.length >= 2) {
    imgs[0].classList.add("active-img");
    imgs[1].classList.remove("active-img");
  }

  // Start spinning immediately
  setTimeout(spinImages, 1000);

  // Set interval for continuous spinning (every 4 seconds)
  setInterval(spinImages, 4000);

  // Add image error handling
  imgs.forEach(img => {
    img.addEventListener('error', function() {
      console.log('Image failed to load:', this.src);
      // Optional: set a fallback image
      // this.src = 'path/to/fallback-image.jpg';
    });
  });
});

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});