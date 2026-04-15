/* ============================================
   ATHARVA DAHOTRE — PORTFOLIO
   main.js
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ─── CUSTOM CURSOR ───
  const dot  = document.getElementById('cur-dot');
  const ring = document.getElementById('cur-ring');
  if (dot && ring) {
    let mx = 0, my = 0, rx = 0, ry = 0;
    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      dot.style.left = mx + 'px';
      dot.style.top  = my + 'px';
    });
    (function animRing() {
      rx += (mx - rx) * .12;
      ry += (my - ry) * .12;
      ring.style.left = rx + 'px';
      ring.style.top  = ry + 'px';
      requestAnimationFrame(animRing);
    })();
    document.querySelectorAll('a, button, .project-card, .exp-cell, .testi-card, .wlogo, .logo-chip, .cs-screen, .cs-nav-card, .cs-stat').forEach(el => {
      el.addEventListener('mouseenter', () => ring.classList.add('h'));
      el.addEventListener('mouseleave', () => ring.classList.remove('h'));
    });
  }

  // ─── THEME TOGGLE ───
  const html      = document.documentElement;
  const toggleBtn = document.getElementById('theme-toggle');
  const thumb     = document.getElementById('theme-toggle-thumb');
  const label     = document.getElementById('theme-label');

  const saved = localStorage.getItem('theme') || 'dark';
  applyTheme(saved);

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const next = html.dataset.theme === 'light' ? 'dark' : 'light';
      applyTheme(next);
      localStorage.setItem('theme', next);
    });
    if (ring) {
      toggleBtn.addEventListener('mouseenter', () => ring.classList.add('h'));
      toggleBtn.addEventListener('mouseleave', () => ring.classList.remove('h'));
    }
  }

  function applyTheme(theme) {
    html.dataset.theme = theme;
    if (thumb)  thumb.textContent  = theme === 'light' ? '🌙' : '☀︎';
    if (label)  label.textContent  = theme === 'light' ? 'Light mode' : 'Dark mode';
  }

  // ─── SCROLL REVEAL ───
  const revObs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
  }, { threshold: .12 });
  document.querySelectorAll('.reveal').forEach(el => revObs.observe(el));

  // ─── HERO WORD REVEAL (index only) ───
  const words = document.querySelectorAll('.hero-h1 .word');
  const desc  = document.querySelector('.hero-desc');
  if (words.length) {
    words.forEach(w => setTimeout(() => w.classList.add('in'), 200));
    if (desc) setTimeout(() => desc.classList.add('in'), 400);
  }

  // ─── FLOATING NAV ───
  const floatNav = document.getElementById('float-nav');
  if (floatNav) setTimeout(() => floatNav.classList.add('in'), 1200);

  // ─── ACTIVE FLOAT NAV SECTION (index) ───
  const fnLinks = document.querySelectorAll('.fn-link');
  if (fnLinks.length) {
    const secObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          fnLinks.forEach(l => l.classList.remove('active'));
          const match = document.querySelector(`.fn-link[href="#${e.target.id}"]`);
          if (match) match.classList.add('active');
        }
      });
    }, { threshold: .3 });
    ['work','expertise','about','testimonials'].forEach(id => {
      const el = document.getElementById(id);
      if (el) secObs.observe(el);
    });
  }

  // ─── SIDEBAR ACTIVE ───
  const sideLinks = document.querySelectorAll('.side-nav a');
  if (sideLinks.length) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      sideLinks.forEach(l => l.classList.remove('active'));
      if (y < 200) sideLinks[0].classList.add('active');
      else if (sideLinks[1]) sideLinks[1].classList.add('active');
    });
  }

  // ─── MAGNETIC BUTTONS ───
  document.querySelectorAll('.cta-primary, .cta-secondary, .btn-msg').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const r  = btn.getBoundingClientRect();
      const dx = (e.clientX - r.left - r.width  / 2) * .2;
      const dy = (e.clientY - r.top  - r.height / 2) * .2;
      btn.style.transform  = `translate(${dx}px,${dy}px)`;
      btn.style.transition = 'transform .1s';
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform  = '';
      btn.style.transition = 'transform .5s cubic-bezier(.16,1,.3,1)';
    });
  });

  // ─── PROJECT CARD TILT ───
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width  - .5) * 6;
      const y = ((e.clientY - r.top)  / r.height - .5) * -6;
      card.style.transform  = `perspective(900px) rotateY(${x}deg) rotateX(${y}deg)`;
      card.style.transition = 'transform .1s';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform  = '';
      card.style.transition = 'transform .6s cubic-bezier(.16,1,.3,1)';
    });
  });

  // ─── COUNT-UP STATS ───
  function countUp(el, target) {
    let n = 0; const step = target / 36;
    const t = setInterval(() => {
      n = Math.min(n + step, target);
      el.textContent = Math.floor(n) + '+';
      if (n >= target) clearInterval(t);
    }, 40);
  }

  // Index about stats
  const aboutSection = document.getElementById('about');
  if (aboutSection) {
    const statsObs = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          document.querySelectorAll('.about-stat-num').forEach(el => {
            const v = parseInt(el.textContent);
            if (!isNaN(v)) countUp(el, v);
          });
          statsObs.disconnect();
        }
      });
    }, { threshold: .5 });
    statsObs.observe(aboutSection);
  }

  // Case study stat count-up
  const csStatNums = document.querySelectorAll('.cs-stat-num[data-count]');
  if (csStatNums.length) {
    const csObs = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          const el     = en.target;
          const target = parseFloat(el.dataset.count);
          const suffix = el.dataset.suffix || '';
          const prefix = el.dataset.prefix || '';
          const isFloat = String(target).includes('.');
          let n = 0;
          const step = target / 40;
          const t = setInterval(() => {
            n = Math.min(n + step, target);
            el.textContent = prefix + (isFloat ? n.toFixed(2) : Math.floor(n)) + suffix;
            if (n >= target) clearInterval(t);
          }, 40);
          csObs.unobserve(el);
        }
      });
    }, { threshold: .5 });
    csStatNums.forEach(el => csObs.observe(el));
  }

  // ─── CS SCREEN HOVER TILT ───
  document.querySelectorAll('.cs-screen').forEach(screen => {
    screen.addEventListener('mousemove', e => {
      const r = screen.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width  - .5) * 8;
      const y = ((e.clientY - r.top)  / r.height - .5) * -8;
      screen.style.transform  = `perspective(700px) rotateY(${x}deg) rotateX(${y}deg) translateY(-2px)`;
      screen.style.transition = 'transform .1s';
    });
    screen.addEventListener('mouseleave', () => {
      screen.style.transform  = '';
      screen.style.transition = 'transform .5s cubic-bezier(.16,1,.3,1)';
    });
  });

});
