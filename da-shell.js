/* da-shell.js */
const SHELL_HEADER = `
<style>
.ni.has-dropdown{position:relative;}
.ni.has-dropdown>a::after{content:'';display:inline-block;width:0;height:0;border-left:3px solid transparent;border-right:3px solid transparent;border-top:4px solid currentColor;margin-left:6px;vertical-align:middle;opacity:.5;transition:transform .2s;}
.ni.has-dropdown:hover>a::after{transform:rotate(180deg);}
.nav-dropdown{
  display:none;
  position:absolute;
  top:100%;
  left:0;
  background:#faf8f4;
  border:1px solid rgba(9,102,133,.14);
  border-top:2px solid var(--teal,#096685);
  min-width:230px;
  z-index:9999;
  box-shadow:0 8px 32px rgba(6,78,101,.13);
}
.ni.has-dropdown:hover .nav-dropdown{display:block;}
.nav-dropdown a{
  display:block;
  padding:12px 18px;
  font-family:'Lato',sans-serif;
  font-size:8.5px;
  letter-spacing:2px;
  text-transform:uppercase;
  color:var(--teal-deep,#064e65);
  text-decoration:none;
  border-bottom:1px solid rgba(9,102,133,.08);
  transition:color .15s,background .15s;
  line-height:1.2;
}
.nav-dropdown a:last-child{border-bottom:none;}
.nav-dropdown a:hover{color:var(--teal,#096685);background:rgba(9,102,133,.05);}
.nav-dropdown a .nd-sub{display:block;font-size:8px;color:rgba(6,78,101,.45);letter-spacing:1px;margin-top:3px;text-transform:none;font-weight:300;}
#util-bar{position:sticky;top:0;z-index:1002;}
#main-nav{position:sticky;top:var(--util-h,38px);z-index:1001;}
@media(max-width:980px){
  #main-nav{top:var(--util-h,38px)!important;}
  .nav-logo-compact{
    position:absolute!important;
    left:50%!important;
    top:50%!important;
    transform:translate(-50%,-50%)!important;
    opacity:0!important;
    transition:opacity .3s ease!important;
    pointer-events:none!important;
  }
  .nav-logo-compact.visible{
    opacity:1!important;
    pointer-events:auto!important;
  }
}
</style>
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
<header id="main-nav">
  <div class="nav-inner">
    <nav class="nav-left" aria-label="Nav gauche">
      <div class="ni has-dropdown">
        <a href="boutique.html" id="n-spec">Specialty Coffee</a>
        <div class="nav-dropdown">
          <a href="boutique.html#catalogue" id="nd-cafe">Notre Café</a>
          <a href="boutique.html#score" id="nd-sca1">Notre SCA — Certification</a>
          <a href="boutique.html#sca" id="nd-sca2">Notre SCA — Évaluation</a>
          <a href="boutique.html#process" id="nd-proc">Notre Procédé</a>
          <a href="boutique.html#famille" id="nd-fam">La Famille</a>
        </div>
      </div>
      <div class="ni"><a href="https://donalberto.cafe/club" id="n-club">Club Don Alberto</a></div>
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
      <a href="boutique.html#formats" class="nav-cmd" id="n-cmd">Commander</a>
    </nav>
    <button class="mob-tog" id="mob-tog" onclick="toggleMob()" aria-label="Menu">
      <span></span><span></span><span></span>
    </button>
  </div>
</header>
<div class="mob-menu" id="mob-menu">
  <div class="mm-hdr">
    <div class="mm-logo-row">
      <a href="index.html"><img src="logos/logo-icon-no-br.png" alt="Don Alberto Café" style="height:32px;width:auto;object-fit:contain;"></a>
    </div>
    <button class="mm-close" onclick="toggleMob()">✕</button>
  </div>
  <div class="mm-body">
    <a href="index.html" class="mm-lnk" id="mm-home">Accueil</a>
    <a href="boutique.html" class="mm-lnk" id="mm-spec">Specialty Coffee</a>
    <a href="club.html" class="mm-lnk" id="mm-club">Club Don Alberto</a>
    <a href="origine-boutique.html" class="mm-lnk" id="mm-orig">Boutique d'Origine</a>
    <a href="b2b.html" class="mm-lnk" id="mm-pro">Espace Pro</a>
    <a href="boutique.html#formats" onclick="toggleMob();" class="mm-cta" id="mm-cmd">Commander</a>
    <a href="maison.html" class="mm-lnk mm-secondary" id="mm-maison">La Maison</a>
    <a href="vlog.html" class="mm-lnk mm-secondary" id="mm-vlog">Le Vlog</a>
  </div>
  <div class="mm-lang">
    <button class="active" data-lang="fr" onclick="setLang('fr');toggleMob()">FR</button>
    <button data-lang="en" onclick="setLang('en');toggleMob()">EN</button>
    <button data-lang="es" onclick="setLang('es');toggleMob()">ES</button>
  </div>
</div>
`;

const SHELL_FOOTER = `
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
    </div>
   <div class="footer-cols">
      <div class="footer-col">
        <h4 onclick="this.parentElement.classList.toggle('open')"><span id="fc-h1">La Marque</span> <svg class="f-arr" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 9l6 6 6-6"/></svg></h4>
        <ul>
          <li><a href="maison.html" id="fl-maison">La Maison</a></li>
          <li><a href="atelier.html" id="fl-atelier">Le Atelier</a></li>
          <li><a href="vlog.html" id="fl-vlog">Le Vlog</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4 onclick="this.parentElement.classList.toggle('open')"><span id="fc-h2">Commander</span> <svg class="f-arr" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 9l6 6 6-6"/></svg></h4>
        <ul>
          <li><a href="boutique.html" id="fl-boutique">Boutique</a></li>
          <li><a href="club.html" id="fl-club">Club Don Alberto</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4 onclick="this.parentElement.classList.toggle('open')"><span id="fc-h3">Partenaires &amp; B2B</span> <svg class="f-arr" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 9l6 6 6-6"/></svg></h4>
        <ul>
          <li><a href="b2b.html" id="fl-b2b">Espace Pro</a></li>
          <li><a href="b2b.html#contact" id="fl-contact">Contacter</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-social-col">
      <h4 class="footer-social-hd" id="footer-follow-lbl">Follow Us</h4>
      <div class="footer-socials">
        <a href="mailto:contact@donalberto.cafe" target="_blank" rel="noopener" class="footer-soc" aria-label="Email">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/></svg>
        </a>
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
<div id="coModal" class="co-modal">
  <div class="co-bd" onclick="closeCheckout()"></div>
  <div class="co-box">
    <button class="co-close" onclick="closeCheckout()">✕</button>
    <iframe src="https://tally.so/r/LZ04RG" width="100%" height="600" frameborder="0" title="Commander" style="display:block;border:none;"></iframe>
  </div>
</div>
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

function injectShell() {
  const hdrPlaceholder = document.getElementById('site-header');
  if (hdrPlaceholder) hdrPlaceholder.outerHTML = SHELL_HEADER;

  const ftrPlaceholder = document.getElementById('site-footer');
  if (ftrPlaceholder) ftrPlaceholder.outerHTML = SHELL_FOOTER;

  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('#main-nav a, .mm-lnk, .mm-sub').forEach(a => {
    const href = a.getAttribute('href') || '';
    if (href && href !== 'javascript:void(0)' && href !== '#') {
      const linkPage = href.split('/').pop().split('#')[0];
      if (linkPage === page) a.classList.add('act', 'mm-active');
    }
  });
  document.querySelectorAll('#util-bar .ub-link').forEach(a => {
    const href = a.getAttribute('href') || '';
    if (href.split('/').pop() === page) a.classList.add('ub-active');
  });
}

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
      utilBar.classList.remove('hide'); 
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

function toggleMob() {
  const m = document.getElementById('mob-menu');
  if (!m) return;
  m.classList.toggle('open');
  document.body.style.overflow = m.classList.contains('open') ? 'hidden' : '';
}

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

const L = {
  fr:{
    sl:'Terre de caractère, grain d\'excellence', craft:'ARTISANAT CAFÉIER ANCESTRAL',
    sl1:'Terre de caractère, grain d\'excellence', sl2:'ARTISANAT CAFÉIER ANCESTRAL',
    fslogan:'Artisanat Caféier Ancestral',
    nlph:'Votre adresse email',
    ey:' Colombie · Single Origin · Specialty', sc:'Défiler',
    p1e:'Specialty Coffee · Boutique', p1t:'Specialty Single Origins<br>de Colombie · SCA 84.5+', p1c:'Explorer la boutique →',
    p2e:'Club Don Alberto · Abonnement', p2t:'Café de spécialité frais<br>chaque mois', p2c:'Rejoindre le Club →',
    nlh:'Rejoignez la communauté <em>Don Alberto</em>', nlp:'Nouvelles récoltes · Actualités ferme', nlb:"S'inscrire",
    t1h:'Commande directe', t1d:'PayPal · Revolut · Wise', t2h:'Livraison internationale', t2d:'France, Europe & Monde',
    t3h:'Café de spécialité SCA', t3d:'Score 84.5 · Procédé Lavé', t4h:'Traçabilité totale', t4d:'Ferme → tasse',
    ubm:'La Maison', ubv:'Le Vlog', ubp:'Espace professionnel',
    home:'Accueil',
    nspec:'Specialty Coffee', nclub:'Club Don Alberto', npro:'Espace Pro', norig:"Boutique d'Origine", ncmd:'Commander', ncmd_b2b:'Contact Pro',
    fh1:'La Marque', fh2:'Commander', fh3:'Partenaires & B2B',
    fm:'La Maison', fa:'Le Atelier', fv:'Le Vlog', fb:'Boutique', fc:'Club Don Alberto', fb2:'Espace Pro', fco:'Contacter',
    fvt:'Notre Vlog — Dans les coulisses de la ferme', wa:"Besoin d'aide ?",
    ssca:'Score SCA', salt:'Altitude', sara:'Premium Varietales', stat4:'Microclimats',
    hcta:'Découvrir le café →',
    mmsecmarque:'La Marque', mmseccmd:'Commander', mmsecpro:'Pro',
    mmorig2:'L\'Origine', mmatelier:'Atelier',
    jt1:'Terroirs Uniques<br>de Colombie', jd1:'Nous travaillons uniquement avec les seules fermes certifiées Green Coffee de leurs micro-régions — une sélection d\'exception parmi les terroirs colombiens.',
    jt2:'Récolte à la<br>main sélective', jd2:'Cueillette grain par grain des seules cerises mûres à point, pour une qualité irréprochable.',
    jt3:'Procédés Artisanaux<br>de Spécialité', jd3:'Lavé, naturel ou honey — chaque origine est traitée selon la méthode qui révèle au mieux son profil. Contrôle rigoureux à chaque étape.',
    jt4:'SCA Certifié<br>84.5+', jd4:'Nous sélectionnons des cafés évalués par des Q-Graders certifiés, avec des scores parfaits constants en uniformité, tasse propre et douceur.',
    jt5:'Torréfaction<br>Artisanale Moyenne', jd5:'Profil maîtrisé pour révéler les notes propres et la texture soyeuse de chaque Variétal.',
    qlabel:"L'Excellence de la Source",
    qh2:'Une densité raffinée,<br>née du terroir de <em>Boyacá</em>',
    qp1:'À 1 670 m d\'altitude, les fluctuations thermiques dramatiques de Rondón forcent les cerises Castillo dans un état de « stress positif » — une maturation plus lente qui concentre des esters complexes et des acides organiques dans chaque grain.',
    qp2:'Le résultat est le profil Don Alberto : <strong>cacao profond et miel visqueux</strong>, obtenus non par intervention mais par l\'intelligence de la terre.',
    qquote:'"Il aimait la terre comme peu d\'hommes savent l\'aimer. Nous cultivons sa mémoire à chaque récolte."',
    qcite:'La famille fondatrice · Don Alberto Café',
    qcta:'Voir le score SCA complet →',
    col_label: "Le café premium mondial récolté en continu",
    col_h2: "Colombie - <em>1er Producteur de Café Premium</em>",
    col_p1: "Avec ses 86 microclimats, ses cordillères andines et ses sols volcaniques perchés entre 1 200 et 2 000 mètres, la Colombie offre une diversité rare et riche. Premier producteur mondial d'Arabica de haute qualité, elle possède un terroir exceptionnel reconnu comme l'une des origines les plus complexes au monde.",
    cs1_val: "~50%", cs1_lbl: "Andisols Volcaniques", cs1_desc: "Près de 50 % des régions productrices de café en Colombie sont situées sur des sols formés par des cendres volcaniques. Ils retiennent parfaitement l'eau et les nutriments, développant la complexité aromatique unique de nos grains.",
    cs2_val: "8–15%", cs2_lbl: "Matière Organique", cs2_desc: "Les sols caféiers colombiens contiennent 8 à 15 % de matière organique, bien au-dessus de la moyenne mondiale (1 à 3 %). Cette richesse nourrit naturellement la plante, garantissant une pureté et une vigueur exceptionnelles.",
    cs3_val: "15%", cs3_lbl: "Carbone Total", cs3_desc: "Dans l'horizon supérieur, le carbone total atteint 15 %. Ce réservoir naturel gorge la plante d'énergie continue pour produire des cerises plus denses et sucrées.",
    cs4_val: ">65%", cs4_lbl: "Porosité du Sol", cs4_desc: "Ces sols présentent une extrême légèreté, avec une porosité dépassant 65 à 75 %. Cela assure un drainage parfait où l'eau s'écoule sans stagner, protégeant les racines de l'asphyxie.",
    cs5_val: "0,7 g/cm³", cs5_lbl: "Faible Densité", cs5_desc: "Ces terres ont une densité de 0,7 à 0,9 g/cm³ contre 1,2 à 1,6 g/cm³ pour un sol agricole standard. Cette structure ultra-légère permet aux racines de s'ancrer profondément et de s'oxygéner, renforçant la vitalité du caféier.",
    col_cta: "Découvrir La Maison →",
    fol_lbl:'Nous Suivre',
    olabel:'Specialty Coffee Boyacá Colombia',
    oh2:'Rondón, Boyacá —<br><em>là où tout commence</em>',
    op1:'Tandis que les régions traditionnelles offrent de la constance, Boyacá offre de la complexité. À 1 670 m, les étages thermiques dramatiques de Rondón concentrent dans la cerise Castillo des esters rares — à l\'origine du profil Don Alberto.',
    of1:'Département unique', of2:'Arabica sélectionné', of3:'Microclimats Colombie', of4:'Seule GCF · Boyacá',
    octa:"Découvrir l'origine →",
    hh1tag:'Origine Exclusive', hh1title:'Seule Green Coffee Farm<br>de Boyacá', hh1desc:"L'unique ferme certifiée d'un département de 1,3 million d'habitants.",
    hh2tag:'Top 5–10% Mondial', hh2title:'Café de Spécialité<br>Certifié SCA · 84.5', hh2desc:'Seuls 5 à 10 % des cafés au monde atteignent le grade « specialty ».',
    hh3tag:'Traçabilité Totale', hh3title:'Ferme → Tasse<br>Zéro Intermédiaire', hh3desc:'Circuit court maîtrisé : qualité maximale, prix juste, impact direct sur la ferme.',
    kOrigine:'Origine', kVariete:'Variété', kProcede:'Procédé', kAltitude:'Altitude',
    kTorref:'Torréfaction', kContenu:'Contenu', kEconomie:'Économie', kLivraison:'Livraison',
    kUsage:'Usage', kPrixKg:'Prix/kg', kMouture:'Mouture', kDuree:'Durée', kPrixSac:'Prix/sac',
    tagGrains:'Grains Entiers', tagMoulu:'Café Moulu', tagPack:'Pack Découverte', tagPro:'Format Professionnel',
    tagSub3:'Abonnement Mensuel · 3 Mois', tagSub6:'Abonnement Mensuel · 6 Mois', tagSubAnn:'Abonnement · 12 Mois',
    vWashed:'Washed · Lavé', vFiltreEsp:'Filtre ou Espresso', vOfferte:'Offerte', vIncluse:'Incluse',
    shipFree:'Livraison offerte', shipCost:'+ livraison €7',
    notesBase:'Cacao & Miel · Agrumes · Texture soyeuse', notesMoulu:'Mouture précisée à la commande · Filtre ou Espresso',
    notesPack:'Idéal pour offrir · Cadeau d\'exception', notesWholesale:'Cafés · Restaurants · Épiceries fines',
    notesEsencia:'La découverte — torréfié frais à chaque envoi', notesRaices:'La fidélité — café frais en continu',
    notesHerencia:'L\'engagement — la meilleure valeur du programme',
    badgePop:'Le plus populaire',
    famLabel:'La Famille', famTitle:'Des visages derrière <em>chaque grain</em>',
    famP1:'Don Alberto Café est bien plus qu’une marque : c’est une signature familiale. Nous sommes un collectif de familles et d’amis d’enfance revenant à nos racines pour mettre en œuvre cet amour de la terre qui nous a été transmis. Ayant grandi à Boyacá au milieu des caféiers, nous connaissons chaque grain par cœur et cultivons ces terres en préservant le savoir-faire artisanal de nos ancêtres.',
    famP2:'Chaque sac est une signature familiale, une preuve d\'artisanat et de dévotion portée à chaque détail. Nous offrons une transparence totale et une traçabilité absolue, de notre ferme à votre tasse.',
    famQuote:'"Quand j\'étais enfant, je récoltais le café avec mon grand-père dans ces mêmes champs. Aujourd\'hui, c\'est nous qui vous l\'offrons."',
    famCite:'Fredy A., Famille Fondatrice',
    ndc:'Notre Café', nds1:'Notre SCA — Certification', nds2:'Notre SCA — Évaluation', ndp:'Notre Procédé', ndf:'La Famille',
    btab_all:'Tout', btab_grains:'Grains', btab_moulu:'Moulu', btab_sub:'Abonnement',
    bfilter_lbl:'Filtrer par', bfilter_ori:'Origine', bfilter_var:'Variété', bfilter_proc:'Procédé',
    bfilter_roast:'Torréfaction', bfilter_sca:'Score SCA', bfilter_reset:'Réinitialiser',
    bformats_lbl:'Nos Formats', bformats_h:'Pour chaque usage, <em>une taille</em>',
    bformats_p:'Choisissez votre format et payez directement. Pour Revolut et Wise, entrez le montant affiché et ajoutez votre adresse en note.',
    bcmd_btn:'Commander →', bjoin_btn:'Rejoindre →',
    bno_results:'Aucun produit ne correspond à vos critères.',
    bno_reset:'Réinitialiser les filtres',
    boutiqueHero: 'La Boutique',
    optBoyaca: 'Boyacá, Colombie', optRondon: 'Rondón, Boyacá',
    optCastillo: 'Castillo', optCaturra: 'Caturra', optColombia: 'Colombia', optTypica: 'Typica', optBourbon: 'Bourbon',
    optWashed: 'Lavé (Washed)', optNatural: 'Nature (Natural)', optHoney: 'Honey', optAnaerobic: 'Anaérobique',
    optLight: 'Claire (Light Roast)', optMedLight: 'Médium Claire (Medium-Light)', optMedium: 'Médium (Medium Roast)', optDark: 'Foncée (Dark Roast)',
    opt90plus: '90+ Grand Cru', opt85_89: '85–89 Excellence', opt80_85: '80–85 Specialty Premium', optCommercial: '60–79 Commercial',
    sca_label: 'Comprendre la Qualité',
    sca_h2: 'Qu\'est-ce que le <em>Score SCA</em><br>et pourquoi 84.5 compte ?',
    sca_p: 'La Specialty Coffee Association est l\'autorité mondiale du café de qualité. Son protocole d\'évaluation — réalisé par des experts Q-Grader certifiés — est la référence internationale pour distinguer un café d\'exception d\'un café ordinaire.',
    sca_t1: 'Café Commercial', sca_badge: 'Notre café', sca_t2: 'Specialty Premium', sca_t3: 'Excellence', sca_t4: 'Grand Cru',
    sca_h3: 'Comment fonctionne<br><em>l\'évaluation SCA ?</em>',
    sca_s1_t: 'La dégustation à l\'aveugle',
    sca_s1_d: 'Un Q-Grader (expert certifié SCA) évalue le café à l\'aveugle sur 10 critères sensoriels — de l\'arôme à l\'impression générale — avec une précision au dixième de point.',
    sca_s2_t: 'Scores parfaits sur 3 critères',
    sca_s2_d: 'Notre Castillo obtient des scores parfaits de 10/10 sur l\'uniformité, la propreté en tasse et la douceur — les marqueurs d\'un procédé lavé maîtrisé et d\'une récolte sélective irréprochable.',
    sca_s3_t: '84.5 — Un seuil rare',
    sca_s3_d: 'Seuls les cafés atteignant 80+ points sont "Specialty Coffee". Avec 84.5, Don Alberto se place dans le top 10% de la production mondiale — une performance exceptionnelle pour une première ferme de Boyacá.',
    sca_s4_t: 'Ce que ça signifie dans votre tasse',
    sca_s4_d: 'Complexité aromatique, clarté, équilibre et une finale propre et élégante. La certification SCA est la garantie que chaque sac Don Alberto tient sa promesse.',
    score_cta: 'Commander Maintenant →',
    proc_label: 'Le Procédé',
    proc_h2: 'Café <em>Lavé</em> — La voie<br>de la pureté aromatique',
    proc_1_h: '1 · Récolte sélective', proc_1_p: 'Seules les cerises mûres à point sont cueillies à la main, grain par grain. Cette sélection rigoureuse est la première condition de la qualité SCA.',
    proc_2_h: '2 · Dépulpage immédiat', proc_2_p: 'La pulpe est retirée mécaniquement dans les heures suivant la récolte. La graine, encore recouverte de mucilage, entre en fermentation contrôlée.',
    proc_3_h: '3 · Fermentation aquatique', proc_3_p: 'Le café fermente dans des cuves d\'eau pendant 24 à 48 heures. Ce processus développe la clarté aromatique signature du café lavé.',
    proc_4_h: '4 · Lavage & Séchage naturel', proc_4_p: 'Un lavage abondant élimine tout résidu. Le café est séché sur lits africains à l\'air libre à 1 670m d\'altitude, préservant les arômes délicats du terroir.',
    proc_b1_h: 'Pureté aromatique totale', proc_b1_p: 'En éliminant toute la pulpe, le procédé lavé exprime avec clarté maximale le terroir et la variété. Chaque note de sol de Boyacá transparaît sans interférence.',
    proc_b2_h: 'Acidité vive et élégante', proc_b2_p: 'Le café lavé développe une acidité plus perceptible et nette. Pour notre Castillo, cela se traduit par une acidité médium agréable qui apporte vivacité sans agressivité.',
    proc_b3_h: 'Tasse propre · Score 10/10', proc_b3_p: 'Notre café obtient le score parfait de 10/10 en "tasse propre" lors de l\'évaluation SCA — reconnaissance directe de la rigueur de notre procédé lavé.',
    gr_eyebrow: 'Don Alberto',
    gr_h2: 'Le grain entier — <em>l\'art de la fraîcheur</em>',
    gr_lbl: 'Pourquoi Grain Entier ?',
    gr_sub: 'La mouture libère immédiatement les arômes volatils. En grain entier, vous restez maître du moment — et de la qualité.',
    gr_c1_h: 'Fraîcheur maximale', gr_c1_p: 'Le café en grain préserve ses huiles aromatiques jusqu\'à 12 mois après torréfaction. Moulu juste avant la préparation, il révèle toute la complexité du terroir andin de Boyacá.',
    gr_c2_h: 'Contrôle de la mouture', gr_c2_p: 'Espresso, filtre, cafetière à piston, Chemex, moka — chaque méthode demande une granulométrie précise. Le grain entier vous donne cette liberté de personnaliser votre extraction.',
    gr_c3_h: 'Valeur aromatique intacte', gr_c3_p: 'Une fois moulu, le café perd 60% de ses arômes en 15 minutes. Don Alberto en grain garantit que vous êtes la première et seule personne à briser le grain — au moment précis où vous le choisissez.',
    cmd_lbl: 'Commander',
    cmd_h2: 'Trois formats,<br><em>une même passion</em>',
    cmd_sub: 'Pour PayPal, le montant est pré-rempli automatiquement. Pour Revolut et Wise, entrez le montant exact de votre format et ajoutez votre adresse de livraison en note.',
    cmd_pp: 'PayPal — montant pré-rempli, paiement immédiat',
    cmd_rv: 'Revolut — entrez le montant + référence produit',
    cmd_ws: 'Wise — idéal depuis UK, Suisse, Colombie, hors zone euro',
    cmd_q: 'Questions : donalberto.coffee@gmail.com',
    cmd_sum: 'Récapitulatif des prix',
    cmd_p1: '250g — Grain entier',
    cmd_p2: '250g — Café Moulu',
    cmd_p3: '3 × 250g — Pack Découverte',
    cmd_p4: '2,5 kg — Wholesale',
    cmd_del: 'Livraison offerte',
    cmd_req: 'Revolut & Wise — Informations requises',
    cmd_req_desc: 'Dans la <strong style="color:white;">note de paiement</strong>, veuillez inclure :<br>· Votre <strong style="color:white;">nom complet</strong><br>· Le <strong style="color:white;">produit commandé</strong> (ex: DA-250g)<br>· Votre <strong style="color:white;">adresse de livraison complète</strong>',
    cmd_foot: 'PayPal · Revolut · Wise<br>Livraison France métropolitaine · 5–10 jours'
  },
  en:{
    sl:'Soul in the Soil, Being in the Bean', craft:'ANCESTRAL COFFEE CRAFTING',
    sl1:'Soul in the Soil, Being in the Bean', sl2:'ANCESTRAL COFFEE CRAFTING',
    fslogan:'Ancestral Coffee Crafting',
    nlph:'Your email address',
    ey:' Colombia · Single Origin · Specialty', sc:'Scroll',
    p1e:'Specialty Coffee · Shop', p1t:'Colombia Specialty<br>Single Origins · SCA 84.5+', p1c:'Explore the shop →',
    p2e:'Club Don Alberto · Subscription', p2t:'Fresh specialty coffee<br>every month', p2c:'Join the Club →',
    nlh:'Join the <em>Don Alberto</em> community', nlp:'New harvests · Farm news', nlb:'Subscribe',
    t1h:'Direct order', t1d:'PayPal · Revolut · Wise', t2h:'International shipping', t2d:'France, Europe & Worldwide',
    t3h:'SCA Specialty Coffee', t3d:'Score 84.5 · Washed Process', t4h:'Full traceability', t4d:'Farm → cup',
    ubm:'The House', ubv:'The Vlog', ubp:'Professional space',
    home:'Home',
    nspec:'Specialty Coffee', nclub:'Club Don Alberto', npro:'Pro Space', norig:'Origin Boutique', ncmd:'Get Coffee', ncmd_b2b:'Contact Pro',
    fh1:'The Brand', fh2:'Order', fh3:'Partners & B2B',
    fm:'The House', fa:'The Atelier', fv:'The Vlog', fb:'Shop', fc:'Club Don Alberto', fb2:'Pro Space', fco:'Contact',
    fvt:'Our Vlog — Behind the scenes at the farm', wa:'Need help?',
    ssca:'SCA Score', salt:'Altitude', sara:'Premium Varietals', stat4:'Microclimates',
    hcta:'Discover the Coffee →',
    mmsecmarque:'The Brand', mmseccmd:'Order', mmsecpro:'Pro',
    mmorig2:'Origin', mmatelier:'Atelier',
    jt1:'Unique<br>Terroirs', jd1:'We work exclusively with the only certified Green Coffee Farms in their micro-regions — a curated selection of Colombia\'s finest terroirs.',
    jt2:'Selective<br>Hand Harvest', jd2:'Berry by berry picking of only ripe cherries, for irreproachable quality.',
    jt3:'Artisan<br>Processes', jd3:'Washed, natural or honey — each origin is processed using the method that best reveals its unique profile. Rigorous control at every step.',
    jt4:'SCA Certified<br>84.5+', jd4:'We offer coffees evaluated by Q-certified Graders with consistently perfect scores in uniformity, clean cup and sweetness.',
    jt5:'Medium<br>Artisan Roast', jd5:'Mastered profile to reveal clean notes and the silky texture of each Varietal.',
    qlabel:'The Excellence of the Source',
    qh2:'A refined density,<br>born from the terroir of <em>Boyacá</em>',
    qp1:'At 1,670m altitude, the dramatic thermal fluctuations of Rondón push the Castillo cherries into a state of "positive stress" — a slower ripening that concentrates complex esters and organic acids into every bean.',
    qp2:'The result is the Don Alberto profile: <strong>deep cacao and viscous honey</strong>, achieved not through intervention but through the intelligence of the land.',
    qquote:'"He loved the land as few men know how to. We cultivate his memory with every harvest."',
    qcite:'The founding family · Don Alberto Café',
    qcta:'View the full SCA score →',
    col_label: "The world's premium coffee harvested continuously",
    col_h2: "Colombia - <em>#1 Premium Coffee Producer</em>",
    col_p1: "With its 86 microclimates, Andean mountain ranges, and volcanic soils perched between 1,200 and 2,000 meters, Colombia offers a rare and rich diversity. The world's leading producer of high-quality Arabica, it boasts an exceptional terroir recognized as one of the most complex origins in the world.",
    cs1_val: "~50%", cs1_lbl: "Volcanic Andisols", cs1_desc: "Nearly 50% of Colombia’s coffee-growing regions are situated on soils formed by volcanic ash. They perfectly retain water and nutrients, developing the unique aromatic complexity of our beans.",
    cs2_val: "8–15%", cs2_lbl: "Organic Matter", cs2_desc: "Colombian coffee soils average 8% to 15% organic matter, significantly higher than the global average of 1% to 3%. This richness naturally nourishes the plant, guaranteeing exceptional purity and vigor.",
    cs3_val: "15%", cs3_lbl: "Total Carbon", cs3_desc: "In the upper horizon, total carbon reaches 15%. This natural reservoir continuously fuels the plant to produce denser, sweeter cherries.",
    cs4_val: ">65%", cs4_lbl: "Soil Porosity", cs4_desc: "These soils exhibit extreme fluffiness, with porosity exceeding 65% to 75%. This ensures perfect drainage where water flows without stagnating, protecting roots from asphyxiation.",
    cs5_val: "0.7 g/cm³", cs5_lbl: "Low Density", cs5_desc: "These soils have a density of 0.7 to 0.9 g/cm³ compared to 1.2 to 1.6 g/cm³ for standard agricultural soil. This ultra-light structure allows roots to anchor deeply and absorb oxygen, strengthening the tree's vitality.",
    col_cta: "Discover The House →",
    fol_lbl:'Follow Us',
    olabel:'Specialty Coffee Boyacá Colombia',
    oh2:'Rondón, Boyacá —<br><em>where it all begins</em>',
    op1:'While traditional regions offer consistency, Boyacá offers complexity. At 1,670m, the dramatic thermal layers of Rondón concentrate rare esters in the Castillo cherry — the origin of the Don Alberto profile.',
    of1:'Unique department', of2:'Selected Arabica', of3:'Colombia microclimates', of4:'Only GCF · Boyacá',
    octa:'Discover the origin →',
    hh1tag:'Exclusive Origin', hh1title:'The Only Green Coffee Farm<br>in Boyacá', hh1desc:'The sole certified farm in a department of 1.3 million people.',
    hh2tag:'Top 5–10% Worldwide', hh2title:'SCA Certified<br>Specialty Coffee · 84.5', hh2desc:'Only 5–10% of coffees worldwide reach the specialty grade standard.',
    hh3tag:'Full Traceability', hh3title:'Farm → Cup<br>Zero Middle-Men', hh3desc:'Direct supply chain: maximum quality, fair pricing, full impact on the farm.',
    kOrigine:'Origin', kVariete:'Variety', kProcede:'Process', kAltitude:'Altitude',
    kTorref:'Roast', kContenu:'Contents', kEconomie:'Saving', kLivraison:'Shipping',
    kUsage:'Use', kPrixKg:'Price/kg', kMouture:'Grind', kDuree:'Duration', kPrixSac:'Price/bag',
    tagGrains:'Whole Bean', tagMoulu:'Ground Coffee', tagPack:'Discovery Pack', tagPro:'Pro Format',
    tagSub3:'Monthly Sub · 3 Months', tagSub6:'Monthly Sub · 6 Months', tagSubAnn:'Annual Sub',
    vWashed:'Washed', vFiltreEsp:'Filter or Espresso', vOfferte:'Free', vIncluse:'Included',
    shipFree:'Free shipping', shipCost:'+ shipping €7',
    notesBase:'Cocoa & Honey · Citrus · Silky Texture', notesMoulu:'Grind specified at checkout · Filter or Espresso',
    notesPack:'Perfect gift · Exceptional experience', notesWholesale:'Cafés · Restaurants · Fine Grocery',
    notesEsencia:'Discovery — freshly roasted with each delivery', notesRaices:'Loyalty — fresh coffee non-stop',
    notesHerencia:'Commitment — best value in the program',
    badgePop:'Most popular',
    famLabel:'The Family', famTitle:'Faces behind <em>every bean</em>',
    famP1:'Don Alberto Café is more than just a brand; it is a family legacy. We are a collective of families and childhood friends returning to our roots to cultivate the love of the land that has been passed down to us. Having grown up in Boyacá surrounded by coffee trees, we know every bean by heart and cultivate these lands while preserving the traditional knowledge of our ancestors.',
    famP2:'Every bag is a family signature, an evidence of craftsmanship and devotion to every detail. We offer full transparency and total traceability from our farm to your cup.',
    famQuote:'"As a child, I harvested coffee with my grandfather in these very fields. Today, it is us who offer it to you."',
    famCite:'Fredy A., Founding Family',
    ndc:'Our Coffee', nds1:'Our SCA — Certification', nds2:'Our SCA — Evaluation', ndp:'Our Process', ndf:'The Family',
    btab_all:'All', btab_grains:'Whole Bean', btab_moulu:'Ground', btab_sub:'Subscription',
    bfilter_lbl:'Filter by', bfilter_ori:'Origin', bfilter_var:'Variety', bfilter_proc:'Process',
    bfilter_roast:'Roast', bfilter_sca:'SCA Score', bfilter_reset:'Reset',
    bformats_lbl:'Our Formats', bformats_h:'For every use, <em>one size</em>',
    bformats_p:'Choose your format and pay directly. For Revolut and Wise, enter the displayed amount and add your address in the note.',
    bcmd_btn:'Order →', bjoin_btn:'Join →',
    bno_results:'No products match your criteria.',
    bno_reset:'Reset filters',
    boutiqueHero: 'The Shop',
    optBoyaca: 'Boyacá, Colombia', optRondon: 'Rondón, Boyacá',
    optCastillo: 'Castillo', optCaturra: 'Caturra', optColombia: 'Colombia', optTypica: 'Typica', optBourbon: 'Bourbon',
    optWashed: 'Washed', optNatural: 'Natural', optHoney: 'Honey', optAnaerobic: 'Anaerobic',
    optLight: 'Light Roast', optMedLight: 'Medium-Light', optMedium: 'Medium Roast', optDark: 'Dark Roast',
    opt90plus: '90+ Grand Cru', opt85_89: '85–89 Excellence', opt80_85: '80–85 Specialty Premium', optCommercial: '60–79 Commercial',
    sca_label: 'Understanding Quality',
    sca_h2: 'What is the <em>SCA Score</em><br>and why does 84.5 matter?',
    sca_p: 'The Specialty Coffee Association is the global authority on coffee quality. Its evaluation protocol — conducted by certified Q-Graders — is the international standard for distinguishing exceptional coffee from ordinary coffee.',
    sca_t1: 'Commercial Coffee', sca_badge: 'Our coffee', sca_t2: 'Specialty Premium', sca_t3: 'Excellence', sca_t4: 'Grand Cru',
    sca_h3: 'How does the<br><em>SCA evaluation work?</em>',
    sca_s1_t: 'Blind Tasting',
    sca_s1_d: 'A Q-Grader (SCA certified expert) blindly evaluates the coffee on 10 sensory criteria — from aroma to overall impression — with decimal-point precision.',
    sca_s2_t: 'Perfect scores on 3 criteria',
    sca_s2_d: 'Our Castillo achieves perfect 10/10 scores on uniformity, clean cup, and sweetness — the markers of a mastered washed process and impeccable selective harvesting.',
    sca_s3_t: '84.5 — A rare threshold',
    sca_s3_d: 'Only coffees reaching 80+ points are "Specialty Coffee". At 84.5, Don Alberto ranks in the top 10% of global production — an exceptional achievement for a first farm in Boyacá.',
    sca_s4_t: 'What it means in your cup',
    sca_s4_d: 'Aromatic complexity, clarity, balance, and a clean, elegant finish. The SCA certification guarantees that every bag of Don Alberto delivers on its promise.',
    score_cta: 'Order Now →',
    proc_label: 'The Process',
    proc_h2: '<em>Washed</em> Coffee — The path<br>to aromatic purity',
    proc_1_h: '1 · Selective harvesting', proc_1_p: 'Only perfectly ripe cherries are hand-picked, bean by bean. This rigorous selection is the first condition for SCA quality.',
    proc_2_h: '2 · Immediate depulping', proc_2_p: 'The pulp is mechanically removed within hours of harvest. The seed, still covered in mucilage, enters controlled fermentation.',
    proc_3_h: '3 · Aquatic fermentation', proc_3_p: 'The coffee ferments in water tanks for 24 to 48 hours. This process develops the aromatic clarity signature to washed coffee.',
    proc_4_h: '4 · Washing & Natural drying', proc_4_p: 'An abundant wash eliminates any residue. The coffee is then sun-dried on African beds at 1,670m altitude, preserving the delicate terrior aromas.',
    proc_b1_h: 'Total aromatic purity', proc_b1_p: 'By eliminating all the pulp, the washed process expresses the terroir and variety with maximum clarity. Every note of the Boyacá soil shines through without interference.',
    proc_b2_h: 'Bright and elegant acidity', proc_b2_p: 'Washed coffee develops a more perceptible and crisp acidity. For our Castillo, this translates to a pleasant medium acidity that brings liveliness without aggressiveness.',
    proc_b3_h: 'Clean cup · Score 10/10', proc_b3_p: 'Our coffee obtained the perfect score of 10/10 in "clean cup" during the SCA evaluation — a direct recognition of our rigorous washed process.',
    gr_eyebrow: 'Don Alberto',
    gr_h2: 'Whole bean — <em>the art of freshness</em>',
    gr_lbl: 'Why Whole Bean?',
    gr_sub: 'Grinding immediately releases volatile aromas. In whole bean form, you remain the master of the moment — and the quality.',
    gr_c1_h: 'Maximum freshness', gr_c1_p: 'Whole bean coffee preserves its aromatic oils up to 12 months after roasting. Ground just before brewing, it reveals all the complexity of the Andean terroir of Boyacá.',
    gr_c2_h: 'Grind control', gr_c2_p: 'Espresso, filter, French press, Chemex, moka — each method requires a precise grind size. Whole beans give you the freedom to customize your extraction.',
    gr_c3_h: 'Intact aromatic value', gr_c3_p: 'Once ground, coffee loses 60% of its aromas in 15 minutes. Don Alberto whole beans guarantee that you are the first and only person to break the bean — at the precise moment you choose.',
    cmd_lbl: 'Order',
    cmd_h2: 'Three formats,<br><em>one passion</em>',
    cmd_sub: 'For PayPal, the amount is pre-filled automatically. For Revolut and Wise, enter the exact amount for your format and add your shipping address in the notes.',
    cmd_pp: 'PayPal — pre-filled amount, instant payment',
    cmd_rv: 'Revolut — enter the amount + product reference',
    cmd_ws: 'Wise — ideal from UK, Switzerland, Colombia, outside Eurozone',
    cmd_q: 'Questions : donalberto.coffee@gmail.com',
    cmd_sum: 'Price Summary',
    cmd_p1: '250g — Whole Bean',
    cmd_p2: '250g — Ground Coffee',
    cmd_p3: '3 × 250g — Discovery Pack',
    cmd_p4: '2.5 kg — Wholesale',
    cmd_del: 'Free shipping',
    cmd_req: 'Revolut & Wise — Required Information',
    cmd_req_desc: 'In the <strong style="color:white;">payment note</strong>, please include:<br>· Your <strong style="color:white;">full name</strong><br>· The <strong style="color:white;">ordered product</strong> (e.g. DA-250g)<br>· Your <strong style="color:white;">complete shipping address</strong>',
    cmd_foot: 'PayPal · Revolut · Wise<br>Shipping to metropolitan France · 5–10 days'
  },
  es:{
    sl:'Esencia del Suelo, Vida en el Fruto', craft:'ARTE CAFETALERO ANCESTRAL',
    sl1:'Esencia del Suelo, Vida en el Fruto', sl2:'ARTE CAFETALERO ANCESTRAL',
    fslogan:'Arte Cafetero Ancestral',
    nlph:'Tu dirección de correo',
    ey:' Colombia · Origen Único · Specialty', sc:'Deslizar',
    p1e:'Specialty Coffee · Tienda', p1t:'Specialty Single Origins<br>de Colombia · SCA 84.5+', p1c:'Explorar la tienda →',
    p2e:'Club Don Alberto · Suscripción', p2t:'Café especial fresco<br>cada mes', p2c:'Unirse al Club →',
    nlh:'Únete a la comunidad <em>Don Alberto</em>', nlp:'Cosechas · Noticias de la finca', nlb:'Suscribirse',
    t1h:'Pedido directo', t1d:'PayPal · Revolut · Wise', t2h:'Envío internacional', t2d:'Francia, Europa y El Mundo',
    t3h:'Café de especialidad SCA', t3d:'Puntaje 84.5 · Proceso Lavado', t4h:'Trazabilidad total', t4d:'Finca → taza',
    ubm:'La Casa', ubv:'El Vlog', ubp:'Espacio profesional',
    home:'Inicio',
    nspec:'Specialty Coffee', nclub:'Club Don Alberto', npro:'Espacio Pro', norig:'Boutique de Origen', ncmd:'Ordenar', ncmd_b2b:'Contacto Pro',
    fh1:'La Marca', fh2:'Ordenar', fh3:'Socios & B2B',
    fm:'La Casa', fa:'El Atelier', fv:'El Vlog', fb:'Tienda', fc:'Club Don Alberto', fb2:'Espacio Pro', fco:'Contactar',
    fvt:'Nuestro Vlog — Detrás de escena en la finca', wa:'¿Necesitas ayuda?',
    ssca:'Puntaje SCA', salt:'Altitud', sara:'Premium Varietales', stat4:'Microclimas',
    hcta:'Descubrir el café →',
    mmsecmarque:'La Marca', mmseccmd:'Ordenar', mmsecpro:'Pro',
    mmorig2:'El Origen', mmatelier:'Atelier',
    jt1:'Terroirs Únicos<br>de Colombia', jd1:'Trabajamos exclusivamente con las únicas fincas Green Coffee certificadas en sus micro-regiones — una selección excepcional de los mejores terroirs colombianos.',
    jt2:'Cosecha manual<br>selectiva', jd2:'Recolección grano a grano de las cerezas maduras, para una calidad irreprochable.',
    jt3:'Procesos Artesanales<br>de Especialidad', jd3:'Lavado, natural o honey — cada origen se procesa con el método que mejor revela su perfil único. Control riguroso en cada etapa.',
    jt4:'Certificado SCA<br>84.5+', jd4:'Ofrecemos cafés evaluados por Q-Graders certificados con puntajes perfectos constantes en uniformidad, taza limpia y dulzura.',
    jt5:'Tostión Media<br>Artesanal', jd5:'Perfil dominado para revelar notas limpias y la textura sedosa de cada Varietal.',
    qlabel:'La Excelencia del Origen',
    qh2:'Una densidad refinada,<br>nacida del terroir de <em>Boyacá</em>',
    qp1:'A 1.670 m de altitud, las dramáticas fluctuaciones térmicas de Rondón empujan las cerezas Castillo a un estado de "estrés positivo" — una maduración más lenta que concentra ésteres complejos y ácidos orgánicos en cada grano.',
    qp2:'El resultado es el perfil Don Alberto: <strong>cacao profundo y miel viscosa</strong>, logrados no por intervención sino por la inteligencia de la tierra.',
    qquote:'"Amaba la tierra como pocos hombres saben amarla. Cultivamos su memoria en cada cosecha."',
    qcite:'La familia fundadora · Don Alberto Café',
    qcta:'Ver el puntaje SCA completo →',
    col_label: "El café premium del mundo cosechado continuamente",
    col_h2: "Colombia - <em>Productor #1 de Café Premium</em>",
    col_p1: "Con sus 86 microclimas, cordilleras andinas y suelos volcánicos entre 1.200 y 2.000 metros, Colombia ofrece una diversidad rara y rica. Siendo el principal productor mundial de Arábica de alta calidad, cuenta con un terruño excepcional reconocido como uno de los orígenes más complejos del mundo.",
    cs1_val: "~50%", cs1_lbl: "Andisoles Volcánicos", cs1_desc: "Casi el 50% de las regiones cafetaleras de Colombia están en suelos formados por ceniza volcánica. Retienen perfectamente el agua y los nutrientes, desarrollando la complejidad aromática única de nuestros granos.",
    cs2_val: "8–15%", cs2_lbl: "Materia Orgánica", cs2_desc: "Los suelos cafetaleros colombianos promedian entre 8% y 15% de materia orgánica, muy superior al promedio mundial de 1% a 3%. Esta riqueza nutre naturalmente la planta, garantizando una pureza y vigor excepcionales.",
    cs3_val: "15%", cs3_lbl: "Carbono Total", cs3_desc: "En el horizonte superior, el carbono total alcanza el 15%. Este reservorio natural alimenta continuamente a la planta para producir cerezas más densas y dulces.",
    cs4_val: ">65%", cs4_lbl: "Porosidad del Suelo", cs4_desc: "Estos suelos exhiben una extrema ligereza, con una porosidad que supera el 65% al 75%. Esto asegura un drenaje perfecto donde el agua fluye sin estancarse, protegiendo las raíces de la asfixia.",
    cs5_val: "0.7 g/cm³", cs5_lbl: "Baja Densidad", cs5_desc: "Estas tierras tienen una densidad de 0.7 a 0.9 g/cm³ en comparación con 1.2 a 1.6 g/cm³ para un suelo agrícola estándar. Esta estructura ultraligera permite que las raíces se anclen profundamente y se oxigenen, fortaleciendo la vitalidad del cafeto.",
    col_cta: "Descubrir La Casa →",
    fol_lbl:'Síguenos',
    olabel:'Specialty Coffee Boyacá Colombia',
    oh2:'Rondón, Boyacá —<br><em>donde todo comienza</em>',
    op1:'Mientras las regiones tradicionales ofrecen constancia, Boyacá ofrece complejidad. A 1.670 m, los dramáticos pisos térmicos de Rondón concentran en la cereza Castillo ésteres raros — el origen del perfil Don Alberto.',
    of1:'Departamento único', of2:'Arabica seleccionado', of3:'Microclimas Colombia', of4:'Única GCF · Boyacá',
    octa:'Descubrir el origen →',
    hh1tag:'Origen Exclusivo', hh1title:'Única Green Coffee Farm<br>en Boyacá', hh1desc:'La única finca certificada en un departamento de 1,3 millones de habitantes.',
    hh2tag:'Top 5–10% Mundial', hh2title:'Café de Especialidad<br>Certificado SCA · 84.5', hh2desc:'Solo el 5–10% de los cafés del mundo alcanzan el grado specialty.',
    hh3tag:'Trazabilidad Total', hh3title:'Finca → Taza<br>Cero Intermediarios', hh3desc:'Cadena directa: máxima calidad, precio justo, impacto real en la finca.',
    kOrigine:'Origen', kVariete:'Variedad', kProcede:'Proceso', kAltitude:'Altitud',
    kTorref:'Tostión', kContenu:'Contenido', kEconomie:'Ahorro', kLivraison:'Envío',
    kUsage:'Uso', kPrixKg:'Precio/kg', kMouture:'Molienda', kDuree:'Duración', kPrixSac:'Precio/bolsa',
    tagGrains:'Grano Entero', tagMoulu:'Café Molido', tagPack:'Pack Descubrimiento', tagPro:'Formato Profesional',
    tagSub3:'Suscripción Mensual · 3 Meses', tagSub6:'Suscripción Mensual · 6 Meses', tagSubAnn:'Suscripción · 12 Meses',
    vWashed:'Lavado', vFiltreEsp:'Filtro o Espresso', vOfferte:'Gratis', vIncluse:'Incluido',
    shipFree:'Envío gratis', shipCost:'+ envío €7',
    notesBase:'Cacao & Miel · Cítricos · Textura Sedosa', notesMoulu:'Molienda especificada al pedir · Filtro o Espresso',
    notesPack:'Ideal para regalar · Experiencia excepcional', notesWholesale:'Cafés · Restaurantes · Tiendas Gourmet',
    notesEsencia:'Descubrimiento — tostado fresco en cada envío', notesRaices:'Fidelidad — café fresco sin parar',
    notesHerencia:'Compromiso — mejor valor del programa',
    badgePop:'El más popular',
    famLabel:'La Familia', famTitle:'Rostros detrás de <em>cada grano</em>',
    famP1:'Don Alberto Café es mucho más que una marca: es un sello familiar. Somos un colectivo de familias y amigos de la infancia que vuelve a sus raíces para honrar el amor por la tierra que heredamos. Crecimos en Boyacá, entre cafetales; conocemos cada grano de memoria y cultivamos estas tierras preservando la tradición artesanal de nuestros antepasados.',
    famP2:'Cada bolsa es una firma familiar, una evidencia de artesanía y devoción en cada detalle. Ofrecemos transparencia plena y trazabilidad total, desde nuestra finca hasta su taza.',
    famQuote:'"Cuando era niño, cosechaba café con mi abuelo en estos mismos campos. Hoy somos nosotros quienes te lo ofrecemos."',
    famCite:'Fredy A., Familia Fundadora',
    ndc:'Nuestro Café', nds1:'Nuestro SCA — Certificación', nds2:'Nuestro SCA — Evaluación', ndp:'Nuestro Proceso', ndf:'La Familia',
    btab_all:'Todo', btab_grains:'Grano', btab_moulu:'Molido', btab_sub:'Suscripción',
    bfilter_lbl:'Filtrar por', bfilter_ori:'Origen', bfilter_var:'Variedad', bfilter_proc:'Proceso',
    bfilter_roast:'Tostión', bfilter_sca:'Puntaje SCA', bfilter_reset:'Reiniciar',
    bformats_lbl:'Nuestros Formatos', bformats_h:'Para cada uso, <em>un tamaño</em>',
    bformats_p:'Elige tu formato y paga directamente. Para Revolut y Wise, ingresa el monto indicado y añade tu dirección en la nota.',
    bcmd_btn:'Ordenar →', bjoin_btn:'Unirse →',
    bno_results:'Ningún producto coincide con tus criterios.',
    bno_reset:'Reiniciar filtros',
    boutiqueHero: 'La Tienda',
    optBoyaca: 'Boyacá, Colombia', optRondon: 'Rondón, Boyacá',
    optCastillo: 'Castillo', optCaturra: 'Caturra', optColombia: 'Colombia', optTypica: 'Typica', optBourbon: 'Bourbon',
    optWashed: 'Lavado (Washed)', optNatural: 'Natural', optHoney: 'Honey', optAnaerobic: 'Anaeróbico',
    optLight: 'Tueste Claro', optMedLight: 'Tueste Medio-Claro', optMedium: 'Tueste Medio', optDark: 'Tueste Oscuro',
    opt90plus: '90+ Grand Cru', opt85_89: '85–89 Excelencia', opt80_85: '80–85 Specialty Premium', optCommercial: '60–79 Comercial',
    sca_label: 'Entendiendo la Calidad',
    sca_h2: '¿Qué es el <em>Puntaje SCA</em><br>y por qué importa el 84.5?',
    sca_p: 'La Specialty Coffee Association es la autoridad mundial en calidad del café. Su protocolo de evaluación — realizado por Q-Graders certificados — es el estándar internacional para distinguir un café excepcional de uno ordinario.',
    sca_t1: 'Café Comercial', sca_badge: 'Nuestro café', sca_t2: 'Specialty Premium', sca_t3: 'Excelencia', sca_t4: 'Grand Cru',
    sca_h3: '¿Cómo funciona la<br><em>evaluación SCA?</em>',
    sca_s1_t: 'Cata a ciegas',
    sca_s1_d: 'Un Q-Grader (experto certificado SCA) evalúa a ciegas el café en 10 criterios sensoriales — desde el aroma hasta la impresión general — con precisión de un decimal.',
    sca_s2_t: 'Puntajes perfectos en 3 criterios',
    sca_s2_d: 'Nuestro Castillo logra puntajes perfectos de 10/10 en uniformidad, taza limpia y dulzura — los marcadores de un proceso lavado dominado y una recolección selectiva impecable.',
    sca_s3_t: '84.5 — Un umbral raro',
    sca_s3_d: 'Solo los cafés que alcanzan 80+ puntos son "Specialty Coffee". Con 84.5, Don Alberto se ubica en el top 10% de la producción mundial — un logro excepcional para una primera finca en Boyacá.',
    sca_s4_t: 'Lo que significa en tu taza',
    sca_s4_d: 'Complejidad aromática, claridad, equilibrio y un final limpio y elegante. La certificación SCA es la garantía de que cada bolsa de Don Alberto cumple su promesa.',
    score_cta: 'Ordenar Ahora →',
    proc_label: 'El Proceso',
    proc_h2: 'Café <em>Lavado</em> — El camino<br>hacia la pureza aromática',
    proc_1_h: '1 · Cosecha selectiva', proc_1_p: 'Solo las cerezas maduras se recolectan a mano, grano por grano. Esta rigurosa selección es la primera condición para la calidad SCA.',
    proc_2_h: '2 · Despulpado inmediato', proc_2_p: 'La pulpa se retira mecánicamente en las horas siguientes a la cosecha. La semilla, aún cubierta de mucílago, entra en fermentación controlada.',
    proc_3_h: '3 · Fermentación acuática', proc_3_p: 'El café fermenta en tanques de agua durante 24 a 48 horas. Este proceso desarrolla la claridad aromática característica del café lavado.',
    proc_4_h: '4 · Lavado y Secado natural', proc_4_p: 'Un lavado abundante elimina cualquier residuo. El café se seca al sol en camas africanas a 1.670 m de altitud, preservando los delicados aromas del terruño.',
    proc_b1_h: 'Pureza aromática total', proc_b1_p: 'Al eliminar toda la pulpa, el proceso lavado expresa con máxima claridad el terruño y la variedad. Cada nota del suelo de Boyacá brilla sin interferencias.',
    proc_b2_h: 'Acidez brillante y elegante', proc_b2_p: 'El café lavado desarrolla una acidez más perceptible y nítida. Para nuestro Castillo, esto se traduce en una acidez media agradable que aporta vivacidad sin agresividad.',
    proc_b3_h: 'Taza limpia · Score 10/10', proc_b3_p: 'Nuestro café obtuvo la calificación perfecta de 10/10 en "taza limpia" durante la evaluación SCA — un reconocimiento directo a la rigurosidad de nuestro proceso lavado.',
    gr_eyebrow: 'Don Alberto',
    gr_h2: 'Grano entero — <em>el arte de la frescura</em>',
    gr_lbl: '¿Por qué Grano Entero?',
    gr_sub: 'La molienda libera inmediatamente los aromas volátiles. En grano entero, usted sigue siendo el dueño del momento — y de la calidad.',
    gr_c1_h: 'Frescura máxima', gr_c1_p: 'El café en grano conserva sus aceites aromáticos hasta 12 meses después del tueste. Molido justo antes de la preparación, revela toda la complejidad del terruño andino de Boyacá.',
    gr_c2_h: 'Control de la molienda', gr_c2_p: 'Espresso, filtro, prensa francesa, Chemex, moka — cada método requiere una granulometría precisa. Los granos enteros le dan la libertad de personalizar su extracción.',
    gr_c3_h: 'Valor aromático intacto', gr_c3_p: 'Una vez molido, el café pierde el 60% de sus aromas en 15 minutos. Los granos enteros Don Alberto garantizan que usted sea la primera y única persona en romper el grano — en el momento exacto que elija.',
    cmd_lbl: 'Ordenar',
    cmd_h2: 'Tres formatos,<br><em>una misma pasión</em>',
    cmd_sub: 'Para PayPal, el monto se completa automáticamente. Para Revolut y Wise, ingrese el monto exacto de su formato y agregue su dirección de envío en la nota.',
    cmd_pp: 'PayPal — monto precompletado, pago inmediato',
    cmd_rv: 'Revolut — ingrese el monto + referencia del producto',
    cmd_ws: 'Wise — ideal desde UK, Suiza, Colombia, fuera de la eurozona',
    cmd_q: 'Preguntas : donalberto.coffee@gmail.com',
    cmd_sum: 'Resumen de Precios',
    cmd_p1: '250g — Grano Entero',
    cmd_p2: '250g — Café Molido',
    cmd_p3: '3 × 250g — Pack Descubrimiento',
    cmd_p4: '2,5 kg — Wholesale',
    cmd_del: 'Envío gratis',
    cmd_req: 'Revolut & Wise — Información requerida',
    cmd_req_desc: 'En la <strong style="color:white;">nota de pago</strong>, por favor incluya:<br>· Su <strong style="color:white;">nombre completo</strong><br>· El <strong style="color:white;">producto ordenado</strong> (ej: DA-250g)<br>· Su <strong style="color:white;">dirección de envío completa</strong>',
    cmd_foot: 'PayPal · Revolut · Wise<br>Envío a Francia metropolitana · 5–10 días'
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

  set('hf-sl1', t.sl1); set('hf-sl2', t.sl2);
  set('h-sl', t.sl); set('h-craft', t.craft); set('h-ey', t.ey); set('s-scroll', t.sc);
  set('s-sca', t.ssca); set('s-alt', t.salt); set('s-ara', t.sara); set('s-stat4', t.stat4);
  const hcta = _$('hero-cta-btn'); if (hcta) hcta.textContent = t.hcta;
  
  set('p1-ey', t.p1e); setH('p1-ti', t.p1t); set('p1-ct', t.p1c);
  set('p2-ey', t.p2e); setH('p2-ti', t.p2t); set('p2-ct', t.p2c);
  
  setH('nl-h', t.nlh); set('nl-p', t.nlp); set('nl-btn', t.nlb);
  const nli = _$('nl-input'); if (nli) nli.placeholder = t.nlph;
  
  ['1','2','3','4'].forEach(i => { set('t'+i+'h', t['t'+i+'h']); set('t'+i+'d', t['t'+i+'d']); });
  
  set('ub-maison', t.ubm); set('ub-vlog', t.ubv); set('ub-pro', t.ubp);
  
  set('n-spec', t.nspec); set('n-club', t.nclub); set('n-pro', t.npro); set('n-orig', t.norig);
  const b2bPage = document.body && document.body.classList.contains('page-b2b');
  const cmdTxt = b2bPage && t.ncmd_b2b ? t.ncmd_b2b : t.ncmd;
  set('n-cmd', cmdTxt);
  
  set('mm-home', t.home);
  set('mm-spec', t.nspec); set('mm-club', t.nclub); set('mm-orig', t.norig);
  set('mm-pro', t.npro); set('mm-cmd', cmdTxt);
  set('mm-maison', t.fm); set('mm-vlog', t.ubv);
  
  set('fc-h1', t.fh1); set('fc-h2', t.fh2); set('fc-h3', t.fh3);
  set('fl-maison', t.fm); set('fl-atelier', t.fa); set('fl-vlog', t.fv);
  set('fl-boutique', t.fb); set('fl-club', t.fc); set('fl-b2b', t.fb2); set('fl-contact', t.fco);
  set('fv-txt', t.fvt); setH('footer-slogan', t.fslogan);
  
  set('wa-txt', t.wa);
  const waL = _$('wa-link');
  if (waL) waL.href = 'https://wa.me/33761528450?text=' + encodeURIComponent(t.wa === 'Need help?' ? 'Hello, I have a question about Don Alberto Café.' : t.wa === '¿Necesitas ayuda?' ? 'Hola, tengo una pregunta sobre Don Alberto Café.' : "Bonjour, j'ai une question sur Don Alberto Café.");
  
  ['1','2','3','4','5'].forEach(i => { setH('jt'+i, t['jt'+i]); set('jd'+i, t['jd'+i]); });
  
  if (t.qlabel) set('q-label', t.qlabel);
  if (t.qh2)   setH('q-h2', t.qh2);
  if (t.qp1)   setH('q-p1', t.qp1);
  if (t.qp2)   setH('q-p2', t.qp2);
  if (t.qquote) set('q-quote', t.qquote);
  if (t.qcite)  set('q-cite', t.qcite);
  if (t.qcta)   set('q-cta', t.qcta);
  
  if (t.col_label) set('col-label', t.col_label);
  if (t.col_h2)    setH('col-h2',   t.col_h2);
  if (t.col_p1)    set('col-p1',    t.col_p1);
  if (t.col_cta)   set('col-cta',   t.col_cta);

  if (t.cs1_val) {
    set('cs1-val', t.cs1_val); set('cs1-lbl', t.cs1_lbl); set('cs1-desc', t.cs1_desc);
    set('cs2-val', t.cs2_val); set('cs2-lbl', t.cs2_lbl); set('cs2-desc', t.cs2_desc);
    set('cs3-val', t.cs3_val); set('cs3-lbl', t.cs3_lbl); set('cs3-desc', t.cs3_desc);
    set('cs4-val', t.cs4_val); set('cs4-lbl', t.cs4_lbl); set('cs4-desc', t.cs4_desc);
    set('cs5-val', t.cs5_val); set('cs5-lbl', t.cs5_lbl); set('cs5-desc', t.cs5_desc);

    set('cb1-t', t.cs1_lbl); set('cb1-d', t.cs1_desc);
    set('cb2-t', t.cs2_lbl); set('cb2-d', t.cs2_desc);
    set('cb3-t', t.cs3_lbl); set('cb3-d', t.cs3_desc);
    set('cb4-t', t.cs4_lbl); set('cb4-d', t.cs4_desc);
    set('cb5-t', t.cs5_lbl); set('cb5-d', t.cs5_desc);
  }
   
  if (t.fol_lbl)   set('footer-follow-lbl', t.fol_lbl);
  
  const track = document.querySelector('.attrs-track');
  if (track && t.ticker) {
    const doubled = [...t.ticker, ...t.ticker];
    track.innerHTML = doubled.map(item =>
      `<div class="attr-item"><div class="attr-dot"></div><span class="attr-text">${item.text}</span><span class="attr-value">${item.val}</span></div>`
    ).join('');
  }
  
  if (t.olabel) set('o-label', t.olabel);
  if (t.oh2)   setH('o-h2', t.oh2);
  if (t.op1)   set('o-p1', t.op1);
  if (t.of1)   set('o-f1', t.of1);
  if (t.of2)   set('o-f2', t.of2);
  if (t.of3)   set('o-f3', t.of3);
  if (t.of4)   set('o-f4', t.of4);
  if (t.octa)  set('o-cta', t.octa);

  if (t.hh1tag)   set('hh1-tag',   t.hh1tag);
  if (t.hh1title) setH('hh1-title', t.hh1title);
  if (t.hh1desc)  set('hh1-desc',  t.hh1desc);
  if (t.hh2tag)   set('hh2-tag',   t.hh2tag);
  if (t.hh2title) setH('hh2-title', t.hh2title);
  if (t.hh2desc)  set('hh2-desc',  t.hh2desc);
  if (t.hh3tag)   set('hh3-tag',   t.hh3tag);
  if (t.hh3title) setH('hh3-title', t.hh3title);
  if (t.hh3desc)  set('hh3-desc',  t.hh3desc);

  document.dispatchEvent(new CustomEvent('da-lang', { detail: { lang, t } }));

  // Dynamic Translation Loop for standard elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key]) {
      if (t[key].includes('<') || t[key].includes('&')) {
        el.innerHTML = t[key];
      } else {
        el.textContent = t[key];
      }
    }
  });

  const bs = (id,v) => { const el=_$(id); if(el&&v!==undefined){ if(v.includes('<')) el.innerHTML=v; else el.textContent=v; } };
  bs('btab-all', t.btab_all); bs('btab-grains', t.btab_grains); bs('btab-moulu', t.btab_moulu); bs('btab-sub', t.btab_sub);
  bs('bfilter-lbl', t.bfilter_lbl); bs('bfilter-reset', t.bfilter_reset);
  if(t.bformats_lbl) bs('bformats-lbl', t.bformats_lbl);
  if(t.bformats_h) { const e=_$('bformats-h'); if(e) e.innerHTML=t.bformats_h; }
  if(t.bformats_p) bs('bformats-p', t.bformats_p);
  document.querySelectorAll('.bcmd-btn').forEach(b=>{ if(t.bcmd_btn) b.textContent=t.bcmd_btn; });
  document.querySelectorAll('.bjoin-btn').forEach(b=>{ if(t.bjoin_btn) b.textContent=t.bjoin_btn; });
  const nr=_$('no-results'); if(nr&&t.bno_results){ nr.querySelector('.no-results-txt') && (nr.querySelector('.no-results-txt').textContent=t.bno_results); }
  const nrBtn=_$('no-results-btn'); if(nrBtn&&t.bno_reset) nrBtn.textContent=t.bno_reset;

  const fset = (id,v) => { const e=_$(id); if(e&&v!==undefined){ if(v.includes('<em>')) e.innerHTML=v; else e.textContent=v; } };
  fset('fam-label', t.famLabel);
  fset('fam-title', t.famTitle);
  fset('fam-p1', t.famP1);
  fset('fam-p2', t.famP2);
  fset('fam-quote', t.famQuote);
  fset('fam-cite', t.famCite);

  const dset = (id,v) => { const e=_$(id); if(e&&v) e.textContent=v; };
  dset('nd-cafe', t.ndc); dset('nd-sca1', t.nds1); dset('nd-sca2', t.nds2);
  dset('nd-proc', t.ndp); dset('nd-fam', t.ndf);

  const selMap={
    'f-origin': t.bfilter_ori, 'f-varietal': t.bfilter_var,
    'f-process': t.bfilter_proc, 'f-roast': t.bfilter_roast, 'f-sca': t.bfilter_sca
  };
  Object.entries(selMap).forEach(([id,label])=>{ const s=_$(id); if(s&&label){ const opt=s.querySelector('option[value=""]'); if(opt) opt.textContent=label; } });
}

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

document.addEventListener('DOMContentLoaded', () => {
  injectShell();

  let lang = 'fr';
  try { lang = localStorage.getItem('da_lang') || 'fr'; } catch(e) {}
  setLang(lang);

  const revealObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); revealObs.unobserve(e.target); }
    });
  }, { threshold: 0.09 });
  document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

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

  setTimeout(() => {
    const b = document.getElementById('wa-bubble');
    if (b) {
      b.style.transition = 'opacity .4s';
      b.style.opacity = '0';
      setTimeout(() => { b.style.display = 'none'; }, 420);
    }
  }, 6500);
});
