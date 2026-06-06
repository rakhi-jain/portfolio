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

// Bento filters
const filters = document.querySelectorAll('.filter');
const cards = document.querySelectorAll('#bento .card');
filters.forEach(btn => {
  btn.addEventListener('click', () => {
    filters.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.filter;
    cards.forEach(c => {
      const show = f === 'all' || c.dataset.cat === f;
      c.style.display = show ? '' : 'none';
    });
  });
});

// Carousel cards
document.querySelectorAll('.carousel-card').forEach(card => {
  const slides = card.querySelectorAll('.carousel-slide');
  const counter = card.querySelector('.carousel-counter');
  const prev = card.querySelector('.carousel-prev');
  const next = card.querySelector('.carousel-next');
  if (!slides.length) return;

  let current = 0;

  const go = (n) => {
    slides[current].classList.remove('active');
    current = (n + slides.length) % slides.length;
    slides[current].classList.add('active');
    if (counter) counter.textContent = `${current + 1} / ${slides.length}`;
  };

  prev?.addEventListener('click', (e) => { e.stopPropagation(); go(current - 1); });
  next?.addEventListener('click', (e) => { e.stopPropagation(); go(current + 1); });

  // Touch swipe
  let startX = 0;
  card.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; }, { passive: true });
  card.addEventListener('touchend', (e) => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) go(current + (diff > 0 ? 1 : -1));
  });
});

// LinkedIn "see more" toggle
document.querySelectorAll('.li-see-more').forEach(btn => {
  btn.addEventListener('click', () => {
    const body = btn.previousElementSibling;
    const collapsed = body.classList.toggle('collapsed');
    btn.textContent = collapsed ? '…see more' : 'see less';
  });
});

// Reveal on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: 0.1 });
document.querySelectorAll('.section, .hero-inner, .card, .t-card, .video-link-card, .li-card').forEach(el => {
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
