const PRODUCTS = [
  { name: 'Almonds', cat: 'Nuts', img: 0, desc: 'Crunchy everyday almonds for snacking and sweets.' },
  { name: 'Cashews', cat: 'Nuts', img: 1, desc: 'Smooth, buttery cashews for snacks and cooking.' },
  { name: 'Pistachios', cat: 'Nuts', img: 2, desc: 'Lightly flavourful pistachios, ready to enjoy.' },
  { name: 'Walnuts', cat: 'Nuts', img: 3, desc: 'Walnut kernels for breakfast bowls and baking.' },
  { name: 'Raisins', cat: 'Dried Fruits', img: 4, desc: 'Sweet raisins for desserts, kheer and snacking.' },
  { name: 'Dates', cat: 'Dried Fruits', img: 0, desc: 'Soft dates, a classic sweet bite for the whole family.' },
  { name: 'Dried Figs', cat: 'Dried Fruits', img: 1, desc: 'Chewy dried figs with a naturally sweet taste.' },
  { name: 'Apricots', cat: 'Dried Fruits', img: 2, desc: 'Tangy-sweet dried apricots for lunchboxes.' },
  { name: 'Pumpkin Seeds', cat: 'Seeds', img: 3, desc: 'Crisp seeds to sprinkle on salads or snack on.' },
  { name: 'Mixed Dry Fruits', cat: 'Mixes', img: 4, desc: 'A mixed assortment, ideal for sharing and gifting.' },
];
const WEIGHTS = ['100g', '250g', '500g', '1kg'];
const grid = document.getElementById('product-grid');
const search = document.getElementById('search');
const filters = document.getElementById('filters');
const empty = document.getElementById('empty');
const cats = ['All', ...new Set(PRODUCTS.map((p) => p.cat))];
let activeCat = 'All';
const q = new URLSearchParams(location.search).get('q');
if (q) search.value = q;

filters.innerHTML = cats.map((c) => `<button type="button" class="chip ${c === 'All' ? 'is-on' : ''}" data-cat="${c}" aria-pressed="${c === 'All'}">${c}</button>`).join('');

function render() {
  const term = search.value.trim().toLowerCase();
  const list = PRODUCTS.filter((p) => (activeCat === 'All' || p.cat === activeCat) && (!term || (p.name + ' ' + p.desc + ' ' + p.cat).toLowerCase().includes(term)));
  grid.innerHTML = list.map((p) => `
    <article class="card" data-name="${p.name}">
      <div class="card-img"><img src="${pick(p.img, 600)}" alt="${p.name}" width="600" height="450" loading="lazy"></div>
      <div class="p-5 flex flex-col gap-3 flex-1">
        <div><span class="text-xs text-muted">${p.cat}</span><h3 class="font-serif text-xl font-bold text-forest">${p.name}</h3></div>
        <p class="text-sm text-muted">${p.desc}</p>
        <div class="flex flex-wrap gap-2" role="radiogroup" aria-label="Weight for ${p.name}">
          ${WEIGHTS.map((w, i) => `<button type="button" class="chip chip-sm ${i === 1 ? 'is-on' : ''}" data-w="${w}" role="radio" aria-checked="${i === 1}">${w}</button>`).join('')}
        </div>
        <p class="text-sm font-medium text-ink">Contact for Price</p>
        <button type="button" class="btn btn-green justify-center mt-auto" data-enquire><i class="fa-brands fa-whatsapp"></i> WhatsApp Enquiry</button>
      </div>
    </article>`).join('');
  empty.classList.toggle('hidden', list.length > 0);
}
filters.addEventListener('click', (e) => {
  const b = e.target.closest('[data-cat]'); if (!b) return;
  activeCat = b.dataset.cat;
  filters.querySelectorAll('.chip').forEach((c) => { const on = c === b; c.classList.toggle('is-on', on); c.setAttribute('aria-pressed', on); });
  render();
});
search.addEventListener('input', render);
grid.addEventListener('click', (e) => {
  const card = e.target.closest('.card'); if (!card) return;
  const wBtn = e.target.closest('[data-w]');
  if (wBtn) { card.querySelectorAll('[data-w]').forEach((c) => { const on = c === wBtn; c.classList.toggle('is-on', on); c.setAttribute('aria-checked', on); }); return; }
  if (e.target.closest('[data-enquire]')) {
    const w = card.querySelector('[data-w].is-on').dataset.w;
    const msg = `Hello, I am interested in ${card.dataset.name} (${w}). Please share the available weights and prices.`;
    window.open(waLink(msg), '_blank', 'noopener');
  }
});
render();
