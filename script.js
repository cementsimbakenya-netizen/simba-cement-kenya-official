const WHATSAPP='254780079982';
const products=[
 {id:1,name:'Simba Cement 32.5R',price:720,description:'Reliable general-purpose cement for everyday construction.'},
 {id:2,name:'Simba Cement 42.5N',price:850,description:'High-strength cement for demanding structural work.'},
 {id:3,name:'Simba Cement 42.5R',price:880,description:'Fast-strength development for professional projects.'},
 {id:4,name:'Bulk Cement Supply',price:0,description:'For larger orders and project supply. Request a quotation.'},
 {id:5,name:'Building Materials',price:0,description:'Ask our team about available construction materials.'},
 {id:6,name:'Project Supply',price:0,description:'Talk to us for contractor and project requirements.'}
];
let cart=JSON.parse(localStorage.getItem('simbaCementOfficialCart')||'[]');
const money=n=>n?'KES '+n.toLocaleString():'Quote';
function renderProducts(){document.getElementById('productGrid').innerHTML=products.map(p=>`<article class="product"><div class="product-image"><div class="bag">SIMBA<br>CEMENT</div></div><h3>${p.name}</h3><p>${p.description}</p><div class="price">${money(p.price)}</div><button class="add" onclick="addToCart(${p.id})">${p.price?'Add to Cart':'Request Quote'}</button></article>`).join('')}
function save(){localStorage.setItem('simbaCementOfficialCart',JSON.stringify(cart));renderCart();}
function addToCart(id){const p=products.find(x=>x.id===id);if(!p.price){window.open('https://wa.me/'+WHATSAPP+'?text='+encodeURIComponent('Hello Simba Cement Kenya, I would like a quotation for '+p.name+'.'),'_blank');return}const item=cart.find(x=>x.id===id);item?item.qty++:cart.push({id,qty:1});save();openCart()}
function changeQty(id,delta){const x=cart.find(i=>i.id===id);if(!x)return;x.qty+=delta;if(x.qty<1)cart=cart.filter(i=>i.id!==id);save()}
function removeItem(id){cart=cart.filter(i=>i.id!==id);save()}
function renderCart(){const count=cart.reduce((a,x)=>a+x.qty,0);document.getElementById('cartCount').textContent=count;const box=document.getElementById('cartItems');if(!cart.length){box.innerHTML='<p style="color:#777;padding:30px 0">Your cart is empty. Add products to begin.</p>';document.getElementById('cartTotal').textContent='KES 0';return}let total=0;box.innerHTML=cart.map(x=>{const p=products.find(q=>q.id===x.id),sub=p.price*x.qty;total+=sub;return `<div class="cart-item"><div><h4>${p.name}</h4><div>${money(p.price)} each</div><div class="qty"><button onclick="changeQty(${p.id},-1)">−</button><b>${x.qty}</b><button onclick="changeQty(${p.id},1)">+</button></div></div><div><strong>${money(sub)}</strong><br><button class="remove" onclick="removeItem(${p.id})">Remove</button></div></div>`}).join('');document.getElementById('cartTotal').textContent=money(total)}
function openCart(){document.getElementById('cartPanel').classList.add('open');document.getElementById('cartPanel').setAttribute('aria-hidden','false');renderCart()}
function closeCart(){document.getElementById('cartPanel').classList.remove('open');document.getElementById('cartPanel').setAttribute('aria-hidden','true')}
function checkout(e){e.preventDefault();if(!cart.length){alert('Please add at least one product to your cart.');return}const name=document.getElementById('customerName').value.trim(),phone=document.getElementById('customerPhone').value.trim(),location=document.getElementById('deliveryLocation').value.trim(),notes=document.getElementById('orderNotes').value.trim();let total=0;const lines=cart.map(x=>{const p=products.find(q=>q.id===x.id),sub=p.price*x.qty;total+=sub;return `• ${p.name} — ${x.qty} × ${money(p.price)} = ${money(sub)}`});const ref='SC-'+Date.now().toString().slice(-7);const msg=`Hello Simba Cement Kenya!%0A%0A*NEW ORDER ${ref}*%0A${lines.join('%0A')}%0A%0A*TOTAL: ${money(total)}*%0A%0A*Customer details*%0AName: ${encodeURIComponent(name)}%0APhone: ${encodeURIComponent(phone)}%0ADelivery location: ${encodeURIComponent(location)}%0ANotes: ${encodeURIComponent(notes||'None')}%0A%0APlease confirm availability and delivery.`;window.open(`https://wa.me/${WHATSAPP}?text=${msg}`,'_blank');}

// Fast hero loading: load only the first slide immediately, then warm the next slides in the background.
let heroSlideIndex=0;
let heroTimer;
const heroLoaded=new Set();
function loadHeroImage(index){
  const slides=document.querySelectorAll('.hero-slide');
  if(!slides[index] || heroLoaded.has(index))return;
  const url=slides[index].dataset.bg;
  if(!url)return;
  const img=new Image();
  img.decoding='async';
  img.onload=()=>{slides[index].style.backgroundImage=`url("${url}")`;heroLoaded.add(index)};
  img.src=url;
}
function preloadHeroNeighbors(index){
  loadHeroImage((index+1)%3);
  loadHeroImage((index+2)%3);
}
function showHeroSlide(index){
  const slides=document.querySelectorAll('.hero-slide');
  const dots=document.querySelectorAll('.hero-dot');
  if(!slides.length)return;
  heroSlideIndex=(index+slides.length)%slides.length;
  loadHeroImage(heroSlideIndex);
  slides.forEach((s,i)=>s.classList.toggle('active',i===heroSlideIndex));
  dots.forEach((d,i)=>d.classList.toggle('active',i===heroSlideIndex));
  window.setTimeout(()=>preloadHeroNeighbors(heroSlideIndex),150);
}
function goHeroSlide(index){showHeroSlide(index);restartHeroTimer()}
function changeHeroSlide(delta){showHeroSlide(heroSlideIndex+delta);restartHeroTimer()}
function restartHeroTimer(){clearInterval(heroTimer);heroTimer=setInterval(()=>showHeroSlide(heroSlideIndex+1),6000)}

renderProducts();
renderCart();
loadHeroImage(0);
showHeroSlide(0);
restartHeroTimer();
window.addEventListener('load',()=>window.setTimeout(()=>preloadHeroNeighbors(heroSlideIndex),500),{once:true});