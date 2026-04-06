/* ═══════════════════════════════════════════════════════════
   DON ALBERTO CAFÉ — Shared JS v2
   ═══════════════════════════════════════════════════════════ */

/* ── TRANSLATIONS ── */
const T = {
  fr: {
    slogan1: "Terre de caractère, grain d'exception",
    slogan2: "L'Artisanat du Café Ancestral",
    nav_da: 'Don Alberto®',
    nav_origine: "L'Origine",
    nav_maison: 'La Maison',
    nav_boutique: 'Boutique',
    nav_atelier: 'Atelier',
    nav_b2b: 'Espace Pro',
    nav_commander: 'Commander',
    nl_h: "Rejoignez la communauté <em>Don Alberto</em>",
    nl_p: 'Nouvelles récoltes · Actualités de la ferme · FR · EN · ES',
    nl_placeholder: 'Votre adresse email',
    nl_btn: "S'inscrire",
    footer_col1: 'La Maison & Origine',
    footer_col2: 'Commander',
    footer_col3: 'Partenaires & B2B',
    footer_col4: 'Newsletter',
    footer_vlog: '▸ Notre Vlog',
    wa_bubble: "Besoin d'aide ?",
    wa_msg: "Bonjour, j'ai une question sur Don Alberto Café.",
  },
  en: {
    slogan1: 'Soul in the Soil, Being in the Bean',
    slogan2: 'Ancestral Coffee Crafting',
    nav_da: 'Don Alberto®',
    nav_origine: 'The Origin',
    nav_maison: 'The House',
    nav_boutique: 'Shop',
    nav_atelier: 'Atelier',
    nav_b2b: 'Pro Space',
    nav_commander: 'Order Now',
    nl_h: 'Join the <em>Don Alberto</em> community',
    nl_p: 'New harvests · Farm news · FR · EN · ES',
    nl_placeholder: 'Your email address',
    nl_btn: 'Subscribe',
    footer_col1: 'The House & Origin',
    footer_col2: 'Order',
    footer_col3: 'Partners & B2B',
    footer_col4: 'Newsletter',
    footer_vlog: '▸ Our Vlog',
    wa_bubble: 'Need help?',
    wa_msg: 'Hello, I have a question about Don Alberto Café.',
  },
  es: {
    slogan1: 'Esencia del Suelo, Vida en el Fruto',
    slogan2: 'Arte cafetalero ancestral',
    nav_da: 'Don Alberto®',
    nav_origine: 'El Origen',
    nav_maison: 'La Casa',
    nav_boutique: 'Tienda',
    nav_atelier: 'Atelier',
    nav_b2b: 'Espacio Pro',
    nav_commander: 'Pedir',
    nl_h: 'Únete a la comunidad <em>Don Alberto</em>',
    nl_p: 'Nuevas cosechas · Noticias de la finca · FR · EN · ES',
    nl_placeholder: 'Tu dirección de email',
    nl_btn: 'Suscribirse',
    footer_col1: 'La Casa & Origen',
    footer_col2: 'Pedir',
    footer_col3: 'Socios & B2B',
    footer_col4: 'Boletín',
    footer_vlog: '▸ Nuestro Vlog',
    wa_bubble: '¿Necesitas ayuda?',
    wa_msg: 'Hola, tengo una pregunta sobre Don Alberto Café.',
  }
};

let currentLang = localStorage.getItem('da_lang') || 'fr';

function t(k) {
  return (T[currentLang] && T[currentLang][k]) ? T[currentLang][k] : (T.fr[k] || '');
}

function applyLang(lang) {
  currentLang = lang;
  localStorage.setItem('da_lang', lang);

  // Activate lang buttons
  document.querySelectorAll('.lang-btn, .mob-lang button').forEach(b => {
    b.classList.toggle('active', b.dataset.lang === lang);
  });

  // Slogans
  ['slogan1','slogan2'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = t(id);
  });

  // Nav items
  const navMap = {
    'nav-da': 'nav_da', 'nav-origine': 'nav_origine', 'nav-maison': 'nav_maison',
    'nav-boutique': 'nav_boutique', 'nav-atelier': 'nav_atelier',
    'nav-b2b': 'nav_b2b', 'nav-commander': 'nav_commander',
    'mob-nav-origine': 'nav_origine', 'mob-nav-maison': 'nav_maison',
    'mob-nav-boutique': 'nav_boutique', 'mob-nav-atelier': 'nav_atelier',
    'mob-nav-b2b': 'nav_b2b', 'mob-nav-commander': 'nav_commander',
  };
  Object.entries(navMap).forEach(([id, key]) => {
    const el = document.getElementById(id);
    if (el) el.textContent = t(key);
  });

  // Newsletter CTA
  const nlH = document.getElementById('nl-h');
  const nlP = document.getElementById('nl-p');
  if (nlH) nlH.innerHTML = t('nl_h');
  if (nlP) nlP.textContent = t('nl_p');
  document.querySelectorAll('.nl-input').forEach(el => { el.placeholder = t('nl_placeholder'); });
  document.querySelectorAll('.nl-submit,.footer-nl-btn').forEach(el => { el.textContent = t('nl_btn'); });

  // Footer columns
  ['footer_col1','footer_col2','footer_col3','footer_col4'].forEach((key,i) => {
    const el = document.getElementById('footer-col-h'+(i+1));
    if (el) el.textContent = t(key);
  });
  const fv = document.getElementById('footer-vlog');
  if (fv) fv.textContent = t('footer_vlog');

  // WhatsApp
  const waT = document.getElementById('wa-bubble-txt');
  if (waT) waT.textContent = t('wa_bubble');
  const waL = document.getElementById('wa-link');
  if (waL) waL.href = 'https://wa.me/33761528450?text=' + encodeURIComponent(t('wa_msg'));
}

/* ── DROPDOWN ── */
function initDropdowns() {
  document.querySelectorAll('.has-dropdown > a').forEach(link => {
    link.addEventListener('click', function(e) {
      const li = this.closest('.has-dropdown');
      const drop = li.querySelector('.dropdown');
      if (!drop) return;
      const isOpen = drop.classList.contains('js-open');
      document.querySelectorAll('.dropdown.js-open').forEach(d => {
        d.classList.remove('js-open'); d.style.display = '';
      });
      if (!isOpen) {
        e.preventDefault();
        drop.classList.add('js-open');
        drop.style.display = 'block';
      }
    });
  });
  document.addEventListener('click', e => {
    if (!e.target.closest('.has-dropdown')) {
      document.querySelectorAll('.dropdown.js-open').forEach(d => {
        d.classList.remove('js-open'); d.style.display = '';
      });
    }
  });
}

/* ── MOBILE NAV ── */
function initMobileNav() {
  const toggle = document.getElementById('mob-toggle');
  const mobNav = document.getElementById('mob-nav');
  if (!toggle || !mobNav) return;
  toggle.addEventListener('click', () => {
    toggle.classList.toggle('open');
    mobNav.classList.toggle('open');
  });
}

/* ── HEADER SCROLL ── */
function initHeaderScroll() {
  const hdr = document.querySelector('header');
  if (!hdr) return;
  window.addEventListener('scroll', () => {
    hdr.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
}

/* ── REVEAL ON SCROLL ── */
function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  els.forEach(el => obs.observe(el));
}

/* ── SCA BARS ── */
function initScaBars() {
  const bars = document.querySelectorAll('.sca-fill[data-pct]');
  if (!bars.length) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.width = e.target.dataset.pct + '%';
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });
  bars.forEach(b => obs.observe(b));
}

/* ── CHECKOUT MODAL (Tally) ── */
function openCheckout() {
  const m = document.getElementById('checkoutModal');
  if (m) { m.classList.add('open'); document.body.style.overflow = 'hidden'; }
}
function closeCheckout() {
  const m = document.getElementById('checkoutModal');
  if (m) { m.classList.remove('open'); document.body.style.overflow = ''; }
}

/* ── PAYMENT MODAL ── */
let _pendingProduct = {};
function openPayment(name, price, imgSrc) {
  _pendingProduct = { name, price };
  const el = document.getElementById('pay-product-name');
  const elP = document.getElementById('pay-product-price');
  if (el) el.textContent = name;
  if (elP) elP.textContent = price;
  // Build payment links with product name
  buildPayLinks(name, price);
  const m = document.getElementById('payModal');
  if (m) { m.classList.add('open'); document.body.style.overflow = 'hidden'; }
}
function closePayment() {
  const m = document.getElementById('payModal');
  if (m) { m.classList.remove('open'); document.body.style.overflow = ''; }
}
function buildPayLinks(name, price) {
  const msg = `Bonjour, je souhaite commander: ${name} - ${price}. Veuillez m'indiquer les détails de paiement.`;
  const whatsappLink = 'https://wa.me/33761528450?text=' + encodeURIComponent(msg);
  const paypalLink = 'https://paypal.me/DonAlbertoCafe?amount=' + encodeURIComponent(price.replace(/[^0-9.]/g,''));
  const revolut = document.getElementById('pay-revolut');
  const paypal = document.getElementById('pay-paypal');
  const wise = document.getElementById('pay-wise');
  const wa = document.getElementById('pay-whatsapp');
  if (paypal) paypal.href = paypalLink;
  if (wa) wa.href = whatsappLink;
}

/* ── LANG BUTTONS ── */
function initLangButtons() {
  document.querySelectorAll('.lang-btn, .mob-lang button').forEach(btn => {
    btn.addEventListener('click', () => applyLang(btn.dataset.lang));
  });
}

/* ── INIT ── */
document.addEventListener('DOMContentLoaded', () => {
  applyLang(currentLang);
  initDropdowns();
  initMobileNav();
  initHeaderScroll();
  initReveal();
  initLangButtons();
  initScaBars();

  // Auto-hide WA bubble
  setTimeout(() => {
    const b = document.getElementById('wa-bubble');
    if (b) b.style.display = 'none';
  }, 5000);
});
