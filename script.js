const questions = [
  {key:'mood', title:"How's your mood today?", options:[
    {v:'energized', l:'⚡ Energized'}, {v:'chill', l:'🌙 Need to unwind'},
    {v:'stressed', l:'😮\u200d💨 Stressed'}, {v:'adventurous', l:'🌍 Adventurous'}
  ]},
  {key:'flavor', title:'What vibe are you craving?', options:[
    {v:'sweet', l:'🍯 Sweet & fruity'}, {v:'tangy', l:'🍋 Tangy & citrusy'},
    {v:'tropical', l:'🌴 Tropical & exotic'}, {v:'light', l:'🌿 Light & refreshing'}
  ]},
  {key:'fruit', title:'Pick a favorite fruit family', options:[
    {v:'berries', l:'🍓 Berries'}, {v:'tropical', l:'🥭 Tropical fruits'},
    {v:'citrus', l:'🍊 Citrus'}, {v:'greens', l:'🥬 Greens & veg'}
  ]},
  {key:'allergy', title:'Any allergies we should avoid?', options:[
    {v:'none', l:'✅ None'}, {v:'berries', l:'🍓 Berries'},
    {v:'dairy', l:'🥛 Dairy / milk'}, {v:'nuts', l:'🥜 Nuts'}
  ]}
];
const drinks = [
  {name:'Mango-Pineapple Guava Blast', emoji:'🥭', desc:'Bright citrus-forward smoothie with pineapple guava.', mood:['energized','adventurous'], flavor:['sweet','tropical'], fruit:['tropical'], allergens:[]},
  {name:'Berry Boost Smoothie', emoji:'🍓', desc:'Strawberry, blueberry and yogurt.', mood:['energized','chill'], flavor:['sweet'], fruit:['berries'], allergens:['dairy','berries']},
  {name:'Avocado Greens Reset', emoji:'🥑', desc:'Avocado, banana and leafy greens — grounding and light.', mood:['stressed','chill'], flavor:['light'], fruit:['greens'], allergens:[]},
  {name:'Dragon Fruit & Açaí Bowl', emoji:'🐉', desc:'Our most exotic bowl — dragon fruit, açaí, granola.', mood:['adventurous'], flavor:['tropical','tangy'], fruit:['tropical','berries'], allergens:['berries']},
  {name:'Watermelon Mint Cooler', emoji:'🍉', desc:'Watermelon, lime and mint, chilled.', mood:['chill','stressed'], flavor:['light','tangy'], fruit:['citrus'], allergens:[]},
  {name:'Classic Vanilla Bean Shake', emoji:'🥛', desc:'Creamy vanilla milkshake.', mood:['chill'], flavor:['sweet'], fruit:[], allergens:['dairy']},
  {name:'Salak Caramel Shake', emoji:'🍮', desc:'Rare salak fruit with a caramel swirl.', mood:['adventurous'], flavor:['sweet','tropical'], fruit:['tropical'], allergens:['dairy']},
  {name:'Green Detox Juice', emoji:'🥬', desc:'Kale, apple, ginger and cucumber.', mood:['stressed'], flavor:['light','tangy'], fruit:['greens'], allergens:[]},
  {name:'Peanut Butter Power', emoji:'🥜', desc:'Banana, oats, protein and peanut butter.', mood:['energized'], flavor:['sweet'], fruit:[], allergens:['nuts','dairy']},
  {name:'Passionfruit Mojito Mocktail', emoji:'🍹', desc:'Passionfruit, lime, soda and mint.', mood:['adventurous','chill'], flavor:['tangy','tropical'], fruit:['tropical'], allergens:[]}
];
let qStep = 0, qAnswers = {};
const progressEl = document.getElementById('quizProgress');
const stepEl = document.getElementById('quizStep');

function renderProgress(){
  progressEl.innerHTML = questions.map((_,i)=>{
    const cls = i===qStep ? 'active' : (i<qStep ? 'done' : '');
    return `<div class="quiz-dot ${cls}"></div>`;
  }).join('');
}
function renderQuestion(){
  renderProgress();
  const q = questions[qStep];
  const isLast = qStep === questions.length - 1;
  stepEl.innerHTML = `
    <div class="quiz-q">
      <h4>${q.title}</h4>
      <div class="quiz-options">
        ${q.options.map(o=>`<button class="quiz-opt${qAnswers[q.key]===o.v?' selected':''}" data-v="${o.v}">${o.l}</button>`).join('')}
      </div>
    </div>
    <div class="quiz-nav">
      <button class="btn btn-ghost" id="qBack" ${qStep===0?'disabled':''}>Back</button>
      <button class="btn btn-primary" id="qNext" ${qAnswers[q.key]?'':'disabled'}>${isLast?'See my blend':'Next'}</button>
    </div>`;
  stepEl.querySelectorAll('.quiz-opt').forEach(btn=>btn.addEventListener('click',()=>{
    qAnswers[q.key] = btn.dataset.v;
    renderQuestion();
  }));
  document.getElementById('qBack').addEventListener('click', ()=>{ qStep--; renderQuestion(); });
  document.getElementById('qNext').addEventListener('click', ()=>{
    if(isLast){ renderResult(); } else { qStep++; renderQuestion(); }
  });
}
function renderResult(){
  let best = null, bestScore = -1;
  drinks.forEach(d=>{
    if(qAnswers.allergy !== 'none' && d.allergens.includes(qAnswers.allergy)) return;
    let score = 0;
    if(d.mood.includes(qAnswers.mood)) score += 2;
    if(d.flavor.includes(qAnswers.flavor)) score += 2;
    if(d.fruit.includes(qAnswers.fruit)) score += 1;
    if(score > bestScore){ bestScore = score; best = d; }
  });
  if(!best) best = drinks.find(d=>d.allergens.length===0) || drinks[0];
  progressEl.innerHTML = questions.map(()=>'<div class="quiz-dot done"></div>').join('');
  stepEl.innerHTML = `
    <div class="quiz-result">
      <div class="mood-emoji">${best.emoji}</div>
      <div><h4>${best.name}</h4><p>${best.desc}</p></div>
    </div>
    <button class="btn btn-ghost quiz-retake" id="qRetake">Retake quiz</button>`;
  document.getElementById('qRetake').addEventListener('click', ()=>{
    qStep = 0; qAnswers = {}; renderQuestion();
  });
}
renderQuestion();

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
