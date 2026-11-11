/* Shared components: header, offcanvas, footer, floating WhatsApp, image fallback */
const ROOT = document.body.dataset.root || '';
const PAGE = document.body.dataset.page || '';
const WA_NUMBER = '919655961826';
const waLink = (text) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;

/* Image pool (Unsplash). Any image that fails to load gets a labelled placeholder. */
const U = (id, w = 900) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=70`;
const POOL = ['1508061253366-f7da158b6d46', '1599599810769-bcde5a160d32', '1604908176997-125f25cc6f3d', '1596591606975-97ee5cef3a1e', '1606923829579-0cb981a83e2e'];
const pick = (i, w) => U(POOL[i % POOL.length], w);

const NAV = [
  ['home', 'Home', ROOT + 'index.html'],
  ['about', 'About Us', ROOT + 'assets/pages/about.html'],
  ['products', 'Products', ROOT + 'assets/pages/products.html'],
  ['gallery', 'Gallery', ROOT + 'assets/pages/gallery.html'],
  ['contact', 'Contact Us', ROOT + 'assets/pages/contact.html'],
];
const navLinks = (cls) => NAV.map(([k, l, h]) =>
  `<a href="${h}" class="${cls} ${k === PAGE ? 'is-active' : ''}" ${k === PAGE ? 'aria-current="page"' : ''}>${l}</a>`).join('');
const waGeneral = waLink('Hello Gingee Traveller Agromart, I would like to know more about your nuts and dry fruits.');

function renderHeader() {
  const el = document.getElementById('site-header');
  if (!el) return;
  el.innerHTML = `
  `;

  const oc = document.getElementById('offcanvas'), ov = document.getElementById('overlay'), openBtn = document.getElementById('menu-open');
  const setOpen = (open) => {
    oc.classList.toggle('open', open); ov.classList.toggle('open', open);
    oc.setAttribute('aria-hidden', String(!open)); openBtn.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('no-scroll', open);
    if (open) document.getElementById('menu-close').focus(); else openBtn.focus({ preventScroll: true });
  };
  openBtn.addEventListener('click', () => setOpen(true));
  document.getElementById('menu-close').addEventListener('click', () => setOpen(false));
  ov.addEventListener('click', () => setOpen(false));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && oc.classList.contains('open')) setOpen(false); });
  window.addEventListener('resize', () => { if (window.innerWidth >= 1024 && oc.classList.contains('open')) setOpen(false); });
}


document.addEventListener("DOMContentLoaded", () => {

    const menuOpen = document.getElementById("menuOpen");
    const menuClose = document.getElementById("menuClose");
    const sidebar = document.getElementById("mobileSidebar");
    const overlay = document.getElementById("menuOverlay");

    // Check elements
    if (!menuOpen || !menuClose || !sidebar || !overlay) {
        console.error("Header elements not found!");
        return;
    }

    // OPEN SIDEBAR
    function openMenu() {
        sidebar.classList.add("active");

        overlay.classList.remove("invisible", "opacity-0");
        overlay.classList.add("opacity-100");

        sidebar.removeAttribute("inert");
        sidebar.setAttribute("aria-hidden", "false");

        menuOpen.setAttribute("aria-expanded", "true");

        document.body.style.overflow = "hidden";
    }

    // CLOSE SIDEBAR
    function closeMenu() {
        sidebar.classList.remove("active");

        overlay.classList.remove("opacity-100");
        overlay.classList.add("opacity-0");

        sidebar.setAttribute("aria-hidden", "true");
        sidebar.setAttribute("inert", "");

        menuOpen.setAttribute("aria-expanded", "false");

        document.body.style.overflow = "";

        setTimeout(() => {
            if (!sidebar.classList.contains("active")) {
                overlay.classList.add("invisible");
            }
        }, 350);
    }

    // BUTTON EVENTS
    menuOpen.addEventListener("click", openMenu);
    menuClose.addEventListener("click", closeMenu);
    overlay.addEventListener("click", closeMenu);

    // CLOSE ON NAVIGATION CLICK
    document.querySelectorAll(".sidebar-link").forEach(link => {
        link.addEventListener("click", closeMenu);
    });

    // ESCAPE KEY
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && sidebar.classList.contains("active")) {
            closeMenu();
        }
    });

});


function renderFooter() {
  const el = document.getElementById('site-footer');
  if (!el) return;
  el.innerHTML = `
  <footer class="bg-forest text-white/85">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 py-14 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
      <div>
        <div class="flex items-center gap-3 mb-4"><span class="logo-mark logo-light" aria-hidden="true">G</span><span class="font-serif font-bold text-white text-lg">Gingee Traveller Agromart</span></div>
        <p class="text-sm leading-relaxed">A retail destination for nuts and dry fruits, serving families and individuals with everyday snacking choices.</p>
        <div class="flex gap-3 mt-5">
          <a href="#" class="soc" aria-label="Facebook (placeholder)"><i class="fa-brands fa-facebook-f"></i></a>
          <a href="#" class="soc" aria-label="Instagram (placeholder)"><i class="fa-brands fa-instagram"></i></a>
          <a href="#" class="soc" aria-label="YouTube (placeholder)"><i class="fa-brands fa-youtube"></i></a>
        </div>
      </div>
      <div><h2 class="foot-h">Quick links</h2><nav class="flex flex-col gap-2 text-sm" aria-label="Footer navigation">${NAV.map(([, l, h]) => `<a class="hover:text-gold" href="${h}">${l}</a>`).join('')}</nav></div>
      <div><h2 class="foot-h">Contact</h2>
        <ul class="text-sm space-y-3">
          <li><i class="fa-solid fa-phone w-5 text-gold"></i> <a class="hover:text-gold" href="tel:+919655961826">9655961826</a></li>
          <li><i class="fa-brands fa-whatsapp w-5 text-gold"></i> <a class="hover:text-gold" href="https://wa.me/919655961826" target="_blank" rel="noopener">9655961826 (WhatsApp)</a></li>
          <li class="break-all"><i class="fa-solid fa-envelope w-5 text-gold"></i> <a class="hover:text-gold" href="mailto:gingeepasangashorts@gmail.com">gingeepasangashorts@gmail.com</a></li>
        </ul></div>
      <div><h2 class="foot-h">Visit us</h2>
        <address class="not-italic text-sm leading-relaxed">Gingee Traveller Agromart,<br>Karnika Complex, Thindivanam Road,<br>Gingee Block, Villupuram – 604202,<br>Tamil Nadu, India.</address></div>
    </div>
    <div class="border-t border-white/10 py-5 text-center text-xs text-white/60">© <span id="year"></span> Gingee Traveller Agromart. All rights reserved.</div>
  </footer>
  <a href="${waGeneral}" target="_blank" rel="noopener" class="wa-float" aria-label="Chat with Gingee Traveller Agromart on WhatsApp"><i class="fa-brands fa-whatsapp"></i></a>`;
  document.getElementById('year').textContent = new Date().getFullYear();
}

function hydrateImages() {
  document.querySelectorAll('img[data-img]').forEach((img) => {
    img.src = pick(Number(img.dataset.img), Number(img.dataset.w) || 900);
  });
}
document.addEventListener('error', (e) => {
  const img = e.target;
  if (img.tagName !== 'IMG' || img.dataset.failed) return;
  img.dataset.failed = '1';
  const label = (img.alt || 'Nuts and dry fruits').replace(/[<>&"]/g, '').slice(0, 40);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600"><rect width="100%" height="100%" fill="#F1E6CC"/><circle cx="400" cy="260" r="70" fill="#D9A441" opacity=".5"/><text x="50%" y="410" font-family="Georgia,serif" font-size="30" fill="#244D35" text-anchor="middle">${label}</text></svg>`;
  img.src = 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
}, true);

renderHeader(); renderFooter(); hydrateImages();
