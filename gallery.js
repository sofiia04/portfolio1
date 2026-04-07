/**
 * Sofiia Vorona — Portfolio JS
 * Pure vanilla JS, no frameworks.
 *
 * HOW TO ADD A NEW WORK:
 *   1. Open works.json
 *   2. Find the right category array
 *   3. Add: { "id": "GOOGLE_DRIVE_FILE_ID" }
 *   4. Optionally: { "id": "...", "title": "My Title", "type": "video" }
 *   Done. No other changes needed.
 */

'use strict';

/* ── Helpers ──────────────────────────────────────────────── */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
const gdUrl = id => `https://lh3.googleusercontent.com/d/${id}`;

/* ── i18n ─────────────────────────────────────────────────── */
const STRINGS = {
  pl: {
    'nav.gallery':     'Galeria',
    'nav.about':       'O mnie',
    'nav.services':    'Usługi',
    'nav.contact':     'Kontakt',
    'hero.eyebrow':    'Graphic Designer — Poznań',
    'hero.subtitle':   'Ilustracja · Branding · Animacja · 3D',
    'hero.desc':       'Tworzę projekty, przez które można poczuć emocję, nastrój, charakter. Łączę kreatywność z funkcjonalnością i klarowną komunikacją wizualną.',
    'hero.cta1':       'Zobacz prace',
    'hero.cta2':       'Kontakt',
    'hero.works':      'Prac w portfolio',
    'hero.cats':       'Kategorii',
    'gallery.tag':     'Portfolio',
    'gallery.title':   'Wybrane<br><em>Prace</em>',
    'gallery.works':   'prac',
    'gallery.showall': 'Zobacz wszystkie prace',
    'gallery.back':    'Powrót do kategorii',
    'cat.all':         'Wszystkie',
    'lb.close':        '✕  Zamknij',
    'about.tag':       'O mnie',
    'about.title':     'Tworzę<br><em>z emocją</em>',
    'about.p1':        'Nazywam się Sofiia i specjalizuję się w projektowaniu graficznym. Od ponad trzech lat mieszkam w Poznaniu, gdzie ukończyłam studia w Collegium Da Vinci.',
    'about.p2':        'W projektowaniu łączę kreatywność z funkcjonalnością, dbając o estetykę, spójność wizualną i klarowną komunikację. Najważniejsze jest to, żeby przez design można było poczuć emocję, nastrój, charakter.',
    'about.tools':     'Narzędzia',
    'services.tag':    'Zakres usług',
    'services.title':  'Co<br><em>robię</em>',
    'services.see':    'Zobacz prace',
    's1.name':         'Ilustracja<br>& Postacie',
    's1.desc':         'Cyfrowe ilustracje, projekty postaci, rysunek ołówkiem i kolorowy — od szkicu po gotowy plik.',
    's2.name':         'Logo<br>& Branding',
    's2.desc':         'Logotypy, identyfikacja wizualna, plakaty i kompleksowy branding dla firm i projektów.',
    's3.name':         'Animacja<br>& 3D',
    's3.desc':         'Animacje 2D frame by frame, modelowanie i wizualizacje 3D, motion graphics.',
    's4.name':         'Druk<br>& Wydawnictwo',
    's4.desc':         'Projekty do druku: wizytówki, odzież, publikacje, książki, materiały promocyjne.',
    'cv.tag':          'Doświadczenie',
    'cv.title':        'Droga<br><em>zawodowa</em>',
    'cv.work':         'Praca',
    'cv.edu':          'Edukacja',
    'cv.present':      'obecnie',
    'contact.tag':     'Napisz do mnie',
    'contact.title':   'Zróbmy coś<br><em>razem</em>',
    'showcase.cat':    'Kategoria',
    'works.1':         'praca',
    'works.24':        'prace',
    'works.5':         'prac',
  },
  en: {
    'nav.gallery':     'Gallery',
    'nav.about':       'About',
    'nav.services':    'Services',
    'nav.contact':     'Contact',
    'hero.eyebrow':    'Graphic Designer — Poznań',
    'hero.subtitle':   'Illustration · Branding · Animation · 3D',
    'hero.desc':       'I create projects through which you can feel emotion, mood, character. I combine creativity with functionality and clear visual communication.',
    'hero.cta1':       'View works',
    'hero.cta2':       'Contact',
    'hero.works':      'Works in portfolio',
    'hero.cats':       'Categories',
    'gallery.tag':     'Portfolio',
    'gallery.title':   'Selected<br><em>Works</em>',
    'gallery.works':   'works',
    'gallery.showall': 'View all works',
    'gallery.back':    'Back to categories',
    'cat.all':         'All',
    'lb.close':        '✕  Close',
    'about.tag':       'About me',
    'about.title':     'I create<br><em>with emotion</em>',
    'about.p1':        'My name is Sofiia and I specialize in graphic design. For over three years I have lived in Poznań, where I graduated from Collegium Da Vinci.',
    'about.p2':        'In design I combine creativity with functionality, focusing on aesthetics, visual consistency and clear communication. The most important thing is that through design one can feel emotion, mood and character.',
    'about.tools':     'Tools',
    'services.tag':    'Services',
    'services.title':  'What<br><em>I do</em>',
    'services.see':    'See works',
    's1.name':         'Illustration<br>& Characters',
    's1.desc':         'Digital illustrations, character design, pencil and colour drawing — from sketch to final file.',
    's2.name':         'Logo<br>& Branding',
    's2.desc':         'Logotypes, visual identity, posters and comprehensive branding for businesses and projects.',
    's3.name':         'Animation<br>& 3D',
    's3.desc':         'Frame-by-frame 2D animation, 3D modelling and visualisation, motion graphics.',
    's4.name':         'Print<br>& Publishing',
    's4.desc':         'Print projects: business cards, clothing, publications, books, promotional materials.',
    'cv.tag':          'Experience',
    'cv.title':        'Career<br><em>path</em>',
    'cv.work':         'Work',
    'cv.edu':          'Education',
    'cv.present':      'present',
    'contact.tag':     'Get in touch',
    'contact.title':   'Let\'s create<br><em>together</em>',
    'showcase.cat':    'Category',
    'works.1':         'work',
    'works.24':        'works',
    'works.5':         'works',
  }
};

let lang = 'pl';

function t(key) {
  return (STRINGS[lang] || STRINGS.pl)[key] || key;
}

function worksPlural(n) {
  if (lang === 'en') return n === 1 ? t('works.1') : t('works.5');
  if (n === 1) return t('works.1');
  if (n >= 2 && n <= 4) return t('works.24');
  return t('works.5');
}

function getCatLabel(cat, data) {
  if (!data) return cat;
  const found = data.categories.find(c => c.id === cat);
  return found ? (found.label[lang] || found.label.pl) : cat;
}

function applyTranslations() {
  $$('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    const val = t(key);
    if (val) el.innerHTML = val;
  });
}

/* ── Language switcher ─────────────────────────────────────── */
function setLang(newLang, data) {
  lang = newLang;
  $$('.lang__btn').forEach(b => b.classList.toggle('is-active', b.dataset.lang === lang));
  applyTranslations();
  if (data) {
    renderShowcase(data);
    buildCatFilter(data);
    if (galleryState.open) {
      filterGallery(galleryState.cat, data);
    }
  }
}

/* ── Cursor ────────────────────────────────────────────────── */
function initCursor() {
  const dot  = document.createElement('div');
  const ring = document.createElement('div');
  dot.className  = 'cursor';
  ring.className = 'cursor cursor--ring';
  document.body.prepend(ring);
  document.body.prepend(dot);

  let mx = -60, my = -60, rx = -60, ry = -60;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
  });

  (function loop() {
    rx += (mx - rx) * .12;
    ry += (my - ry) * .12;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(loop);
  })();

  function addHover(el) {
    el.addEventListener('mouseenter', () => { dot.classList.add('cursor--hover'); ring.classList.add('cursor--hover'); });
    el.addEventListener('mouseleave', () => { dot.classList.remove('cursor--hover'); ring.classList.remove('cursor--hover'); });
  }

  // bind once and re-bind on gallery render
  window._bindCursorHover = () => {
    $$('a, button, .showcase__item, .gallery-item, .cat-filter__btn, .service-card').forEach(addHover);
  };
  window._bindCursorHover();
}

/* ── Scroll reveal ─────────────────────────────────────────── */
function initReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('is-visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.07 });

  $$('.reveal').forEach(el => obs.observe(el));
}

/* ── Nav (mobile drawer + scroll class) ──────────────────────*/
function initNav() {
  const nav       = $('.nav');
  const hamburger = $('.nav__hamburger');
  if (!hamburger) return;

  hamburger.addEventListener('click', () => nav.classList.toggle('nav--open'));
  $$('.nav__drawer a').forEach(a => a.addEventListener('click', () => nav.classList.remove('nav--open')));

  window.addEventListener('scroll', () => {
    nav.classList.toggle('nav--scrolled', window.scrollY > 40);
  }, { passive: true });
}

/* ── Hero parallax ─────────────────────────────────────────── */
function initHeroParallax() {
  const photo = $('.hero__photo');
  if (!photo) return;
  document.addEventListener('mousemove', e => {
    const x = (e.clientX / window.innerWidth  - .5) * 6;
    const y = (e.clientY / window.innerHeight - .5) * 6;
    photo.style.transform = `scale(1.05) translate(${x * .4}px, ${y * .4}px)`;
  }, { passive: true });
}

/* ── Marquee (duplicate content for seamless loop) ──────────── */
function initMarquee() {
  const track = $('.marquee__track');
  if (!track) return;
  // Already doubled in HTML for seamless loop
}

/* ══════════════════════════════════════════════════════════════
   GALLERY ENGINE
   ══════════════════════════════════════════════════════════════ */
const galleryState = {
  open:     false,
  cat:      'all',
  filtered: [],
  lbIdx:    0,
};

/* ── Load data ─────────────────────────────────────────────── */
async function loadData() {
  const res  = await fetch('works.json');
  const data = await res.json();
  return data;
}

/* ── Build flat project list ───────────────────────────────── */
function flatProjects(data) {
  return data.categories.flatMap(cat =>
    cat.works.map(w => ({
      id:    w.id,
      cat:   cat.id,
      title: w.title || '',
      type:  w.type  || 'image',
    }))
  );
}

/* ── Hero stats ────────────────────────────────────────────── */
function updateHeroStats(data) {
  const projects = flatProjects(data);
  const countEl  = document.getElementById('heroCount');
  const catsEl   = document.getElementById('heroCats');
  if (countEl) countEl.textContent = projects.length;
  if (catsEl)  catsEl.textContent  = data.categories.length;
  const countNum = document.getElementById('countNum');
  if (countNum)  countNum.textContent = projects.length;
}

/* ── Showcase (one card per category) ──────────────────────── */
function renderShowcase(data) {
  const grid = document.getElementById('showcaseGrid');
  if (!grid) return;
  grid.innerHTML = '';

  data.categories.forEach(cat => {
    if (!cat.works.length) return;
    const first  = cat.works[0];
    const label  = cat.label[lang] || cat.label.pl;
    const count  = cat.works.length;
    const icon   = cat.icon || '';

    const div = document.createElement('div');
    div.className = 'showcase__item';
    div.setAttribute('role', 'button');
    div.setAttribute('tabindex', '0');
    div.setAttribute('aria-label', label);
    div.innerHTML = `
      <img class="showcase__img" src="${gdUrl(first.id)}" alt="${label}" loading="lazy">
      <div class="showcase__overlay">
        <div class="showcase__label">${t('showcase.cat')} ${icon}</div>
        <div class="showcase__name">${label}</div>
        <div class="showcase__count">${count}&nbsp;${worksPlural(count)}</div>
      </div>
      <div class="showcase__arrow" aria-hidden="true">
        <svg viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </div>`;

    const open = () => openFullGallery(cat.id, data);
    div.addEventListener('click', open);
    div.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') open(); });
    grid.appendChild(div);
  });

  window._bindCursorHover && window._bindCursorHover();
}

/* ── Category filter buttons ───────────────────────────────── */
function buildCatFilter(data) {
  const wrap = document.getElementById('catButtons');
  if (!wrap) return;
  wrap.innerHTML = '';

  const all = document.createElement('button');
  all.className  = 'cat-filter__btn' + (galleryState.cat === 'all' ? ' is-active' : '');
  all.dataset.cat = 'all';
  all.textContent = `${t('cat.all')} (${flatProjects(data).length})`;
  all.addEventListener('click', () => filterGallery('all', data));
  wrap.appendChild(all);

  data.categories.forEach(cat => {
    const label = cat.label[lang] || cat.label.pl;
    const btn   = document.createElement('button');
    btn.className  = 'cat-filter__btn' + (galleryState.cat === cat.id ? ' is-active' : '');
    btn.dataset.cat = cat.id;
    btn.textContent = `${label} (${cat.works.length})`;
    btn.addEventListener('click', () => filterGallery(cat.id, data));
    wrap.appendChild(btn);
  });

  window._bindCursorHover && window._bindCursorHover();
}

/* ── Render gallery grid ───────────────────────────────────── */
function renderGalleryGrid(items, data) {
  const grid = document.getElementById('galleryGrid');
  if (!grid) return;
  grid.innerHTML = '';

  items.forEach((p, idx) => {
    const catLabel = getCatLabel(p.cat, data);
    const isVideo  = p.type === 'video';

    const item = document.createElement('div');
    item.className = 'gallery-item';
    item.setAttribute('role', 'button');
    item.setAttribute('tabindex', '0');
    item.setAttribute('aria-label', p.title || catLabel);

    item.innerHTML = `
      <img class="gallery-item__img" src="${gdUrl(p.id)}"
           alt="${p.title || catLabel}" loading="lazy">
      ${isVideo ? `
        <div class="video-badge" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
            <polygon points="5,3 19,12 5,21"/>
          </svg>
        </div>` : ''}
      <div class="gallery-item__overlay">
        <div class="gallery-item__cat">${catLabel}</div>
        <div class="gallery-item__title">${p.title}</div>
      </div>
      <button class="gallery-item__expand" aria-label="Expand" tabindex="-1">
        <svg viewBox="0 0 24 24"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
      </button>`;

    const openLb = e => { e.stopPropagation(); openLightbox(idx); };
    item.addEventListener('click', () => openLightbox(idx));
    item.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') openLightbox(idx); });
    item.querySelector('.gallery-item__expand').addEventListener('click', openLb);
    grid.appendChild(item);
  });

  window._bindCursorHover && window._bindCursorHover();
}

/* ── Open full gallery ─────────────────────────────────────── */
function openFullGallery(cat, data) {
  const showcaseWrap = document.getElementById('showcaseWrap');
  const fullWrap     = document.getElementById('fullGalleryWrap');
  if (showcaseWrap) showcaseWrap.style.display = 'none';
  if (fullWrap)     fullWrap.classList.add('is-visible');
  galleryState.open = true;
  filterGallery(cat, data);
  document.getElementById('gallery-section')?.scrollIntoView({ behavior: 'smooth' });
}

/* ── Close full gallery ────────────────────────────────────── */
function closeFullGallery() {
  const showcaseWrap = document.getElementById('showcaseWrap');
  const fullWrap     = document.getElementById('fullGalleryWrap');
  if (showcaseWrap) showcaseWrap.style.display = '';
  if (fullWrap)     fullWrap.classList.remove('is-visible');
  galleryState.open = false;
  document.getElementById('gallery-section')?.scrollIntoView({ behavior: 'smooth' });
}

/* ── Filter ────────────────────────────────────────────────── */
function filterGallery(cat, data) {
  galleryState.cat = cat;

  // update filter buttons
  $$('.cat-filter__btn').forEach(b => b.classList.toggle('is-active', b.dataset.cat === cat));

  const all = flatProjects(data);
  galleryState.filtered = cat === 'all' ? all : all.filter(p => p.cat === cat);

  const label = cat === 'all'
    ? t('cat.all') + ' — ' + t('gallery.works')
    : getCatLabel(cat, data);

  const titleEl = document.getElementById('fullGalleryTitle');
  if (titleEl) titleEl.textContent = `${label} (${galleryState.filtered.length})`;

  const grid = document.getElementById('galleryGrid');
  if (grid) {
    grid.style.opacity = '0';
    grid.style.transform = 'translateY(12px)';
    setTimeout(() => {
      renderGalleryGrid(galleryState.filtered, data);
      requestAnimationFrame(() => {
        grid.style.transition = 'opacity 320ms, transform 320ms';
        grid.style.opacity    = '1';
        grid.style.transform  = 'translateY(0)';
      });
    }, 240);
  }
}

/* ── Service card → gallery link ───────────────────────────── */
window.filterToCategory = function(cat, data) {
  openFullGallery(cat, data);
};

/* ══════════════════════════════════════════════════════════════
   LIGHTBOX
   ══════════════════════════════════════════════════════════════ */
function openLightbox(idx) {
  galleryState.lbIdx = idx;
  const p    = galleryState.filtered[idx];
  const lb   = document.getElementById('lightbox');
  const img  = document.getElementById('lbImg');
  const wrap = document.getElementById('lbMediaWrap');

  // remove any previous iframe
  const old = wrap.querySelector('iframe');
  if (old) old.remove();

  if (p.type === 'video') {
    img.style.display = 'none';
    const iframe = document.createElement('iframe');
    iframe.src   = `https://drive.google.com/file/d/${p.id}/preview`;
    iframe.allow = 'autoplay';
    iframe.setAttribute('allowfullscreen', '');
    iframe.style.cssText = [
      'display:block',
      'width:min(72vw, 900px)',
      `height:calc(min(72vw, 900px) * 9 / 16)`,
      'max-height:80vh',
      'border:none',
      'outline:1px solid rgba(107,191,114,.12)',
    ].join(';');
    wrap.insertBefore(iframe, img);
  } else {
    img.style.display = 'block';
    img.style.opacity = '0';
    img.src = gdUrl(p.id);
    img.onload = () => { img.style.transition = 'opacity .3s'; img.style.opacity = '1'; };
  }

  document.getElementById('lbTag').textContent     = '';
  document.getElementById('lbTitle').textContent   = p.title;
  document.getElementById('lbClose').innerHTML     = t('lb.close');
  document.getElementById('lbCounter').textContent = `${idx + 1} / ${galleryState.filtered.length}`;

  lb.classList.add('is-open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const lb     = document.getElementById('lightbox');
  const iframe = lb.querySelector('iframe');
  if (iframe) iframe.src = iframe.src; // stop playback
  lb.classList.remove('is-open');
  document.body.style.overflow = '';
}

function lbNav(dir) {
  const len = galleryState.filtered.length;
  galleryState.lbIdx = (galleryState.lbIdx + dir + len) % len;
  openLightbox(galleryState.lbIdx);
}

/* ── Email obfuscation ─────────────────────────────────────── */
function initEmail() {
  const el = document.getElementById('emailLink');
  if (!el) return;
  const u = 'vorona.sofiia', d = 'gmail.com';
  el.href = `mailto:${u}@${d}`;
  el.textContent = `${u}@${d}`;
}

/* ── Loader ────────────────────────────────────────────────── */
function hideLoader() {
  const loader = document.getElementById('loader');
  if (!loader) return;
  setTimeout(() => loader.classList.add('is-done'), 1300);
}

/* ══════════════════════════════════════════════════════════════
   MAIN INIT
   ══════════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', async () => {

  /* Cursor */
  if (window.matchMedia('(pointer:fine)').matches) initCursor();

  /* Nav */
  initNav();

  /* Hero */
  initHeroParallax();
  initMarquee();

  /* Email */
  initEmail();

  /* Language buttons */
  $$('.lang__btn').forEach(btn => {
    btn.addEventListener('click', () => {
      setLang(btn.dataset.lang, window._portfolioData);
    });
  });

  /* Load JSON */
  let data;
  try {
    data = await loadData();
    window._portfolioData = data;
  } catch (err) {
    console.error('Failed to load works.json:', err);
    hideLoader();
    initReveal();
    return;
  }

  /* Stats */
  updateHeroStats(data);

  /* Showcase */
  renderShowcase(data);

  /* Show-all button */
  document.getElementById('btnShowAll')?.addEventListener('click', () => openFullGallery('all', data));

  /* Back button */
  document.getElementById('btnBackShowcase')?.addEventListener('click', closeFullGallery);

  /* Cat filter */
  buildCatFilter(data);

  /* Service card links */
  $$('[data-filter-cat]').forEach(el => {
    el.addEventListener('click', e => {
      e.stopPropagation();
      openFullGallery(el.dataset.filterCat, data);
    });
  });
  $$('.service-card').forEach(card => {
    const cat = card.dataset.filterCat;
    if (cat) card.addEventListener('click', () => openFullGallery(cat, data));
  });

  /* Lightbox controls */
  document.getElementById('lbBg')?.addEventListener('click', closeLightbox);
  document.getElementById('lbClose')?.addEventListener('click', closeLightbox);
  document.getElementById('lbPrev')?.addEventListener('click', e => { e.stopPropagation(); lbNav(-1); });
  document.getElementById('lbNext')?.addEventListener('click', e => { e.stopPropagation(); lbNav(1); });

  document.addEventListener('keydown', e => {
    const lb = document.getElementById('lightbox');
    if (!lb?.classList.contains('is-open')) return;
    if (e.key === 'Escape')     closeLightbox();
    if (e.key === 'ArrowLeft')  lbNav(-1);
    if (e.key === 'ArrowRight') lbNav(1);
  });

  /* Touch swipe in lightbox */
  let touchX = 0;
  const lb = document.getElementById('lightbox');
  lb?.addEventListener('touchstart', e => touchX = e.touches[0].clientX, { passive: true });
  lb?.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 48) lbNav(dx < 0 ? 1 : -1);
  });

  /* Reveal on scroll */
  initReveal();

  /* Apply translations */
  applyTranslations();

  /* Hide loader */
  hideLoader();
});
