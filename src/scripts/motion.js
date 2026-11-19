// Scroll entrances, counters, carousel and form feedback.
// Entrances reproduce the reference behavior: an element stays hidden until it
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
  if (slides.length < 2) return;
  let i = 0;

  const show = (n) => {
    i = (n + slides.length) % slides.length;
    slides.forEach((s, k) => {
      s.hidden = k !== i;
      s.classList.toggle('is-active', k === i);
    });
    dots.forEach((d, k) => d.setAttribute('aria-current', k === i ? 'true' : 'false'));
  };
  dots.forEach((d, k) => d.addEventListener('click', () => show(k)));
  show(0);
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

/* ---------- forms: post to the form service named at build time ----------
   PUBLIC_FORM_ENDPOINT is the service URL and PUBLIC_FORM_KEY its public access key (see .env.example).
   With neither set, the form says plainly that nothing was sent. */
const FORM_ENDPOINT = import.meta.env.PUBLIC_FORM_ENDPOINT || '';
const FORM_KEY = import.meta.env.PUBLIC_FORM_KEY || '';
const FORM_TEXT = {
  off: 'This form is not connected to a mailbox yet, so nothing was sent.',
  ok: 'Thank you. Your message has been sent, and we will reply by email.',
  fail: 'Your message could not be sent. Nothing was lost on this page, so please try again in a moment.',
};

document.querySelectorAll('form[data-demo-form]').forEach((form) => {
  const status = form.querySelector('[data-form-status]');
  const button = form.querySelector('button[type="submit"]');
  const say = (kind) => {
    if (!status) return;
    status.textContent = FORM_TEXT[kind];
    status.classList.toggle('is-error', kind !== 'ok');
    status.hidden = false;
    status.focus();
  };

  // A field people never see. Programs that fill every field give themselves away with it.
  const trap = document.createElement('input');
  trap.type = 'checkbox';
  trap.name = 'botcheck';
  trap.tabIndex = -1;
  trap.hidden = true;
  trap.setAttribute('aria-hidden', 'true');
  form.append(trap);

  form.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    if (!form.reportValidity()) return;
    if (!FORM_ENDPOINT) return say('off');
    if (trap.checked) return say('ok');

    const data = Object.fromEntries(new FormData(form));
    delete data.botcheck;
    const name = form.dataset.formName || 'Website form';
    const body = { ...data, subject: `${name}: ${data.company || data.name || ''}`.trim(), from_name: 'SpectraDCIM website', form: name, page: location.pathname };
    if (FORM_KEY) body.access_key = FORM_KEY;

    if (button) button.disabled = true;
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(body),
      });
      const out = await res.json().catch(() => ({}));
      if (!res.ok || out.success === false) throw new Error('rejected');
      form.reset();
      say('ok');
    } catch {
      say('fail');
    } finally {
      if (button) button.disabled = false;
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
