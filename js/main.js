'use strict';
// ── Nav scroll ──────────────────────────────────────────────────
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
  if (header) header.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// ── Mobile menu ─────────────────────────────────────────────────
const burger = document.querySelector('.burger');
if (burger) {
  burger.addEventListener('click', () => {
    const open = header.classList.toggle('menu-open');
    burger.setAttribute('aria-expanded', String(open));
  });
  // Close on nav link click
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.addEventListener('click', () => {
      header.classList.remove('menu-open');
      burger.setAttribute('aria-expanded', 'false');
    });
  });
}

// ── Scroll reveal со stagger-эффектом ───────────────────────────
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const delay = e.target.dataset.delay || 0;
      setTimeout(() => {
        e.target.style.opacity = '1';
        e.target.style.transform = 'none';
        e.target.style.filter = 'none';
      }, delay);
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

// Карточки — каскадное появление
document.querySelectorAll('.cards-grid, .adv-grid').forEach(grid => {
  [...grid.children].forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.filter = 'blur(4px)';
    el.style.transition = 'opacity .6s cubic-bezier(.16,1,.3,1), transform .6s cubic-bezier(.16,1,.3,1), filter .6s';
    el.dataset.delay = i * 90;
    io.observe(el);
  });
});

// Заголовки секций
document.querySelectorAll('.section-title, .about-text').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity .7s cubic-bezier(.16,1,.3,1), transform .7s cubic-bezier(.16,1,.3,1)';
  io.observe(el);
});

// Параллакс hero при скролле
const hero = document.querySelector('.hero-content');
if (hero) {
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y < window.innerHeight) {
      hero.style.transform = `translateY(${y * 0.25}px)`;
      hero.style.opacity = String(1 - y / (window.innerHeight * 0.9));
    }
  }, { passive: true });
}



// ── Form submission ──────────────────────────────────────────────
const form = document.querySelector('.contact-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('[type="submit"]');
    if (!btn) return;
    const orig = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = 'Отправляем...';
    setTimeout(() => {
      btn.innerHTML = '✓ Заявка отправлена!';
      form.reset();
      setTimeout(() => { btn.disabled = false; btn.innerHTML = orig; }, 3000);
    }, 1000);
  });
}
