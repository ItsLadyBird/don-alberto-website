/* ═══════════════════════════════════════════════════════════
   DON ALBERTO CAFÉ — Shared Global Scripts
   ═══════════════════════════════════════════════════════════ */

/* ── GLOBAL TRANSLATION DICTIONARY ── */
const globalDict = {
  fr: {
    sl1: "Terre de caractère, grain d'excellence",
    sl2: "ARTISANAT CAFÉIER ANCESTRAL",
    fslogan: "ARTISANAT CAFÉIER ANCESTRAL",
    nlph: "Votre adresse email",
    nlh: "Rejoignez la communauté <em>Don Alberto</em>",
    nlp: "Nouvelles récoltes · Actualités ferme · FR · EN · ES",
    nlb: "S'inscrire",
    ubm: "La Maison",
    ubv: "Le Vlog",
    ubp: "Espace professionnel",
    nspec: "Specialty Coffee",
    nclub: "Club Don Alberto",
    npro: "Espace Pro",
    norig: "Boutique d'Origine",
    ncmd: "Commander",
    fh1: "La Marque",
    fh2: "Commander",
    fh3: "Partenaires & B2B",
    fm: "La Maison",
    fa: "Le Atelier",
    fv: "Le Vlog",
    fb: "Boutique",
    fc: "Club Don Alberto",
    fb2: "Espace Pro",
    fco: "Contacter",
    fvt: "Notre Vlog — Dans les coulisses de la ferme",
    mmsecmarque: "La Marque",
    mmseccmd: "Commander",
    mmsecpro: "Pro",
    mmorig2: "L'Origine",
    mmatelier: "Atelier",
    watxt: "Besoin d'aide ?"
  },
  en: {
    sl1: "Soul in the Soil, Being in the Bean",
    sl2: "ANCESTRAL COFFEE CRAFTING",
    fslogan: "ANCESTRAL COFFEE CRAFTING",
    nlph: "Your email address",
    nlh: "Join the <em>Don Alberto</em> community",
    nlp: "New harvests · Farm news · FR · EN · ES",
    nlb: "Subscribe",
    ubm: "The House",
    ubv: "The Vlog",
    ubp: "Professional space",
    nspec: "Specialty Coffee",
    nclub: "Club Don Alberto",
    npro: "Pro Space",
    norig: "Origin Boutique",
    ncmd: "Order Now",
    fh1: "The Brand",
    fh2: "Order",
    fh3: "Partners & B2B",
    fm: "The House",
    fa: "The Atelier",
    fv: "The Vlog",
    fb: "Shop",
    fc: "Club Don Alberto",
    fb2: "Pro Space",
    fco: "Contact",
    fvt: "Our Vlog — Behind the scenes at the farm",
    mmsecmarque: "The Brand",
    mmseccmd: "Order",
    mmsecpro: "Pro",
    mmorig2: "Origin",
    mmatelier: "Atelier",
    watxt: "Need help?"
  },
  es: {
    sl1: "Esencia del Suelo, Vida en el Fruto",
    sl2: "ARTE CAFETALERO ANCESTRAL",
    fslogan: "ARTE CAFETALERO ANCESTRAL",
    nlph: "Tu dirección de correo",
    nlh: "Únete a la comunidad <em>Don Alberto</em>",
    nlp: "Cosechas · Noticias de la finca · FR · EN · ES",
    nlb: "Suscribirse",
    ubm: "La Casa",
    ubv: "El Vlog",
    ubp: "Espacio profesional",
    nspec: "Specialty Coffee",
    nclub: "Club Don Alberto",
    npro: "Espacio Pro",
    norig: "Boutique de Origen",
    ncmd: "Ordenar",
    fh1: "La Marca",
    fh2: "Ordenar",
    fh3: "Socios & B2B",
    fm: "La Casa",
    fa: "El Atelier",
    fv: "El Vlog",
    fb: "Tienda",
    fc: "Club Don Alberto",
    fb2: "Espacio Pro",
    fco: "Contactar",
    fvt: "Nuestro Vlog — Detrás de escena en la finca",
    mmsecmarque: "La Marca",
    mmseccmd: "Ordenar",
    mmsecpro: "Pro",
    mmorig2: "El Origen",
    mmatelier: "Atelier",
    watxt: "¿Necesitas ayuda?"
  }
};

/* ── SET LANGUAGE (Global Elements) ── */
function setLang(lang) {
  const t = globalDict[lang];
  document.documentElement.lang = lang;
  localStorage.setItem('da_lang', lang);
  
  const curLangEl = document.getElementById('lang-cur');
  if (curLangEl) curLangEl.textContent = lang.toUpperCase();

  document.querySelectorAll('.lang-drop button, .mm-lang button').forEach(b => {
    b.classList.toggle('active', b.getAttribute('data-lang') === lang);
  });
  
  const wrap = document.getElementById('lang-wrap');
  if (wrap) wrap.classList.remove('open');

  const mappings = {
    'hf-sl1': 'sl1', 'hf-sl2': 'sl2', 'footer-slogan': 'fslogan',
    'nl-h': 'nlh', 'nl-p': 'nlp', 'nl-btn': 'nlb',
    'ub-maison': 'ubm', 'ub-vlog': 'ubv', 'ub-pro': 'ubp',
    'n-spec': 'nspec', 'n-club': 'nclub', 'n-pro': 'npro', 'n-orig': 'norig', 'n-cmd': 'ncmd',
    'fc-h1': 'fh1', 'fc-h2': 'fh2', 'fc-h3': 'fh3',
    'fl-maison': 'fm', 'fl-atelier': 'fa', 'fl-vlog': 'fv', 'fl-boutique': 'fb', 'fl-club': 'fc', 'fl-b2b': 'fb2', 'fl-contact': 'fco',
    'fv-txt': 'fvt', 'wa-txt': 'watxt',
    'mm-sec-marque': 'mmsecmarque', 'mm-sec-cmd': 'mmseccmd', 'mm-sec-pro': 'mmsecpro',
    'mm-origine': 'mmorig2', 'mm-atelier': 'mmatelier', 'mm-spec': 'nspec', 'mm-club': 'nclub',
    'mm-pro': 'npro', 'mm-orig': 'norig', 'mm-cmd': 'ncmd', 'mm-vlog': 'ubv', 'mm-maison': 'fm'
  };

  for (const [id, key] of Object.entries(mappings)) {
    const el = document.getElementById(id);
    if (el && t[key]) el.innerHTML = t[key];
  }

  const nlInput = document.getElementById('nl-input');
  if (nlInput && t.nlph) nlInput.placeholder = t.nlph;

  // Trigger page-specific update if function exists in HTML file
  if (typeof updatePageContent === "function") {
    updatePageContent(lang);
  }
}

/* ── UI INTERACTIONS ── */
function toggleMob() {
  const m = document.getElementById('mob-menu');
  if (m) {
    m.classList.toggle('open');
    document.body.style.overflow = m.classList.contains('open') ? 'hidden' : '';
  }
}

function toggleLang() {
  const w = document.getElementById('lang-wrap');
  if (w) w.classList.toggle('open');
}

function openCheckout() {
  const m = document.getElementById('coModal');
  if (m) {
    m.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closeCheckout() {
  const m = document.getElementById('coModal');
  if (m) {
    m.classList.remove('open');
    document.body.style.overflow = '';
  }
}

/* ── SCROLL OBSERVERS ── */
let lastY = 0, ticking = false;

function initHeaderScroll() {
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const y = window.scrollY;
        const utilBar = document.getElementById('util-bar');
        const mainNav = document.getElementById('main-nav');
        const compactLogo = document.getElementById('compact-logo');
        const hdrFull = document.getElementById('hdr-full');
        
        if (!utilBar || !mainNav || !hdrFull) return;

        const utilH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--util-h')) || 38;

        if (y <= 4) {
          utilBar.classList.remove('hide');
        } else if (y > lastY && y > utilH) {
          utilBar.classList.add('hide');
        } else if (y < lastY) {
          utilBar.classList.remove('hide');
        }

        const threshold = hdrFull.offsetHeight + utilH - 10;
        if (y > threshold) {
          if (compactLogo) compactLogo.classList.add('visible');
          mainNav.classList.add('shadowed');
        } else {
          if (compactLogo) compactLogo.classList.remove('visible');
          if (y < 10) mainNav.classList.remove('shadowed');
        }

        lastY = y <= 0 ? 0 : y;
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

function initReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { 
        e.target.classList.add('visible'); 
        obs.unobserve(e.target); 
      }
    });
  }, { threshold: 0.09 });
  
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

/* ── INITIALIZATION ── */
document.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('da_lang') || 'fr';
  setLang(savedLang);
  initHeaderScroll();
  initReveal();

  document.addEventListener('click', e => {
    if (!e.target.closest('#lang-wrap')) {
      const wrap = document.getElementById('lang-wrap');
      if (wrap) wrap.classList.remove('open');
    }
  });

  document.addEventListener('keydown', e => { 
    if (e.key === 'Escape') closeCheckout(); 
  });

  setTimeout(() => {
    const b = document.getElementById('wa-bubble');
    if (b) { 
      b.style.opacity = '0'; 
      setTimeout(() => b.style.display = 'none', 420); 
    }
  }, 6500);
});
