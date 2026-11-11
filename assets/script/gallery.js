const ITEMS = [
  ['Mixed nuts in a wooden bowl', 0, 'Nuts and dry fruits'], ['Almond close-up', 1, 'Close-ups'], ['Cashew arrangement', 2, 'Arrangements'],
  ['Pistachios on a plate', 3, 'Close-ups'], ['Dates and figs platter', 4, 'Arrangements'], ['Festive gift pack inspiration', 0, 'Gift packs'],
  ['Walnut kernels', 1, 'Close-ups'], ['Packed nuts in jars (inspiration)', 2, 'Packaging'], ['Raisins in a scoop', 3, 'Close-ups'],
  ['Premium gift hamper (inspiration)', 4, 'Gift packs'], ['Store shelf placeholder', 0, 'Store'], ['Store counter placeholder', 1, 'Store'],
];
const g = document.getElementById('gallery');
g.innerHTML = ITEMS.map(([alt, i, cap], n) => `
  <figure class="gal ${n % 5 === 0 ? 'gal-tall' : ''}">
    <button type="button" data-i="${n}" aria-label="Open image: ${alt}"><img src="${pick(i, 700)}" alt="${alt}" loading="lazy"></button>
    <figcaption>${cap}</figcaption>
  </figure>`).join('');

const lb = document.getElementById('lightbox'), lbImg = document.getElementById('lb-img'), lbCap = document.getElementById('lb-cap');
let cur = 0, lastFocus = null;
function show(n) {
  cur = (n + ITEMS.length) % ITEMS.length;
  delete lbImg.dataset.failed; lbImg.alt = ITEMS[cur][0]; lbImg.src = pick(ITEMS[cur][1], 1400);
  lbCap.textContent = `${ITEMS[cur][0]} (${cur + 1}/${ITEMS.length})`;
}
function openLb(n) { lastFocus = document.activeElement; show(n); lb.classList.add('open'); lb.setAttribute('aria-hidden', 'false'); document.body.classList.add('no-scroll'); document.getElementById('lb-close').focus(); }
function closeLb() { lb.classList.remove('open'); lb.setAttribute('aria-hidden', 'true'); document.body.classList.remove('no-scroll'); if (lastFocus) lastFocus.focus(); }
g.addEventListener('click', (e) => { const b = e.target.closest('[data-i]'); if (b) openLb(Number(b.dataset.i)); });
document.getElementById('lb-close').addEventListener('click', closeLb);
document.getElementById('lb-prev').addEventListener('click', () => show(cur - 1));
document.getElementById('lb-next').addEventListener('click', () => show(cur + 1));
lb.addEventListener('click', (e) => { if (e.target === lb) closeLb(); });
document.addEventListener('keydown', (e) => {
  if (!lb.classList.contains('open')) return;
  if (e.key === 'Escape') closeLb(); else if (e.key === 'ArrowLeft') show(cur - 1); else if (e.key === 'ArrowRight') show(cur + 1);
});
