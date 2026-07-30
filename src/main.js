import './style.css'

// ===== 1. Skeleton Loader: Hide on page load =====
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

// Fallback: hide skeleton after 3s even if load event is slow
setTimeout(() => {
  const skeleton = document.getElementById('skeletonLoader');
  if (skeleton && !skeleton.classList.contains('hidden')) {
    skeleton.classList.add('hidden');
    setTimeout(() => {
      skeleton.style.display = 'none';
      document.body.classList.add('loaded');
    }, 400);
  }
}, 3000);

// ===== 2. Smooth scrolling for anchor links =====
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

// ===== 3. Navbar background change on scroll =====
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ===== 4. Mobile nav toggle =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  navToggle.classList.toggle('active');
});

window.closeNav = function () {
  navLinks.classList.remove('open');
  navToggle.classList.remove('active');
};

// ===== 5. Scroll Reveal with IntersectionObserver =====
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all sections and cards
document.querySelectorAll(
  '.product-card, .feature-item, .how-step, .testimonial-card, ' +
  '.about-stat, .about-grid, .cta-content, .hero-stats, ' +
  '.section-header, .footer-content'
).forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

// ===== 6. 3D Card Tilt Effect =====
const tiltCards = document.querySelectorAll('.product-card, .feature-item, .testimonial-card');

tiltCards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / centerY * -8;
    const rotateY = (x - centerX) / centerX * 8;

    card.style.transform = `
      perspective(1200px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      translateY(-6px)
    `;
    card.style.boxShadow = `
      ${(x - centerX) / centerX * 10}px
      ${(y - centerY) / centerY * 10}px
      30px
      rgba(212, 168, 67, 0.1)
    `;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.boxShadow = '';
    card.style.transition = 'transform 0.5s ease, box-shadow 0.5s ease';
    setTimeout(() => {
      card.style.transition = '';
    }, 500);
  });
});

// ===== 7. Parallax Glow on Hero =====
const hero = document.querySelector('.hero');
if (hero) {
  hero.addEventListener('mousemove', (e) => {
    const glow = hero.querySelector('.hero-bg-glow');
    if (glow) {
      const rect = hero.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 30;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 30;
      glow.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
    }
  });
}

// ===== 8. Counter Animation for Stats =====
function animateCounter(el, target) {
  const duration = 1500;
  const step = Math.max(1, Math.floor(target / 60));
  let current = 0;
  const increment = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(increment);
    }
    el.textContent = current + (target > 1000 ? '+' : '');
  }, duration / 60);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const text = el.textContent.trim();
      const num = parseInt(text.replace(/[^0-9]/g, ''));
      if (!isNaN(num)) {
        el.textContent = '0';
        animateCounter(el, num);
      }
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.hero-stat-num, .about-stat-num').forEach(el => {
  counterObserver.observe(el);
});