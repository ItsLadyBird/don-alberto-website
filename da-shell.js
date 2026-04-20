/* ═══════════════════════════════════════════════════════════
   DON ALBERTO CAFÉ — Master Shell JS
   Single source of truth for all pages.

   USAGE: Each page just needs:
     <div id="site-header"></div>   ← top of <body>
     <div id="site-footer"></div>   ← bottom of <body>, before this <script>
     <script src="da-shell.js"></script>

   Sections:
     1. Shell HTML (header + footer templates)
     2. Shell Injection
     3. Scroll Handler
     4. Mobile Menu
     5. Language Dropdown
     6. Language Data & setLang()
     7. Checkout Modal
     8. Payment Modal
     9. Init (DOMContentLoaded)
   ═══════════════════════════════════════════════════════════ */

/* ══════════════════════════════════════════
   1. SHELL HTML TEMPLATES
   ══════════════════════════════════════════ */
const SHELL_HEADER = `
<!-- UTILITY BAR -->
<div id="util-bar">
  <div class="ub-left">
    <a href="maison.html" class="ub-link" id="ub-maison">La Maison</a>
    <div class="ub-sep"></div>
    <a href="vlog.html" class="ub-link" id="ub-vlog">Le Vlog</a>
  </div>
  <div class="ub-right">
    <div class="lang-wrap" id="lang-wrap">
      <button class="lang-btn" onclick="toggleLang()">
        <span id="lang-cur">FR</span>
        <svg viewBox="0 0 10 6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M1 1l4 4 4-4"/></svg>
      </button>
      <div class="lang-drop" id="lang-drop">
        <button class="active" data-lang="fr" onclick="setLang('fr')">FR</button>
        <button data-lang="en" onclick="setLang('en')">EN</button>
        <button data-lang="es" onclick="setLang('es')">ES</button>
      </div>
    </div>
    <div class="ub-sep"></div>
    <a href="b2b.html" class="ub-pro" id="ub-pro">Espace professionnel</a>
  </div>
</div>

<!-- FULL HEADER BRAND (scrolls away, reveals compact logo) -->
<div id="hdr-full">
  <a href="index.html" class="hf-brand-link">
    <div class="hf-icon">
      <img src="logos/logo-icon-no-br.png" alt="Don Alberto Café" id="hdr-icon">
    </div>
    <div class="hf-name" id="hf-name">DON ALBERTO</div>
    <div class="hf-sub">CAFÉ</div>
  </a>
  <div class="hf-slogans">
    <span class="hf-sl1" id="hf-sl1">Terre de caractère, grain d'excellence</span>
    <div class="hf-sep"></div>
    <span class="hf-sl2" id="hf-sl2">ARTISANAT CAFÉIER ANCESTRAL</span>
  </div>
</div>

<!-- MAIN NAV (sticky) -->
<header id="main-nav">
  <div class="nav-inner">
    <nav class="nav-left" aria-label="Nav gauche">
      <div class="ni"><a href="boutique.html" id="n-spec">Specialty Coffee</a></div>
      <div class="ni"><a href="boutique.html#abonnement" id="n-club">Club Don Alberto</a></div>
    </nav>
    <div class="nav-center">
      <div class="nav-logo-compact" id="compact-logo">
        <a href="index.html">
          <img src="logos/logo-icon-no-br.png" alt="Don Alberto Café" style="height:36px;width:auto;object-fit:contain;">
        </a>
      </div>
    </div>
    <nav class="nav-right" aria-label="Nav droite">
      <div class="ni"><a href="b2b.html" id="n-pro">Espace Pro</a></div>
      <div class="ni"><a href="origine-boutique.html" id="n-orig">Boutique d'Origine</a></div>
      <a href="javascript:void(0)" onclick="openCheckout()" class="nav-cmd" id="n-cmd">Commander</a>
    </nav>
    <button class="mob-tog" id="mob-tog" onclick="toggleMob()" aria-label="Menu">
      <span></span><span></span><span></span>
    </button>
  </div>
</header>

<!-- MOBILE MENU -->
<div class="mob-menu" id="mob-menu">
  <div class="mm-hdr">
    <div class="mm-logo-row">
      <a href="index.html"><img src="logos/logo-icon-no-br.png" alt="Don Alberto Café" style="height:32px;width:auto;object-fit:contain;"></a>
    </div>
    <button class="mm-close" onclick="toggleMob()">✕</button>
  </div>
  <div class="mm-body">
    <div class="mm-sec" id="mm-sec-marque">La Marque</div>
    <a href="maison.html" class="mm-sub" id="mm-maison">La Maison</a>
    <a href="origine.html" class="mm-sub" id="mm-origine">L'Origine</a>
    <a href="atelier.html" class="mm-sub" id="mm-atelier">Atelier</a>
    <a href="vlog.html" class="mm-sub" id="mm-vlog">Le Vlog</a>
    <div class="mm-sec" id="mm-sec-cmd">Commander</div>
    <a href="boutique.html" class="mm-lnk" id="mm-spec">Specialty Coffee</a>
    <a href="boutique.html#abonnement" class="mm-lnk" id="mm-club">Club Don Alberto</a>
    <a href="origine-boutique.html" class="mm-lnk" id="mm-orig">Boutique d'Origine</a>
    <div class="mm-sec" id="mm-sec-pro">Pro</div>
    <a href="b2b.html" class="mm-lnk" id="mm-pro">Espace Pro</a>
    <a href="javascript:void(0)" onclick="openCheckout();toggleMob();" class="mm-cta" id="mm-cmd">Commander</a>
  </div>
  <div class="mm-lang">
    <button class="active" data-lang="fr" onclick="setLang('fr');toggleMob()">FR</button>
    <button data-lang="en" onclick="setLang('en');toggleMob()">EN</button>
    <button data-lang="es" onclick="setLang('es');toggleMob()">ES</button>
  </div>
</div>
`;

const SHELL_FOOTER = `
<!-- FOOTER -->
<footer>
  <div class="footer-inner">
    <div class="footer-brand">
      <a href="index.html" class="footer-logo-link">
        <div class="footer-logo-icon">
          <img src="logos/logo-icon-no-br.png" alt="Don Alberto Café logo">
        </div>
        <div class="footer-brand-name">DON ALBERTO</div>
        <div class="footer-brand-cafe">CAFÉ</div>
      </a>
      <p class="footer-slogan" id="footer-slogan">Artisanat Caféier Ancestral</p>
      <div class="footer-socials">
        <a href="https://instagram.com/donalberto.cafe" target="_blank" rel="noopener" class="footer-soc" aria-label="Instagram">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
        </a>
        <a href="#" target="_blank" rel="noopener" class="footer-soc" aria-label="TikTok">
          <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.27 8.27 0 004.84 1.55V6.78a4.85 4.85 0 01-1.07-.09z"/></svg>
        </a>
        <a href="https://facebook.com" target="_blank" rel="noopener" class="footer-soc" aria-label="Facebook">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
        </a>
        <a href="#" target="_blank" rel="noopener" class="footer-soc" aria-label="YouTube">
          <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13"><path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/></svg>
        </a>
        <a href="https://wa.me/33761528450" target="_blank" rel="noopener" class="footer-soc" aria-label="WhatsApp">
          <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.09.543 4.05 1.496 5.754L0 24l6.394-1.467A11.955 11.955 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.882a9.88 9.88 0 01-5.031-1.378l-.36-.214-3.742.858.899-3.628-.235-.374A9.861 9.861 0 012.118 12C2.118 6.533 6.533 2.118 12 2.118S21.882 6.533 21.882 12 17.467 21.882 12 21.882z"/></svg>
        </a>
      </div>
    </div>
    <div class="footer-cols">
      <div class="footer-col">
        <h4 id="fc-h1">La Marque</h4>
        <ul>
          <li><a href="maison.html" id="fl-maison">La Maison</a></li>
          <li><a href="atelier.html" id="fl-atelier">Le Atelier</a></li>
          <li><a href="vlog.html" id="fl-vlog">Le Vlog</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4 id="fc-h2">Commander</h4>
        <ul>
          <li><a href="boutique.html" id="fl-boutique">Boutique</a></li>
          <li><a href="boutique.html#abonnement" id="fl-club">Club Don Alberto</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4 id="fc-h3">Partenaires &amp; B2B</h4>
        <ul>
          <li><a href="b2b.html" id="fl-b2b">Espace Pro</a></li>
          <li><a href="b2b.html#contact" id="fl-contact">Contacter</a></li>
        </ul>
      </div>
    </div>
  </div>
  <div class="footer-vlog-row">
    <a href="vlog.html" id="fv-lnk">
      <div class="fvlog-ico"><svg viewBox="0 0 24 24" fill="currentColor" width="10" height="10"><path d="M8 5v14l11-7z"/></svg></div>
      <span id="fv-txt">Notre Vlog — Dans les coulisses de la ferme</span>
    </a>
  </div>
  <div class="footer-bottom">
    <span class="footer-copy">© 2025 Don Alberto Café · Rondón, Boyacá, Colombia</span>
    <div class="footer-bottom-links">
      <a href="#">Mentions légales</a>
      <a href="#">Confidentialité</a>
      <a href="b2b.html">Espace Pro</a>
    </div>
  </div>
</footer>

<!-- CHECKOUT MODAL -->
<div id="coModal" class="co-modal">
  <div class="co-bd" onclick="closeCheckout()"></div>
  <div class="co-box">
    <button class="co-close" onclick="closeCheckout()">✕</button>
    <iframe src="https://tally.so/r/LZ04RG" width="100%" height="600" frameborder="0" title="Commander" style="display:block;border:none;"></iframe>
  </div>
</div>

<!-- WHATSAPP -->
<div class="wa-wrap">
  <div class="wa-bubble" id="wa-bubble">
    <span id="wa-txt">Besoin d'aide ?</span>
    <button class="wa-bclose" onclick="this.parentElement.style.display='none'">✕</button>
  </div>
  <a href="https://wa.me/33761528450?text=Bonjour%2C%20j%27ai%20une%20question%20sur%20Don%20Alberto%20Caf%C3%A9." target="_blank" rel="noopener" class="wa-btn" id="wa-link">
    <svg viewBox="0 0 24 24" fill="white" width="25" height="25"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.09.543 4.05 1.496 5.754L0 24l6.394-1.467A11.955 11.955 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.882a9.88 9.88 0 01-5.031-1.378l-.36-.214-3.742.858.899-3.628-.235-.374A9.861 9.861 0 012.118 12C2.118 6.533 6.533 2.118 12 2.118S21.882 6.533 21.882 12 17.467 21.882 12 21.882z"/></svg>
  </a>
</div>
`;

/* ══════════════════════════════════════════
   2. SHELL INJECTION
   Injects header + footer HTML into placeholder divs.
   Call once inside DOMContentLoaded, before setLang().
   ══════════════════════════════════════════ */
function injectShell() {
  const hdrPlaceholder = document.getElementById('site-header');
  if (hdrPlaceholder) hdrPlaceholder.outerHTML = SHELL_HEADER;

  const ftrPlaceholder = document.getElementById('site-footer');
  if (ftrPlaceholder) ftrPlaceholder.outerHTML = SHELL_FOOTER;

  // Mark active nav link based on current page
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('#main-nav a, .mm-lnk, .mm-sub').forEach(a => {
    const href = a.getAttribute('href') || '';
    if (href && href !== 'javascript:void(0)' && href !== '#') {
      const linkPage = href.split('/').pop().split('#')[0];
      if (linkPage === page) a.classList.add('act', 'mm-active');
    }
  });
  // Utility bar active state
  document.querySelectorAll('#util-bar .ub-link').forEach(a => {
    const href = a.getAttribute('href') || '';
    if (href.split('/').pop() === page) a.classList.add('ub-active');
  });
}

/* ══════════════════════════════════════════
   3. SCROLL HANDLER
   Hides util bar on scroll-down, shows compact logo once
   full brand header scrolls out of view.
   ══════════════════════════════════════════ */
let _lastY = 0, _ticking = false;

window.addEventListener('scroll', () => {
  if (_ticking) return;
  _ticking = true;
  requestAnimationFrame(() => {
    const y = window.scrollY;
    const utilBar    = document.getElementById('util-bar');
    const mainNav    = document.getElementById('main-nav');
    const compactLogo = document.getElementById('compact-logo');
    const hdrFull    = document.getElementById('hdr-full');

    if (utilBar) {
      if (y <= 4) utilBar.classList.remove('hide');
      else if (y > _lastY) utilBar.classList.add('hide');
      else utilBar.classList.remove('hide');
    }

    if (hdrFull && compactLogo && mainNav) {
      const utilH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--util-h')) || 38;
      const threshold = hdrFull.offsetHeight + utilH - 10;
      if (y > threshold) {
        compactLogo.classList.add('visible');
        mainNav.classList.add('shadowed');
      } else {
        compactLogo.classList.remove('visible');
        if (y < 10) mainNav.classList.remove('shadowed');
      }
    }

    _lastY = y <= 0 ? 0 : y;
    _ticking = false;
  });
}, { passive: true });

/* ══════════════════════════════════════════
   4. MOBILE MENU
   ══════════════════════════════════════════ */
function toggleMob() {
  const m = document.getElementById('mob-menu');
  if (!m) return;
  m.classList.toggle('open');
  document.body.style.overflow = m.classList.contains('open') ? 'hidden' : '';
}

/* ══════════════════════════════════════════
   5. LANGUAGE DROPDOWN
   ══════════════════════════════════════════ */
function toggleLang() {
  const lw = document.getElementById('lang-wrap');
  if (lw) lw.classList.toggle('open');
}
document.addEventListener('click', e => {
  if (!e.target.closest('#lang-wrap')) {
    const lw = document.getElementById('lang-wrap');
    if (lw) lw.classList.remove('open');
  }
});

/* ══════════════════════════════════════════
   6. LANGUAGE DATA & setLang()
   ══════════════════════════════════════════ */
const L = {
  fr:{
    sl:'Terre de caractère, grain d\'excellence', craft:'ARTISANAT CAFÉIER ANCESTRAL',
    sl1:'Terre de caractère, grain d\'excellence', sl2:'ARTISANAT CAFÉIER ANCESTRAL',
    fslogan:'Artisanat Caféier Ancestral',
    nlph:'Votre adresse email',
    ey:'Boyacá · Colombie · Single Origin · Specialty', sc:'Défiler',
    p1e:'Specialty Coffee · Boutique', p1t:'Rondón Castillo —<br>SCA 84.5 · Grain entier', p1c:'Explorer la boutique →',
    p2e:'Club Don Alberto · Abonnement', p2t:'Café de spécialité frais<br>chaque mois', p2c:'Rejoindre le Club →',
    nlh:'Rejoignez la communauté <em>Don Alberto</em>', nlp:'Nouvelles récoltes · Actualités ferme', nlb:"S'inscrire",
    t1h:'Commande directe', t1d:'PayPal · Revolut · Wise', t2h:'Livraison internationale', t2d:'France, Europe & Monde',
    t3h:'Café de spécialité SCA', t3d:'Score 84.5 · Procédé Lavé', t4h:'Traçabilité totale', t4d:'Ferme → tasse',
    ubm:'La Maison', ubv:'Le Vlog', ubp:'Espace professionnel',
    nspec:'Specialty Coffee', nclub:'Club Don Alberto', npro:'Espace Pro', norig:"Boutique d'Origine", ncmd:'Commander', ncmd_b2b:'Contact Pro',
    fh1:'La Marque', fh2:'Commander', fh3:'Partenaires & B2B',
    fm:'La Maison', fa:'Le Atelier', fv:'Le Vlog', fb:'Boutique', fc:'Club Don Alberto', fb2:'Espace Pro', fco:'Contacter',
    fvt:'Notre Vlog — Dans les coulisses de la ferme', wa:"Besoin d'aide ?",
    ssca:'Score SCA', salt:'Altitude', sara:'Arabica Castillo',
    hcta:'Découvrir le café →',
    mmsecmarque:'La Marque', mmseccmd:'Commander', mmsecpro:'Pro',
    mmorig2:'L\'Origine', mmatelier:'Atelier',
    jt1:'Terroir unique<br>de Boyacá', jd1:'Seule ferme de café vert de spécialité du département. Altitude 1 670m ASNM.',
    jt2:'Récolte à la<br>main sélective', jd2:'Cueillette grain par grain des seules cerises mûres à point, pour une qualité irréprochable.',
    jt3:'Procédé Lavé<br>artisanal', jd3:'Fermentation contrôlée et lavage complet pour une pureté aromatique maximale.',
    jt4:'Certifié SCA<br>84.5 points', jd4:'Évalué par un Q-Grader certifié. Scores parfaits en uniformité, tasse propre et douceur.',
    jt5:'Torréfaction<br>artisanale moyenne', jd5:'Profil maîtrisé pour révéler les notes de miel, chocolat fin et la texture soyeuse du Castillo.',
    qlabel:"L'Excellence de la Source",
    qh2:'Une densité raffinée,<br>née du terroir de <em>Boyacá</em>',
    qp1:'À 1 670 m d\'altitude, les fluctuations thermiques dramatiques de Rondón forcent les cerises Castillo dans un état de « stress positif » — une maturation plus lente qui concentre des esters complexes et des acides organiques dans chaque grain.',
    qp2:'Le résultat est le profil Don Alberto : <strong>cacao profond et miel visqueux</strong>, obtenus non par intervention mais par l\'intelligence de la terre.',
    qquote:'"Il aimait la terre comme peu d\'hommes savent l\'aimer. Nous cultivons sa mémoire à chaque récolte."',
    qcite:'La famille fondatrice · Don Alberto Café',
    qcta:'Voir le score SCA complet →',
    olabel:'Specialty Coffee Boyacá Colombia',
    oh2:'Rondón, Boyacá —<br><em>là où tout commence</em>',
    op1:'Tandis que les régions traditionnelles offrent de la constance, Boyacá offre de la complexité. À 1 670 m, les étages thermiques dramatiques de Rondón concentrent dans la cerise Castillo des esters rares — à l\'origine du profil Don Alberto.',
    of1:'Département unique', of2:'Arabica sélectionné', of3:'Microclimats Colombie', of4:'Seule GCF · Boyacá',
    octa:"Découvrir l'origine →"
  },
  en:{
    sl:'Soul in the Soil, Being in the Bean', craft:'ANCESTRAL COFFEE CRAFTING',
    sl1:'Soul in the Soil, Being in the Bean', sl2:'ANCESTRAL COFFEE CRAFTING',
    fslogan:'Ancestral Coffee Crafting',
    nlph:'Your email address',
    ey:'Boyacá · Colombia · Single Origin · Specialty', sc:'Scroll',
    p1e:'Specialty Coffee · Shop', p1t:'Rondón Castillo —<br>SCA 84.5 · Whole Bean', p1c:'Explore the shop →',
    p2e:'Club Don Alberto · Subscription', p2t:'Fresh specialty coffee<br>every month', p2c:'Join the Club →',
    nlh:'Join the <em>Don Alberto</em> community', nlp:'New harvests · Farm news', nlb:'Subscribe',
    t1h:'Direct order', t1d:'PayPal · Revolut · Wise', t2h:'International shipping', t2d:'France, Europe & Worldwide',
    t3h:'SCA Specialty Coffee', t3d:'Score 84.5 · Washed Process', t4h:'Full traceability', t4d:'Farm → cup',
    ubm:'The House', ubv:'The Vlog', ubp:'Professional space',
    nspec:'Specialty Coffee', nclub:'Club Don Alberto', npro:'Pro Space', norig:'Origin Boutique', ncmd:'Order Now', ncmd_b2b:'Contact Pro',
    fh1:'The Brand', fh2:'Order', fh3:'Partners & B2B',
    fm:'The House', fa:'The Atelier', fv:'The Vlog', fb:'Shop', fc:'Club Don Alberto', fb2:'Pro Space', fco:'Contact',
    fvt:'Our Vlog — Behind the scenes at the farm', wa:'Need help?',
    ssca:'SCA Score', salt:'Altitude', sara:'Arabica Castillo',
    hcta:'Discover the Coffee →',
    mmsecmarque:'The Brand', mmseccmd:'Order', mmsecpro:'Pro',
    mmorig2:'Origin', mmatelier:'Atelier',
    jt1:'Unique Boyacá<br>Terroir', jd1:'The only specialty green coffee farm in the department. Altitude 1,670m MASL.',
    jt2:'Selective<br>Hand Harvest', jd2:'Berry by berry picking of only ripe cherries, for irreproachable quality.',
    jt3:'Artisan<br>Washed Process', jd3:'Controlled fermentation and full washing for maximum aromatic purity.',
    jt4:'SCA Certified<br>84.5 Points', jd4:'Evaluated by a certified Q-Grader. Perfect scores in uniformity, clean cup and sweetness.',
    jt5:'Medium<br>Artisan Roast', jd5:'Mastered profile to reveal honey, fine chocolate notes and the silky texture of Castillo.',
    qlabel:'The Excellence of the Source',
    qh2:'A refined density,<br>born from the terroir of <em>Boyacá</em>',
    qp1:'At 1,670m altitude, the dramatic thermal fluctuations of Rondón push the Castillo cherries into a state of "positive stress" — a slower ripening that concentrates complex esters and organic acids into every bean.',
    qp2:'The result is the Don Alberto profile: <strong>deep cacao and viscous honey</strong>, achieved not through intervention but through the intelligence of the land.',
    qquote:'"He loved the land as few men know how to. We cultivate his memory with every harvest."',
    qcite:'The founding family · Don Alberto Café',
    qcta:'View the full SCA score →',
    olabel:'Specialty Coffee Boyacá Colombia',
    oh2:'Rondón, Boyacá —<br><em>where it all begins</em>',
    op1:'While traditional regions offer consistency, Boyacá offers complexity. At 1,670m, the dramatic thermal layers of Rondón concentrate rare esters in the Castillo cherry — the origin of the Don Alberto profile.',
    of1:'Unique department', of2:'Selected Arabica', of3:'Colombia microclimates', of4:'Only GCF · Boyacá',
    octa:'Discover the origin →'
  },
  es:{
    sl:'Esencia del Suelo, Vida en el Fruto', craft:'ARTE CAFETALERO ANCESTRAL',
    sl1:'Esencia del Suelo, Vida en el Fruto', sl2:'ARTE CAFETALERO ANCESTRAL',
    fslogan:'Arte Cafetero Ancestral',
    nlph:'Tu dirección de correo',
    ey:'Boyacá · Colombia · Origen Único · Specialty', sc:'Deslizar',
    p1e:'Specialty Coffee · Tienda', p1t:'Rondón Castillo —<br>SCA 84.5 · Grano entero', p1c:'Explorar la tienda →',
    p2e:'Club Don Alberto · Suscripción', p2t:'Café especial fresco<br>cada mes', p2c:'Unirse al Club →',
    nlh:'Únete a la comunidad <em>Don Alberto</em>', nlp:'Cosechas · Noticias de la finca', nlb:'Suscribirse',
    t1h:'Pedido directo', t1d:'PayPal · Revolut · Wise', t2h:'Envío internacional', t2d:'Francia, Europa y El Mundo',
    t3h:'Café de especialidad SCA', t3d:'Puntaje 84.5 · Proceso Lavado', t4h:'Trazabilidad total', t4d:'Finca → taza',
    ubm:'La Casa', ubv:'El Vlog', ubp:'Espacio profesional',
    nspec:'Specialty Coffee', nclub:'Club Don Alberto', npro:'Espacio Pro', norig:'Boutique de Origen', ncmd:'Ordenar', ncmd_b2b:'Contacto Pro',
    fh1:'La Marca', fh2:'Ordenar', fh3:'Socios & B2B',
    fm:'La Casa', fa:'El Atelier', fv:'El Vlog', fb:'Tienda', fc:'Club Don Alberto', fb2:'Espacio Pro', fco:'Contactar',
    fvt:'Nuestro Vlog — Detrás de escena en la finca', wa:'¿Necesitas ayuda?',
    ssca:'Puntaje SCA', salt:'Altitud', sara:'Arabica Castillo',
    hcta:'Descubrir el café →',
    mmsecmarque:'La Marca', mmseccmd:'Ordenar', mmsecpro:'Pro',
    mmorig2:'El Origen', mmatelier:'Atelier',
    jt1:'Terroir único<br>de Boyacá', jd1:'La única finca de café verde de especialidad del departamento. Altitud 1.670m MSNM.',
    jt2:'Cosecha manual<br>selectiva', jd2:'Recolección grano a grano de las cerezas maduras, para una calidad irreprochable.',
    jt3:'Proceso Lavado<br>artesanal', jd3:'Fermentación controlada y lavado completo para máxima pureza aromática.',
    jt4:'Certificado SCA<br>84.5 puntos', jd4:'Evaluado por un Q-Grader certificado. Puntajes perfectos en uniformidad, taza limpia y dulzura.',
    jt5:'Tostión media<br>artesanal', jd5:'Perfil dominado para revelar notas de miel, chocolate fino y la textura sedosa del Castillo.',
    qlabel:'La Excelencia del Origen',
    qh2:'Una densidad refinada,<br>nacida del terroir de <em>Boyacá</em>',
    qp1:'A 1.670 m de altitud, las dramáticas fluctuaciones térmicas de Rondón empujan las cerezas Castillo a un estado de "estrés positivo" — una maduración más lenta que concentra ésteres complejos y ácidos orgánicos en cada grano.',
    qp2:'El resultado es el perfil Don Alberto: <strong>cacao profundo y miel viscosa</strong>, logrados no por intervención sino por la inteligencia de la tierra.',
    qquote:'"Amaba la tierra como pocos hombres saben amarla. Cultivamos su memoria en cada cosecha."',
    qcite:'La familia fundadora · Don Alberto Café',
    qcta:'Ver el puntaje SCA completo →',
    olabel:'Specialty Coffee Boyacá Colombia',
    oh2:'Rondón, Boyacá —<br><em>donde todo comienza</em>',
    op1:'Mientras las regiones tradicionales ofrecen constancia, Boyacá ofrece complejidad. A 1.670 m, los dramáticos pisos térmicos de Rondón concentran en la cereza Castillo ésteres raros — el origen del perfil Don Alberto.',
    of1:'Departamento único', of2:'Arabica seleccionado', of3:'Microclimas Colombia', of4:'Única GCF · Boyacá',
    octa:'Descubrir el origen →'
  }
};

function _$(id){ return document.getElementById(id); }

function setLang(lang) {
  if (!L[lang]) lang = 'fr';
  const t = L[lang];
  try { localStorage.setItem('da_lang', lang); } catch(e) {}
  document.documentElement.lang = lang;

  const langCur = _$('lang-cur');
  if (langCur) langCur.textContent = lang.toUpperCase();
  document.querySelectorAll('.lang-drop button, .mm-lang button').forEach(b =>
    b.classList.toggle('active', b.getAttribute('data-lang') === lang)
  );
  const lw = _$('lang-wrap');
  if (lw) lw.classList.remove('open');

  const set  = (id, val) => { const e = _$(id); if (e && val !== undefined) e.textContent = val; };
  const setH = (id, val) => { const e = _$(id); if (e && val !== undefined) e.innerHTML = val; };

  // Header brand
  set('hf-sl1', t.sl1); set('hf-sl2', t.sl2);
  // Hero
  set('h-sl', t.sl); set('h-craft', t.craft); set('h-ey', t.ey); set('s-scroll', t.sc);
  set('s-sca', t.ssca); set('s-alt', t.salt); set('s-ara', t.sara);
  const hcta = _$('hero-cta-btn'); if (hcta) hcta.textContent = t.hcta;
  // Home panels
  set('p1-ey', t.p1e); setH('p1-ti', t.p1t); set('p1-ct', t.p1c);
  set('p2-ey', t.p2e); setH('p2-ti', t.p2t); set('p2-ct', t.p2c);
  // Newsletter
  setH('nl-h', t.nlh); set('nl-p', t.nlp); set('nl-btn', t.nlb);
  const nli = _$('nl-input'); if (nli) nli.placeholder = t.nlph;
  // Trust bar
  ['1','2','3','4'].forEach(i => { set('t'+i+'h', t['t'+i+'h']); set('t'+i+'d', t['t'+i+'d']); });
  // Utility bar
  set('ub-maison', t.ubm); set('ub-vlog', t.ubv); set('ub-pro', t.ubp);
  // Main nav
  set('n-spec', t.nspec); set('n-club', t.nclub); set('n-pro', t.npro); set('n-orig', t.norig);
  const b2bPage = document.body && document.body.classList.contains('page-b2b');
  const cmdTxt = b2bPage && t.ncmd_b2b ? t.ncmd_b2b : t.ncmd;
  set('n-cmd', cmdTxt);
  // Mobile menu
  set('mm-spec', t.nspec); set('mm-club', t.nclub); set('mm-orig', t.norig);
  set('mm-pro', t.npro); set('mm-cmd', cmdTxt); set('mm-vlog', t.ubv);
  set('mm-maison', t.fm); set('mm-origine', t.mmorig2); set('mm-atelier', t.mmatelier);
  set('mm-sec-marque', t.mmsecmarque); set('mm-sec-cmd', t.mmseccmd); set('mm-sec-pro', t.mmsecpro);
  // Footer
  set('fc-h1', t.fh1); set('fc-h2', t.fh2); set('fc-h3', t.fh3);
  set('fl-maison', t.fm); set('fl-atelier', t.fa); set('fl-vlog', t.fv);
  set('fl-boutique', t.fb); set('fl-club', t.fc); set('fl-b2b', t.fb2); set('fl-contact', t.fco);
  set('fv-txt', t.fvt); setH('footer-slogan', t.fslogan);
  // WhatsApp
  set('wa-txt', t.wa);
  const waL = _$('wa-link');
  if (waL) waL.href = 'https://wa.me/33761528450?text=' + encodeURIComponent(t.wa === 'Need help?' ? 'Hello, I have a question about Don Alberto Café.' : t.wa === '¿Necesitas ayuda?' ? 'Hola, tengo una pregunta sobre Don Alberto Café.' : "Bonjour, j'ai une question sur Don Alberto Café.");
  // Journey steps
  ['1','2','3','4','5'].forEach(i => { setH('jt'+i, t['jt'+i]); set('jd'+i, t['jd'+i]); });
  // Quality section
  if (t.qlabel) set('q-label', t.qlabel);
  if (t.qh2)   setH('q-h2', t.qh2);
  if (t.qp1)   setH('q-p1', t.qp1);
  if (t.qp2)   setH('q-p2', t.qp2);
  if (t.qquote) set('q-quote', t.qquote);
  if (t.qcite)  set('q-cite', t.qcite);
  if (t.qcta)   set('q-cta', t.qcta);
  // Origin teaser
  if (t.olabel) set('o-label', t.olabel);
  if (t.oh2)   setH('o-h2', t.oh2);
  if (t.op1)   set('o-p1', t.op1);
  if (t.of1)   set('o-f1', t.of1);
  if (t.of2)   set('o-f2', t.of2);
  if (t.of3)   set('o-f3', t.of3);
  if (t.of4)   set('o-f4', t.of4);
  if (t.octa)  set('o-cta', t.octa);

  // Notify other scripts (subpages can listen for custom lang data)
  document.dispatchEvent(new CustomEvent('da-lang', { detail: { lang, t } }));
}

/* ══════════════════════════════════════════
   7. CHECKOUT MODAL
   ══════════════════════════════════════════ */
function openCheckout() {
  const m = document.getElementById('coModal');
  if (m) { m.classList.add('open'); document.body.style.overflow = 'hidden'; }
}
function closeCheckout() {
  const m = document.getElementById('coModal');
  if (m) { m.classList.remove('open'); document.body.style.overflow = ''; }
}
document.addEventListener('keydown', e => {
  if (e.key !== 'Escape') return;
  closeCheckout();
  if (typeof closePayment === 'function') {
    const pm = document.getElementById('payModal');
    if (pm && pm.classList.contains('open')) closePayment();
  }
});

/* ══════════════════════════════════════════
   8. PAYMENT MODAL (boutique / subpages)
   ══════════════════════════════════════════ */
function openPayment(name, price, imgSrc) {
  const elName  = _$('pay-product-name');
  const elPrice = _$('pay-product-price');
  if (elName)  elName.textContent  = name;
  if (elPrice) elPrice.textContent = price;
  buildPayLinks(name, price);
  const m = document.getElementById('payModal');
  if (m) { m.classList.add('open'); document.body.style.overflow = 'hidden'; }
}
function closePayment() {
  const m = document.getElementById('payModal');
  if (m) { m.classList.remove('open'); document.body.style.overflow = ''; }
}
function buildPayLinks(name, price) {
  const msg = 'Bonjour, je souhaite commander: ' + name + ' - ' + price + '. Veuillez m\'indiquer les détails de paiement.';
  const amount = price.replace(/[^0-9.]/g, '');
  const ppLink = 'https://paypal.me/DonAlbertoCafe' + (amount ? '?amount=' + amount : '');
  const waLink = 'https://wa.me/33761528450?text=' + encodeURIComponent(msg);
  const ppEl = _$('pay-paypal'); if (ppEl) ppEl.href = ppLink;
  const waEl = _$('pay-whatsapp'); if (waEl) waEl.href = waLink;
}

/* ══════════════════════════════════════════
   9. INIT
   ══════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  // 1. Inject shell (header + footer)
  injectShell();

  // 2. Apply saved language
  let lang = 'fr';
  try { lang = localStorage.getItem('da_lang') || 'fr'; } catch(e) {}
  setLang(lang);

  // 3. Reveal-on-scroll observer
  const revealObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); revealObs.unobserve(e.target); }
    });
  }, { threshold: 0.09 });
  document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

  // 4. SCA progress bars (subpages)
  const bars = document.querySelectorAll('.sca-fill[data-pct]');
  if (bars.length) {
    const barObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.style.width = e.target.dataset.pct + '%';
          barObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.3 });
    bars.forEach(b => barObs.observe(b));
  }

  // 5. Auto-fade WhatsApp bubble
  setTimeout(() => {
    const b = document.getElementById('wa-bubble');
    if (b) {
      b.style.transition = 'opacity .4s';
      b.style.opacity = '0';
      setTimeout(() => { b.style.display = 'none'; }, 420);
    }
  }, 6500);
});
