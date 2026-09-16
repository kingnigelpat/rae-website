import './style.css'

// ===== 1. Preloader: Hide when page is ready =====
window.addEventListener('load', () => {
  const skeleton = document.getElementById('skeletonLoader');
  if (skeleton) {
    skeleton.classList.add('hidden');
    setTimeout(() => {
      skeleton.style.display = 'none';
      document.body.classList.add('loaded');
    }, 400);
  } else {
    document.body.classList.add('loaded');
  }
});

setTimeout(() => {
  const skeleton = document.getElementById('skeletonLoader');
  if (skeleton && !skeleton.classList.contains('hidden')) {
    skeleton.classList.add('hidden');
    setTimeout(() => {
      skeleton.style.display = 'none';
      document.body.classList.add('loaded');
    }, 400);
  }
}, 2000);

// ===== 2. Smooth Scrolling =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href && href.startsWith('#') && href.length > 1) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
});

// ===== 3. Navbar scroll effect =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 30) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ===== 4. Mobile Navigation Toggle =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    navToggle.classList.toggle('active');
  });
}

window.closeNav = function () {
  if (navLinks && navToggle) {
    navLinks.classList.remove('open');
    navToggle.classList.remove('active');
  }
};

document.addEventListener('click', (e) => {
  if (navLinks && navLinks.classList.contains('open')) {
    if (!navLinks.contains(e.target) && !navToggle.contains(e.target)) {
      window.closeNav();
    }
  }
});

// ===== 5. Fullscreen Certificate Modal =====
const certModal = document.getElementById('certModal');
const openCertBtn = document.getElementById('openCertBtn');
const certWrap = document.getElementById('certWrap');
const certModalCloseBtn = document.getElementById('certModalCloseBtn');
const certModalBackdrop = document.getElementById('certModalBackdrop');

function openModal() {
  if (certModal) {
    certModal.classList.add('active');
    certModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal() {
  if (certModal) {
    certModal.classList.remove('active');
    certModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
}

[openCertBtn, certWrap].forEach(el => {
  if (el) el.addEventListener('click', openModal);
});

[certModalCloseBtn, certModalBackdrop].forEach(el => {
  if (el) el.addEventListener('click', closeModal);
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && certModal && certModal.classList.contains('active')) {
    closeModal();
  }
});