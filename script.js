// ===== PARTICLES =====
(function(){
  const c = document.getElementById('particles');
  for(let i = 0; i < 30; i++){
    const p = document.createElement('div');
    p.className = 'particle';
    const left = Math.random() * 100;
    const dur = 8 + Math.random() * 12;
    const delay = Math.random() * 15;
    const drift = (Math.random() - 0.5) * 200;
    p.style.cssText = `left:${left}%;--dur:${dur}s;--delay:-${delay}s;--drift:${drift}px;`;
    c.appendChild(p);
  }
})();

// ===== CURSOR =====
const cur = document.getElementById('cur');
const curR = document.getElementById('curR');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cur.style.left = mx + 'px'; cur.style.top = my + 'px';
});
(function loop(){
  rx += (mx - rx) * .1; ry += (my - ry) * .1;
  curR.style.left = rx + 'px'; curR.style.top = ry + 'px';
  requestAnimationFrame(loop);
})();
document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cur.style.width = '18px'; cur.style.height = '18px';
    curR.style.width = '60px'; curR.style.height = '60px';
    curR.style.borderColor = 'rgba(0,229,255,.8)';
  });
  el.addEventListener('mouseleave', () => {
    cur.style.width = '10px'; cur.style.height = '10px';
    curR.style.width = '38px'; curR.style.height = '38px';
    curR.style.borderColor = 'rgba(0,229,255,.5)';
  });
});

// ===== NAV SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// ===== MOBILE MENU =====
function toggleMobile() {
  document.getElementById('hamburger').classList.toggle('open');
  document.getElementById('mobileMenu').classList.toggle('open');
  document.body.style.overflow = document.getElementById('mobileMenu').classList.contains('open') ? 'hidden' : '';
}
function closeMobile() {
  document.getElementById('hamburger').classList.remove('open');
  document.getElementById('mobileMenu').classList.remove('open');
  document.body.style.overflow = '';
}

// ===== SCROLL REVEAL =====
const revealObs = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if(e.isIntersecting) setTimeout(() => e.target.classList.add('on'), i * 60);
  });
}, { threshold: .07 });
document.querySelectorAll('.rv, .rv-l, .rv-r').forEach(el => revealObs.observe(el));

// ===== SKILL BARS =====
const skillObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if(e.isIntersecting) {
      e.target.querySelectorAll('.sk-fill').forEach(b => {
        b.style.width = b.dataset.w + '%';
      });
    }
  });
}, { threshold: .25 });
document.querySelectorAll('#skillBars').forEach(el => skillObs.observe(el));

// ===== TYPING ANIMATION =====
const words = ['Developer.', 'AI Expert.', 'Problem Solver.', 'Your Partner.'];
let wi = 0, ci = 0, del = false;
const typed = document.getElementById('typed');
function typeLoop() {
  const w = words[wi];
  if(!del) {
    typed.textContent = w.slice(0, ci + 1); ci++;
    if(ci === w.length) { del = true; setTimeout(typeLoop, 2000); return; }
  } else {
    typed.textContent = w.slice(0, ci - 1); ci--;
    if(ci === 0) { del = false; wi = (wi + 1) % words.length; }
  }
  setTimeout(typeLoop, del ? 55 : 100);
}
if(typed) typeLoop();

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if(t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
  });
});

// ===== TILT EFFECT =====
document.querySelectorAll('.proj, .srv').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - .5;
    const y = (e.clientY - r.top) / r.height - .5;
    card.style.transform = `translateY(-8px) rotateX(${-y * 5}deg) rotateY(${x * 5}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ===== DEAD LINK TOOLTIP =====
document.querySelectorAll('.dead-badge').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.textContent = '⏳ Coming Soon...';
    setTimeout(() => { btn.textContent = '⚠️ Link Not Available'; }, 1500);
  });
});

// ===== COUNTER ANIMATION =====
function animCount(el, target, suffix = '+') {
  let n = 0;
  const step = target / 60;
  const t = setInterval(() => {
    n += step;
    if(n >= target) { n = target; clearInterval(t); }
    el.textContent = Math.floor(n) + suffix;
  }, 25);
}
const countObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if(e.isIntersecting) {
      e.target.querySelectorAll('[data-count]').forEach(el => {
        animCount(el, parseInt(el.dataset.count), el.dataset.suffix || '+');
      });
      countObs.unobserve(e.target);
    }
  });
}, { threshold: .3 });
document.querySelectorAll('.stats-bar').forEach(el => countObs.observe(el));
