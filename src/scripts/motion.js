// Scroll entrances, counters, carousel and form feedback.
// Entrances reproduce the reference behaviour: an element stays hidden until it
// enters the viewport, then plays once (fade-in-up 1.25 s, or zoom-in).

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- entrances ---------- */
const animated = document.querySelectorAll('[data-anim]');
// Once an entrance has played, drop the animation so its held transform does not block hover lifts.
document.addEventListener('animationend', (ev) => {
  const el = ev.target;
  if (el instanceof Element && el.hasAttribute('data-anim') && el.classList.contains('is-in')) el.classList.add('is-done');
});
if (reduce || !('IntersectionObserver' in window)) {
  animated.forEach((el) => el.classList.add('is-in'));
} else {
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        e.target.classList.add('is-in');
        io.unobserve(e.target);
      }
    },
    { threshold: 0, rootMargin: '0px 0px -4% 0px' },
  );
  animated.forEach((el) => io.observe(el));
}

/* ---------- backdrop drift ----------
   The picture is already pinned by CSS. As its section travels up the screen the picture slides
   down by a few percent of that travel, which reads as a slow-moving background. */
const backdrops = [...document.querySelectorAll('[data-pbg]')];
if (backdrops.length && !reduce) {
  const DRIFT = 0.035;
  const MAX = 64;
  let queued = false;
  const place = () => {
    queued = false;
    const vh = window.innerHeight;
    for (const el of backdrops) {
      const r = el.getBoundingClientRect();
      if (r.bottom < -80 || r.top > vh + 80) continue;
      const py = Math.max(-MAX, Math.min(MAX, -r.top * DRIFT));
      el.style.setProperty('--py', py.toFixed(1) + 'px');
    }
  };
  const ask = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(place);
  };
  window.addEventListener('scroll', ask, { passive: true });
  window.addEventListener('resize', ask, { passive: true });
  place();
}

/* ---------- counters (2 s, like the reference) ---------- */
const counters = document.querySelectorAll('[data-count]');
const fmt = new Intl.NumberFormat('en-US');
function runCounter(el) {
  const to = Number(el.dataset.count);
  const from = Number(el.dataset.from || 0);
  if (reduce) {
    el.textContent = fmt.format(to);
    return;
  }
  const dur = 2000;
  const t0 = performance.now();
  const tick = (t) => {
    const p = Math.min(1, (t - t0) / dur);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = fmt.format(Math.round(from + (to - from) * eased));
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}
if (counters.length && 'IntersectionObserver' in window) {
  const cio = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        runCounter(e.target);
        cio.unobserve(e.target);
      }
    },
    { threshold: 0.4 },
  );
  counters.forEach((el) => cio.observe(el));
}

/* ---------- carousel ---------- */
document.querySelectorAll('[data-carousel]').forEach((root) => {
  const slides = [...root.querySelectorAll('[data-slide]')];
  const dots = [...root.querySelectorAll('[data-dot]')];
  const toggle = root.querySelector('[data-carousel-toggle]');
  if (slides.length < 2) return;
  let i = 0;
  let timer = null;
  let paused = reduce;

  const show = (n) => {
    i = (n + slides.length) % slides.length;
    slides.forEach((s, k) => {
      s.hidden = k !== i;
      s.classList.toggle('is-active', k === i);
    });
    dots.forEach((d, k) => d.setAttribute('aria-current', k === i ? 'true' : 'false'));
  };
  const start = () => {
    stop();
    if (!paused) timer = setInterval(() => show(i + 1), 5000);
  };
  const stop = () => timer && clearInterval(timer);

  dots.forEach((d, k) =>
    d.addEventListener('click', () => {
      show(k);
      start();
    }),
  );
  root.addEventListener('mouseenter', stop);
  root.addEventListener('mouseleave', start);
  root.addEventListener('focusin', stop);
  root.addEventListener('focusout', start);
  if (toggle) {
    const label = () => {
      toggle.setAttribute('aria-pressed', String(paused));
      toggle.textContent = paused ? 'Play' : 'Pause';
    };
    toggle.addEventListener('click', () => {
      paused = !paused;
      label();
      start();
    });
    label();
  }
  show(0);
  start();
});

/* ---------- tabs ---------- */
document.querySelectorAll('[data-tabs]').forEach((root) => {
  const tabs = [...root.querySelectorAll('[role="tab"]')];
  const panels = [...root.querySelectorAll('[role="tabpanel"]')];
  const select = (n) => {
    tabs.forEach((t, k) => {
      t.setAttribute('aria-selected', String(k === n));
      t.tabIndex = k === n ? 0 : -1;
    });
    panels.forEach((p, k) => (p.hidden = k !== n));
  };
  tabs.forEach((t, k) => {
    t.addEventListener('click', () => select(k));
    t.addEventListener('keydown', (ev) => {
      if (ev.key !== 'ArrowRight' && ev.key !== 'ArrowLeft') return;
      const n = (k + (ev.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
      select(n);
      tabs[n].focus();
    });
  });
  select(0);
});

/* ---------- forms: no mailbox is connected yet, so say so instead of pretending ---------- */
document.querySelectorAll('form[data-demo-form]').forEach((form) => {
  form.addEventListener('submit', (ev) => {
    ev.preventDefault();
    if (!form.reportValidity()) return;
    const status = form.querySelector('[data-form-status]');
    if (status) {
      status.hidden = false;
      status.focus();
    }
  });
});

/* ---------- mobile menu ---------- */
const menuBtn = document.querySelector('[data-menu-btn]');
const menu = document.querySelector('[data-menu]');
if (menuBtn && menu) {
  menuBtn.addEventListener('click', () => {
    const open = menu.classList.toggle('is-open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });
  document.addEventListener('keydown', (ev) => {
    if (ev.key === 'Escape' && menu.classList.contains('is-open')) {
      menu.classList.remove('is-open');
      menuBtn.setAttribute('aria-expanded', 'false');
      menuBtn.focus();
    }
  });
}
