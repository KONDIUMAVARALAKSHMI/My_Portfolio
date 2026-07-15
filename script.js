/* ═══════════════════════════════════════════════════════
   PORTFOLIO — SCRIPT.JS  (UNESCO Editorial Redesign)
   Loader · Cursor · Typed · Scroll Reveal · Parallax
═══════════════════════════════════════════════════════ */

'use strict';

// ── THEME TOGGLE ──────────────────────────────────────────
let currentTheme = localStorage.getItem('theme') || 'dark';
document.body.dataset.theme = currentTheme;

(function initThemeToggle() {
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;
  const iconMoon = btn.querySelector('.icon-moon');
  const iconSun  = btn.querySelector('.icon-sun');

  function updateIcons() {
    if (currentTheme === 'light') {
      iconMoon.style.display = 'none';
      iconSun.style.display  = 'block';
    } else {
      iconMoon.style.display = 'block';
      iconSun.style.display  = 'none';
    }
  }
  updateIcons();

  btn.addEventListener('click', () => {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.body.dataset.theme = currentTheme;
    localStorage.setItem('theme', currentTheme);
    updateIcons();
  });
})();

// ── CANVAS DUAL-MODE BACKGROUND ───────────────────────────
(function initCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  // ── Dark Mode: Sparkle Stars ──
  function makeStars() {
    const list = [];
    for (let i = 0; i < 180; i++) {
      list.push({
        x: Math.random(), y: Math.random(),
        size: 2 + Math.random() * 6,
        base: 0.15 + Math.random() * 0.4,
        phase: Math.random() * Math.PI * 2,
        speed: 0.0004 + Math.random() * 0.0008,
        isSparkle: Math.random() > 0.8 // 20% are visible 4-point sparkles
      });
    }
    return list;
  }
  let stars = makeStars();
  window.addEventListener('resize', () => { stars = makeStars(); });

  function drawSparkle(x, y, size, alpha) {
    ctx.save();
    ctx.translate(x, y);
    ctx.beginPath();
    ctx.moveTo(0, -size);
    ctx.quadraticCurveTo(0, 0, size, 0);
    ctx.quadraticCurveTo(0, 0, 0, size);
    ctx.quadraticCurveTo(0, 0, -size, 0);
    ctx.quadraticCurveTo(0, 0, 0, -size);
    ctx.fillStyle = `rgba(235, 240, 255, ${alpha})`;
    ctx.fill();
    ctx.restore();
  }

  function drawDarkSky(t) {
    // Soft diagonal Milky Way haze
    ctx.save();
    ctx.translate(W * 0.5, H * 0.5);
    ctx.rotate(-0.45);
    const bw = W * 0.3; const bh = H * 1.6;
    const g = ctx.createLinearGradient(-bw, 0, bw, 0);
    g.addColorStop(0,    'rgba(200,210,255,0)');
    g.addColorStop(0.5,  'rgba(210,220,255,0.035)');
    g.addColorStop(1,    'rgba(200,210,255,0)');
    ctx.fillStyle = g;
    ctx.fillRect(-bw, -bh / 2, bw * 2, bh);
    ctx.restore();

    // Stars
    stars.forEach(s => {
      const alpha = s.base * (0.6 + 0.4 * Math.sin(t * s.speed * 1000 + s.phase));
      const px = s.x * W; const py = s.y * H;
      if (s.isSparkle) {
        drawSparkle(px, py, s.size, alpha * 1.5);
      } else {
        ctx.beginPath();
        ctx.arc(px, py, s.size * 0.25, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(235, 240, 255, ${alpha})`;
        ctx.fill();
      }
    });
  }

  // ── Light Mode: Peaceful Clouds ──
  const clouds = Array.from({ length: 8 }, () => ({
    x: Math.random() * 1.5 - 0.25, // allow starting offscreen
    y: Math.random() * 0.5, // keep in upper 50%
    scale: 0.6 + Math.random() * 2.0,
    speed: 0.00008 + Math.random() * 0.00015,
    opacity: 0.7 + Math.random() * 0.3 // MUCH more opaque/white
  }));

  function drawCloudShape(cx, cy, scale, alpha) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.scale(scale, scale);
    ctx.beginPath();
    // A classic scalable puff shape
    ctx.arc(0, 0, 40, Math.PI * 0.5, Math.PI * 1.5);
    ctx.arc(30, -30, 50, Math.PI * 1, Math.PI * 2);
    ctx.arc(90, -20, 40, Math.PI * 1.2, Math.PI * 2);
    ctx.arc(120, 10, 30, Math.PI * 1.5, Math.PI * 0.5);
    ctx.closePath();
    ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
    ctx.fill();
    ctx.restore();
  }

  function drawLightSky(t, dt) {
    // Add a gentle sunlight gradient glow from the top left
    const g = ctx.createRadialGradient(W*0.2, H*0.1, 0, W*0.2, H*0.1, W*0.8);
    g.addColorStop(0, 'rgba(255, 255, 255, 0.4)');
    g.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);

    clouds.forEach(c => {
      c.x += c.speed * dt * 0.2;
      if (c.x > 1.2) c.x = -0.3; // wrap around
      drawCloudShape(c.x * W, c.y * H, c.scale, c.opacity);
    });
  }

  // ── Render Loop ──
  let last = 0;
  function animate(now) {
    const dt = now - last; last = now;
    ctx.clearRect(0, 0, W, H);

    if (currentTheme === 'dark') {
      drawDarkSky(now);
    } else {
      drawLightSky(now, dt);
    }
    
    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
})();


// ── LOADER ──────────────────────────────────────────────
(function initLoader() {
  const loader = document.getElementById('loader');
  const fill   = document.getElementById('loader-fill');
  if (!loader || !fill) return;

  // Animate bar
  requestAnimationFrame(() => { fill.style.width = '100%'; });

  // Hide after delay
  const hideLoader = () => {
    loader.classList.add('done');
    document.body.style.overflow = '';
  };

  document.body.style.overflow = 'hidden';
  setTimeout(hideLoader, 1800);
})();

// ── CUSTOM CURSOR ────────────────────────────────────────
console.log(
  '%c✦ KUV Portfolio %c Built with Editorial Excellence',
  '...',
  '...'
);

// ===== Minimal Cursor =====

const cursor = document.querySelector(".custom-cursor");

if (cursor) {

    window.addEventListener("mousemove", (e) => {
        cursor.style.left = e.clientX + "px";
        cursor.style.top = e.clientY + "px";
    });

    document.querySelectorAll("a, button, .proj-item").forEach((el) => {

        el.addEventListener("mouseenter", () => {
            cursor.classList.add("hover");
        });

        el.addEventListener("mouseleave", () => {
            cursor.classList.remove("hover");
        });

    });

    window.addEventListener("mousedown", () => {
        cursor.classList.add("click");
    });

    window.addEventListener("mouseup", () => {
        cursor.classList.remove("click");
    });

}

// ── NAVBAR SCROLL ────────────────────────────────────────
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 30);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

// ── HAMBURGER MENU ───────────────────────────────────────
(function initHamburger() {
  const btn  = document.getElementById('hamburger');
  const menu = document.getElementById('mobile-menu');
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    const open = !menu.classList.contains('open');
    menu.classList.toggle('open', open);
    btn.classList.toggle('open', open);
  });

  menu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      menu.classList.remove('open');
      btn.classList.remove('open');
    });
  });
})();

// ── ACTIVE NAV LINK ──────────────────────────────────────
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
        });
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

  sections.forEach(s => obs.observe(s));
})();

// ── TYPED TEXT ───────────────────────────────────────────
(function initTyped() {
  const el = document.getElementById('typed-text');
  if (!el) return;

  const words = [
    'Software Engineer',
    'Full Stack Developer',
    'Backend Developer',
    'AI Application Developer',
    'Software Developer',
  ];
  let wi = 0, ci = 0, deleting = false;
  const SPEED_TYPE = 85, SPEED_DELETE = 40, PAUSE = 2000;

  function type() {
    const word = words[wi];
    if (!deleting) {
      el.textContent = word.slice(0, ++ci);
      if (ci === word.length) { deleting = true; setTimeout(type, PAUSE); return; }
    } else {
      el.textContent = word.slice(0, --ci);
      if (ci === 0) { deleting = false; wi = (wi + 1) % words.length; }
    }
    setTimeout(type, deleting ? SPEED_DELETE : SPEED_TYPE);
  }
  setTimeout(type, 2000); // Wait for loader to finish
})();

// ── SCROLL REVEAL ────────────────────────────────────────
(function initReveal() {
  const els = document.querySelectorAll('.reveal-split, .reveal-fade, .reveal-up, .reveal-slide');
  if (!els.length) return;

  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el  = entry.target;
      const siblings = [...(el.parentElement?.children || [])].filter(c =>
        c.classList.contains('reveal-up') ||
        c.classList.contains('reveal-fade') ||
        c.classList.contains('reveal-slide') ||
        c.classList.contains('reveal-split')
      );
      const idx = siblings.indexOf(el);
      setTimeout(() => el.classList.add('revealed'), Math.max(0, idx) * 90);
      obs.unobserve(el);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  els.forEach(el => obs.observe(el));
})();

// ── SKILL BAR ANIMATION ──────────────────────────────────
(function initSkillBars() {
  const fills = document.querySelectorAll('.sk-fill');
  if (!fills.length) return;

  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      el.style.width = (el.dataset.w || 0) + '%';
      obs.unobserve(el);
    });
  }, { threshold: 0.3 });

  fills.forEach(f => obs.observe(f));
})();

// ── PARALLAX HERO BG LINES ───────────────────────────────
(function initParallax() {
  const lines = document.querySelector('.hero-bg-lines');
  const heroNum = document.querySelector('.hero-number');
  if (!lines) return;

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const sy = window.scrollY;
        if (lines)   lines.style.transform   = `translateY(${sy * 0.25}px)`;
        if (heroNum) heroNum.style.transform = `translateY(${sy * 0.15}px)`;
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
})();

// ── MARQUEE DUPLICATE (ensure seamless) ──────────────────
(function initMarquee() {
  document.querySelectorAll('.marquee-track').forEach(track => {
    const content = track.querySelector('.marquee-content');
    if (!content) return;
    // Clone is already baked in HTML, so just ensure animation is smooth
    // If the content is shorter than viewport, duplicate it
    while (track.scrollWidth < window.innerWidth * 3) {
      const clone = content.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      track.appendChild(clone);
    }
  });
})();

// ── CONTACT FORM ─────────────────────────────────────────
(function initContactForm() {
  const form    = document.getElementById('contact-form');
  const nameEl  = document.getElementById('contact-name');
  const emailEl = document.getElementById('contact-email');
  const msgEl   = document.getElementById('contact-message');
  const nameErr = document.getElementById('name-error');
  const emailErr= document.getElementById('email-error');
  const msgErr  = document.getElementById('message-error');
  const success = document.getElementById('form-success');
  const btnText = document.getElementById('btn-send-text');
  if (!form) return;

  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function setErr(input, errEl, msg) {
    input.classList.toggle('error', !!msg);
    if (errEl) errEl.textContent = msg || '';
  }

  form.addEventListener('submit', async e => {
    e.preventDefault();
    let valid = true;
    const name  = nameEl.value.trim();
    const email = emailEl.value.trim();
    const msg   = msgEl.value.trim();

    if (!name)                  { setErr(nameEl, nameErr, 'Please enter your name.');      valid = false; }
    else                          setErr(nameEl, nameErr, '');

    if (!email)                 { setErr(emailEl, emailErr, 'Please enter your email.');   valid = false; }
    else if (!emailRe.test(email)){ setErr(emailEl, emailErr, 'Please enter a valid email.'); valid = false; }
    else                          setErr(emailEl, emailErr, '');

    if (!msg || msg.length < 10){ setErr(msgEl, msgErr, 'Message must be at least 10 characters.'); valid = false; }
    else                          setErr(msgEl, msgErr, '');

    if (!valid) return;

    const btn = document.getElementById('btn-send');
    btn.disabled = true;
    btnText.textContent = 'Sending…';

    try {
      const res  = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: new FormData(form) });
      const data = await res.json();
      if (data.success) {
        form.reset();
        success.classList.add('show');
        setTimeout(() => success.classList.remove('show'), 6000);
      } else {
        setErr(msgEl, msgErr, data.message || 'Something went wrong. Try again.');
      }
    } catch {
      setErr(msgEl, msgErr, 'Network error. Please try again.');
    } finally {
      btn.disabled = false;
      btnText.textContent = 'Send Message';
    }
  });

  [nameEl, emailEl, msgEl].forEach(el => {
    if (!el) return;
    const errId = el.id.replace('contact-', '') + '-error';
    el.addEventListener('input', () => setErr(el, document.getElementById(errId), ''));
  });
})();

// ── BACK TO TOP ──────────────────────────────────────────
(function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;
  btn.addEventListener('click', e => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

// ── TIMELINE ITEM HOVER NUMBER ───────────────────────────
(function initTimelineEffect() {
  document.querySelectorAll('.tl-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
      item.style.borderLeftColor = 'rgba(201,168,76,0.3)';
    });
    item.addEventListener('mouseleave', () => {
      item.style.borderLeftColor = '';
    });
  });
})();

// ── SMOOTH SECTION ENTRANCE ──────────────────────────────
(function initHeroEntrance() {
  // Hero items are animated via CSS, re-trigger on load just in case
  setTimeout(() => {
    document.querySelectorAll('.hero .hero-heading-line, .hero .hero-eyebrow, .hero .hero-meta, .hero .hero-actions').forEach(el => {
      // These are CSS-animated; no JS needed – just ensure they run after loader
    });
  }, 1900);
})();

console.log(
  '%c✦ KUV Portfolio %c Built with Editorial Excellence',
  'background:#C9A84C;color:#0A0A0F;padding:6px 14px;border-radius:2px 0 0 2px;font-weight:700;font-family:serif;',
  'background:#0F0F1C;color:#C9A84C;padding:6px 14px;border-radius:0 2px 2px 0;font-weight:500;border:1px solid #C9A84C;'
);
