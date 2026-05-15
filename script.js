// Custom cursor
const cursor = document.getElementById('cursor');
if (cursor && window.matchMedia('(hover:hover)').matches) {
  let x = 0, y = 0, tx = 0, ty = 0;
  document.addEventListener('mousemove', (e) => { tx = e.clientX; ty = e.clientY; });
  const loop = () => {
    x += (tx - x) * 0.2; y += (ty - y) * 0.2;
    cursor.style.transform = `translate(${x}px, ${y}px) translate(-50%,-50%)`;
    requestAnimationFrame(loop);
  };
  loop();
  document.querySelectorAll('a, button, .card, .filter').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('grow'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('grow'));
  });
}

// Sticky nav shrink
const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('shrink', window.scrollY > 40);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Hamburger
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  hamburger.classList.toggle('open', open);
  hamburger.setAttribute('aria-expanded', open);
});
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  navLinks.classList.remove('open');
  hamburger.classList.remove('open');
}));

// Filters
const filters = document.querySelectorAll('.filter');
const cards = document.querySelectorAll('#bento .card');
const filterMap = { all: null, posters: 'posters', social: 'social', video: 'video' };
filters.forEach(btn => {
  btn.addEventListener('click', () => {
    filters.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const f = filterMap[btn.dataset.filter];
    cards.forEach(c => {
      const show = !f || c.dataset.cat === f;
      c.style.display = show ? '' : 'none';
    });
  });
});

// Reveal on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.section, .hero-inner, .card, .t-card').forEach(el => {
  el.classList.add('reveal'); io.observe(el);
});

// Contact form
const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(form);
  if (!data.get('name') || !data.get('email') || !data.get('message')) {
    status.textContent = 'Please fill in all fields.';
    status.style.color = 'var(--coral)';
    return;
  }
  status.textContent = "Thanks! I'll get back to you within 24 hours.";
  status.style.color = 'var(--violet)';
  form.reset();
});
