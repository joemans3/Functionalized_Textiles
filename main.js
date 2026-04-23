// Nav scroll effect
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// Mobile hamburger (toggles a simple class — extend as needed)
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav__links');
hamburger.addEventListener('click', () => {
  const open = navLinks.style.display === 'flex';
  navLinks.style.cssText = open
    ? ''
    : 'display:flex;flex-direction:column;position:absolute;top:64px;left:0;right:0;background:rgba(6,8,16,0.97);padding:24px;gap:20px;border-bottom:1px solid rgba(255,255,255,0.08)';
});

// Fade-in on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(
  '.tech-card, .app-card, .stimulus, .team-card, .stat'
).forEach(el => {
  el.style.cssText += 'opacity:0;transform:translateY(20px);transition:opacity 0.5s ease,transform 0.5s ease';
  observer.observe(el);
});

// Contact form
document.getElementById('contact-form').addEventListener('submit', async e => {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  btn.textContent = 'Sending…';
  btn.disabled = true;

  const res = await fetch('https://formspree.io/f/xojyyebn', {
    method: 'POST',
    headers: { 'Accept': 'application/json' },
    body: new FormData(e.target),
  });

  if (res.ok) {
    btn.textContent = 'Message sent!';
    btn.style.background = '#00a382';
    e.target.reset();
  } else {
    btn.textContent = 'Something went wrong — try again';
    btn.disabled = false;
  }
});
