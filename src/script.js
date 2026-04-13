/* ============================================================
   script.js — Tshepo Mohlophehi Portfolio
   ============================================================
   CV PASSWORD — change the value below to your own password.
   It is stored encoded to avoid plain-text in source.
   Encode your password: btoa("yourPassword") in the browser console.
   Current password decodes to: TshepoM@2025
   ============================================================ */

const CV_PASS_HASH = "VHNoZXBvTUAyMDI1"; // Change me — base64 of your password

/* ======================================================
   THEME TOGGLE
   ====================================================== */
const themeToggle = document.getElementById("themeToggle");
const themeIcon   = document.getElementById("themeIcon");
const html        = document.documentElement;

function applyTheme(theme) {
  html.setAttribute("data-theme", theme);
  localStorage.setItem("tm-theme", theme);
  if (theme === "light") {
    themeIcon.className = "fa-solid fa-sun";
  } else {
    themeIcon.className = "fa-solid fa-moon";
  }
  // Update canvas particle colours
  if (window.heroParticleSystem) {
    window.heroParticleSystem.updateTheme(theme);
  }
}

// Init theme from localStorage or system preference
(function initTheme() {
  const saved  = localStorage.getItem("tm-theme");
  const system = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  applyTheme(saved || system);
})();

themeToggle?.addEventListener("click", () => {
  const current = html.getAttribute("data-theme");
  applyTheme(current === "dark" ? "light" : "dark");
});

/* ======================================================
   MOBILE NAV
   ====================================================== */
const menuIcon   = document.getElementById("menuIcon");
const navLinks   = document.getElementById("navLinks");
const navBackdrop = document.getElementById("navBackdrop");

function closeNav() {
  navLinks?.classList.remove("active");
  navBackdrop?.classList.remove("active");
  menuIcon?.classList.remove("open");
  menuIcon?.setAttribute("aria-expanded", "false");
}

menuIcon?.addEventListener("click", () => {
  const isOpen = navLinks?.classList.contains("active");
  if (isOpen) {
    closeNav();
  } else {
    navLinks?.classList.add("active");
    navBackdrop?.classList.add("active");
    menuIcon?.classList.add("open");
    menuIcon?.setAttribute("aria-expanded", "true");
  }
});

navBackdrop?.addEventListener("click", closeNav);

// Close nav on scroll
window.addEventListener("scroll", closeNav, { passive: true });

/* ======================================================
   STICKY HEADER
   ====================================================== */
const mainHeader = document.getElementById("mainHeader");
window.addEventListener("scroll", () => {
  if (window.scrollY > 60) {
    mainHeader?.classList.add("scrolled");
  } else {
    mainHeader?.classList.remove("scrolled");
  }
}, { passive: true });

/* ======================================================
   TYPED.JS
   ====================================================== */
new Typed(".multiple-text", {
  strings: ["Frontend Developer","Backend Developer","Software Developer","Full Stack Web Developer"],
  typeSpeed: 62,
  backSpeed: 48,
  backDelay: 1400,
  loop: true,
  smartBackspace: true,
});

/* ======================================================
   ACTIVE NAV ON SCROLL
   ====================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section[id]");
  const links    = document.querySelectorAll(".nav-links a");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          links.forEach((l) => l.classList.remove("active"));
          const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
          active?.classList.add("active");
        }
      });
    },
    { threshold: 0.25 }
  );

  sections.forEach((s) => observer.observe(s));
});

/* ======================================================
   SCROLL PROGRESS BAR
   ====================================================== */
const scrollProgress = document.getElementById("scrollProgress");
window.addEventListener("scroll", () => {
  const scrolled = document.documentElement.scrollTop;
  const total    = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  if (scrollProgress) scrollProgress.style.width = (scrolled / total * 100) + "%";
}, { passive: true });

/* ======================================================
   CUSTOM CURSOR (desktop only)
   ====================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const cursor   = document.getElementById("cursor");
  const follower = document.getElementById("cursorFollower");
  if (!cursor || !follower) return;
  if (window.matchMedia("(max-width:900px)").matches) return;

  let mx = 0, my = 0, fx = 0, fy = 0;

  document.addEventListener("mousemove", (e) => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + "px"; cursor.style.top = my + "px";
  });

  (function animFollow() {
    fx += (mx - fx) * 0.13;
    fy += (my - fy) * 0.13;
    follower.style.left = fx + "px"; follower.style.top = fy + "px";
    requestAnimationFrame(animFollow);
  })();

  document.querySelectorAll("a,button,.skill-card,.project-card,.blog-card,.contact-item").forEach((el) => {
    el.addEventListener("mouseenter", () => { cursor.classList.add("hover"); follower.classList.add("hover"); });
    el.addEventListener("mouseleave", () => { cursor.classList.remove("hover"); follower.classList.remove("hover"); });
  });

  document.addEventListener("mouseleave", () => { cursor.style.opacity = 0; follower.style.opacity = 0; });
  document.addEventListener("mouseenter", () => { cursor.style.opacity = 1; follower.style.opacity = 1; });
});

/* ======================================================
   SCROLL REVEAL
   ====================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const reveals = document.querySelectorAll(".reveal");
  const ro = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        // Small stagger for siblings
        const siblings = Array.from(entry.target.parentElement.querySelectorAll(".reveal"));
        const idx = siblings.indexOf(entry.target);
        setTimeout(() => entry.target.classList.add("visible"), idx * 90);
        ro.unobserve(entry.target);
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
  );
  reveals.forEach((el) => ro.observe(el));
});

/* ======================================================
   STATS COUNTER
   ====================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const statEls = document.querySelectorAll(".stat-num");
  const co = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const target = parseInt(entry.target.dataset.target, 10);
      let current  = 0;
      const step   = Math.ceil(target / 40);
      const timer  = setInterval(() => {
        current += step;
        if (current >= target) { current = target; clearInterval(timer); }
        entry.target.textContent = current;
      }, 30);
      co.unobserve(entry.target);
    });
  }, { threshold: 0.6 });
  statEls.forEach((el) => co.observe(el));
});

/* ======================================================
   PROFILE IMAGE SPIN
   ====================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const profileSpin = document.querySelector(".profile-spin");
  if (!profileSpin) return;
  const imgs = profileSpin.querySelectorAll(".profile-img");
  if (imgs.length < 2) return;

  imgs[0].classList.add("active-img");
  imgs[1].classList.remove("active-img");

  function spin() {
    profileSpin.classList.add("spin");
    setTimeout(() => {
      profileSpin.classList.remove("spin");
      imgs.forEach((img) => img.classList.toggle("active-img"));
    }, 820);
  }

  setTimeout(spin, 2500);
  setInterval(spin, 5500);
});

/* ======================================================
   SMOOTH ANCHOR SCROLL
   ====================================================== */
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const href = a.getAttribute("href");
    if (href === "#") return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    closeNav();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

/* ======================================================
   BLOG CARD NAVIGATION
   ====================================================== */
document.querySelectorAll(".blog-card[data-href]").forEach((card) => {
  card.addEventListener("click", () => {
    window.location.href = card.dataset.href;
  });
  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      window.location.href = card.dataset.href;
    }
  });
});

/* ======================================================
   CV PASSWORD MODAL
   ====================================================== */
const cvBtn        = document.getElementById("cvBtn");
const cvModal      = document.getElementById("cvModal");
const modalClose   = document.getElementById("modalClose");
const cvPassword   = document.getElementById("cvPassword");
const cvSubmit     = document.getElementById("cvSubmit");
const modalError   = document.getElementById("modalError");
const pwToggle     = document.getElementById("cvPasswordToggle");
const pwEyeIcon    = document.getElementById("pwEyeIcon");

// CV file path — update to your actual CV file path
const CV_FILE_PATH = "assets/docs/Tshepo Mohlophehi CV (1).pdf";

function openModal() {
  cvModal?.classList.add("active");
  document.body.style.overflow = "hidden";
  setTimeout(() => cvPassword?.focus(), 350);
  if (cvPassword) cvPassword.value = "";
  if (modalError) modalError.textContent = "";
}

function closeModal() {
  cvModal?.classList.remove("active");
  document.body.style.overflow = "";
}

cvBtn?.addEventListener("click", openModal);
modalClose?.addEventListener("click", closeModal);

// Close on overlay click (not on box click)
cvModal?.addEventListener("click", (e) => {
  if (e.target === cvModal) closeModal();
});

// Close on Escape
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && cvModal?.classList.contains("active")) closeModal();
});

// Show/hide password
pwToggle?.addEventListener("click", () => {
  const isHidden = cvPassword?.type === "password";
  if (cvPassword) cvPassword.type = isHidden ? "text" : "password";
  if (pwEyeIcon) pwEyeIcon.className = isHidden ? "fa-solid fa-eye-slash" : "fa-solid fa-eye";
});

// Submit password
function checkPassword() {
  const entered  = cvPassword?.value?.trim() || "";
  const expected = atob(CV_PASS_HASH);

  if (!entered) {
    showModalError("Please enter a password.");
    return;
  }

  if (entered === expected) {
    // Correct — open CV in new tab
    closeModal();
    window.open(CV_FILE_PATH, "_blank", "noopener");
  } else {
    // Wrong — shake & show error
    showModalError("Incorrect password. Please try again.");
    cvPassword?.classList.add("shake");
    setTimeout(() => cvPassword?.classList.remove("shake"), 500);
    cvPassword.value = "";
    cvPassword.focus();
  }
}

cvSubmit?.addEventListener("click", checkPassword);
cvPassword?.addEventListener("keydown", (e) => {
  if (e.key === "Enter") checkPassword();
  if (modalError) modalError.textContent = "";
});

function showModalError(msg) {
  if (modalError) {
    modalError.textContent = msg;
    modalError.style.animation = "none";
    requestAnimationFrame(() => { modalError.style.animation = ""; });
  }
}

/* ======================================================
   HERO CANVAS — PARTICLE NETWORK
   ====================================================== */
(function initCanvas() {
  const canvas = document.getElementById("heroCanvas");
  if (!canvas) return;

  const ctx    = canvas.getContext("2d");
  let W, H, animId;
  let theme    = document.documentElement.getAttribute("data-theme") || "dark";

  // Particle config
  const CONFIG = {
    dark:  { bg: "transparent", particle: "#00d9f5", line: "0,217,245", count: 70,  speed: 0.35, radius: 2.2, connectDist: 130 },
    light: { bg: "transparent", particle: "#007ac8", line: "0,122,200", count: 55,  speed: 0.3,  radius: 1.8, connectDist: 115 },
  };

  let particles = [];

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x   = Math.random() * W;
      this.y   = Math.random() * H;
      this.vx  = (Math.random() - .5) * CONFIG[theme].speed * 2;
      this.vy  = (Math.random() - .5) * CONFIG[theme].speed * 2;
      this.r   = Math.random() * CONFIG[theme].radius + 1;
      this.alpha = Math.random() * .5 + .3;
    }
    update() {
      this.x += this.vx; this.y += this.vy;
      // Wrap around edges
      if (this.x < -10) this.x = W + 10;
      if (this.x > W + 10) this.x = -10;
      if (this.y < -10) this.y = H + 10;
      if (this.y > H + 10) this.y = -10;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = CONFIG[theme].particle + Math.round(this.alpha * 255).toString(16).padStart(2,"0");
      ctx.fill();
    }
  }

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  function buildParticles() {
    const count = Math.min(CONFIG[theme].count, Math.floor(W / 14));
    particles = Array.from({ length: count }, () => new Particle());
  }

  function drawLines() {
    const dist = CONFIG[theme].connectDist;
    const rgb  = CONFIG[theme].line;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx  = particles[i].x - particles[j].x;
        const dy  = particles[i].y - particles[j].y;
        const d   = Math.sqrt(dx * dx + dy * dy);
        if (d < dist) {
          const alpha = (1 - d / dist) * 0.35;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(${rgb},${alpha})`;
          ctx.lineWidth   = 1;
          ctx.stroke();
        }
      }
    }
  }

  function loop() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach((p) => { p.update(); p.draw(); });
    drawLines();
    animId = requestAnimationFrame(loop);
  }

  // Init
  resize();
  buildParticles();
  loop();

  // Resize handler (debounced)
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      cancelAnimationFrame(animId);
      resize();
      buildParticles();
      loop();
    }, 150);
  }, { passive: true });

  // Expose theme updater
  window.heroParticleSystem = {
    updateTheme(newTheme) {
      theme = newTheme;
      buildParticles();
    }
  };
})();

/* ======================================================
   SHAKE ANIMATION (for modal input)
   Add this CSS dynamically since it's a minor addition
   ====================================================== */
(function addShakeCSS() {
  const style = document.createElement("style");
  style.textContent = `
    @keyframes shake {
      0%,100%{transform:translateX(0);}
      20%{transform:translateX(-8px);}
      40%{transform:translateX(8px);}
      60%{transform:translateX(-5px);}
      80%{transform:translateX(5px);}
    }
    .modal-input-wrap input.shake { animation:shake .4s ease; border-color:#ff7070 !important; }
  `;
  document.head.appendChild(style);
})();
