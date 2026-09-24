const data = {
  energized: {emoji:'⚡', name:'Mango-Pineapple Guava Blast', desc:'A bright citrus-forward smoothie with pineapple guava — matched to keep your energy up.'},
  chill: {emoji:'🌙', name:'Lavender Berry Cloudberry Calm', desc:'Soft berry tones and cloudberry — a gentle, unwinding blend for slowing down.'},
  stressed: {emoji:'😮‍💨', name:'Avocado Greens Reset', desc:'Avocado, banana and leafy greens — grounding, creamy, and low in sugar.'},
  adventurous: {emoji:'🌍', name:'Dragon Fruit & Açaí Explorer', desc:'Our most exotic bowl-style blend — for the rare-fruit curious.'}
};
const btns = document.querySelectorAll('.mood-btn');
const result = document.getElementById('moodResult');
btns.forEach(b=>b.addEventListener('click', ()=>{
  btns.forEach(x=>x.classList.remove('active'));
  b.classList.add('active');
  const d = data[b.dataset.m];
  result.innerHTML = `<div class="mood-emoji">${d.emoji}</div><div><h4>${d.name}</h4><p>${d.desc}</p></div>`;
}));

const menu = {
  juices: [
    {n:'Classic Orange Zing', p:'Rs. 250', d:'Fresh-pressed orange, no added sugar.'},
    {n:'Watermelon Mint Cooler', p:'Rs. 280', d:'Watermelon, lime and mint, chilled.'},
    {n:'Green Detox', p:'Rs. 320', d:'Kale, apple, ginger and cucumber.'},
    {n:'Dragon Fruit Splash', p:'Rs. 400', d:'Exotic dragon fruit with a citrus lift.'}
  ],
  smoothies: [
    {n:'Berry Boost Smoothie', p:'Rs. 380', d:'Strawberry, blueberry, yogurt.'},
    {n:'Mango Tango', p:'Rs. 400', d:'Mango, banana, orange blend.'},
    {n:'Avocado Cream', p:'Rs. 450', d:'Avocado, banana, honey, plant milk.'},
    {n:'Peanut Butter Power (Protein)', p:'Rs. 500', d:'Banana, oats, protein, peanut butter.'},
    {n:'Classic Vanilla Bean Shake', p:'Rs. 420', d:'Vanilla milkshake, whipped top.'},
    {n:'Salak Caramel Shake', p:'Rs. 550', d:'Rare salak fruit with caramel swirl.'}
  ],
  bowls: [
    {n:'Açaí Sunrise Bowl', p:'Rs. 600', d:'Açaí base, granola, fresh berries.'},
    {n:'Pineapple Guava Bowl', p:'Rs. 550', d:'Pineapple guava, coconut, seeds.'},
    {n:'Jackfruit Crunch Bowl', p:'Rs. 650', d:'Jackfruit, banana, toasted granola.'},
    {n:'Cloudberry Bowl', p:'Rs. 750', d:'Imported cloudberries, yogurt, honey.'}
  ],
  more: [
    {n:'Passionfruit Mojito (Mocktail)', p:'Rs. 380', d:'Passionfruit, lime, soda, mint.'},
    {n:'Berry Spritz Mocktail', p:'Rs. 360', d:'Mixed berry, soda, a citrus twist.'},
    {n:'Mixed Berry Yogurt Parfait', p:'Rs. 340', d:'Layered flavored yogurt and berries.'},
    {n:'Mango Yogurt Cup', p:'Rs. 320', d:'Flavored yogurt with fresh mango.'}
  ]
};
const grid = document.getElementById('itemGrid');
const tabs = document.querySelectorAll('.tab-btn');
function renderMenu(cat){
  grid.innerHTML = menu[cat].map(i=>`<div class="item-card"><div><h4>${i.n}</h4><p>${i.d}</p></div><span class="item-price">${i.p}</span></div>`).join('');
}
tabs.forEach(t=>t.addEventListener('click',()=>{
  tabs.forEach(x=>x.classList.remove('active'));
  t.classList.add('active');
  renderMenu(t.dataset.cat);
}));
renderMenu('juices');
