const images = {
  kora: 'https://arclinea.com/dw/image/v2/BFXX_PRD/on/demandware.static/-/Library-Sites-Arclinea-contentlib/default/dw4797c032/HOMEPAGE/Arclinea%20kitchen%20Kora%20luxury%20interior%20with%20marble%20island%20and%20panoramic%20windows_D.jpeg?bgcolor=FFFFFF&sw=1920',
  italia: 'https://arclinea.com/dw/image/v2/BFXX_PRD/on/demandware.static/-/Library-Sites-Arclinea-contentlib/default/dw41f84ba2/5_COLLECTION/PDP%20ITALIA%20DUBLE%20ISLAND/Italia%20kitchen%20double%20island%20Arclinea%20handle%20D.jpeg?bgcolor=FFFFFF&sw=1600',
  wood: 'https://img.edilportale.com/csmartnews/img/855974_01.jpg',
  proxima: 'https://luminaire.com/cdn/shop/files/Proxima-Kitchen-Antonio-Citterio-Arclinea-4-01.jpg?v=1768586747',
  artusi: 'https://mats01s1.blob.core.windows.net/cache/6/e/a/e/9/c/6eae9c9c988a29b5b24cfc02580c9e5e6d44bf36.jpeg',
  space: 'https://www.cuinespalafrugell.cat/images/contenidos/1-1.jpeg',
  storage: 'https://arclinea.com/on/demandware.static/-/Library-Sites-Arclinea-contentlib/default/dw40cd6d49/9_EXCLUSIVE%20ELEMENTS/DIVISION%20SYSTEM/NEW%20POKCET%20SYSTEM/EE_Division_system_new_pocket_system_15.jpeg',
  island: 'https://static-land.edilportale.com/787691/uploads/M_1920w_21_787690.jpg'
};
const items = [
  {name:'THEA, BORGOGNA FRAME',image:images.artusi},
  {name:'KORA',image:images.kora},
  {name:'LIGNUM ET LAPIS',image:images.wood},
  {name:'CONVIVIUM',image:images.space},
  {name:'PROXIMA',image:images.proxima},
  {name:'ITALIA',image:images.italia},
  {name:'PRINCIPIA',image:images.storage},
  {name:'BETA',image:images.island},
  {name:'THEA',image:images.artusi}
];
const track=document.getElementById('collectionTrack');
track.innerHTML=items.map((item,i)=>`<article class="collection-card"><a href="#showroom" aria-label="Explore ${item.name}"><div class="card-image"><img loading="lazy" src="${item.image}" alt="${item.name} kitchen collection"></div><div class="collection-caption"><h3>${item.name}</h3><span>↗</span></div></a></article>`).join('');
let index=0;
function visibleCount(){return window.innerWidth<=600?1:window.innerWidth<=900?2:4}
function updateCarousel(){const card=track.querySelector('.collection-card');if(!card)return;const gap=20;const count=visibleCount();index=Math.max(0,Math.min(index,items.length-count));track.style.transform=`translateX(-${index*(card.getBoundingClientRect().width+gap)}px)`;document.getElementById('slideCounter').textContent=`${String(index+1).padStart(2,'0')} — ${String(Math.min(items.length,index+count)).padStart(2,'0')} / 09`}
function next(){index++;updateCarousel()}
function prev(){index--;updateCarousel()}
['nextSlide','mobileNext'].forEach(id=>document.getElementById(id).addEventListener('click',next));
['prevSlide','mobilePrev'].forEach(id=>document.getElementById(id).addEventListener('click',prev));
window.addEventListener('resize',updateCarousel);updateCarousel();
const menu=document.getElementById('menuPanel'), search=document.getElementById('searchPanel');
function setOpen(el,on){el.classList.toggle('open',on);el.setAttribute('aria-hidden',String(!on));document.body.style.overflow=(menu.classList.contains('open')||search.classList.contains('open'))?'hidden':''}
document.getElementById('menuToggle').addEventListener('click',()=>{setOpen(search,false);setOpen(menu,true);document.getElementById('menuToggle').setAttribute('aria-expanded','true')});
document.getElementById('menuClose').addEventListener('click',()=>{setOpen(menu,false);document.getElementById('menuToggle').setAttribute('aria-expanded','false')});
menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{setOpen(menu,false);document.getElementById('menuToggle').setAttribute('aria-expanded','false')}));
document.getElementById('searchToggle').addEventListener('click',()=>{setOpen(menu,false);setOpen(search,true);document.getElementById('siteSearch').focus()});
document.getElementById('searchClose').addEventListener('click',()=>setOpen(search,false));
document.addEventListener('keydown',e=>{if(e.key==='Escape'){setOpen(menu,false);setOpen(search,false)}});
const header=document.getElementById('siteHeader');function scrollHeader(){header.classList.toggle('scrolled',window.scrollY>70)}window.addEventListener('scroll',scrollHeader,{passive:true});scrollHeader();
document.getElementById('siteSearch').addEventListener('input',e=>{const q=e.target.value.toLowerCase().trim(),results=document.getElementById('searchResults');if(!q){results.innerHTML='';return}const matches=items.filter(x=>x.name.toLowerCase().includes(q));results.innerHTML=matches.length?matches.map(x=>`<a href="#collection">${x.name} ↗</a>`).join(''):'<p>No matching collections found.</p>';results.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>setOpen(search,false)))});
document.getElementById('newsletterForm').addEventListener('submit',e=>{e.preventDefault();document.getElementById('formMessage').textContent='Thanks for your interest! This is a front-end demo; connect an email service to enable subscriptions.';e.target.reset()});
document.getElementById('languageButton').addEventListener('click',()=>alert('This demo currently supports English only.'));


// Smooth, accessible scrolling effects. No libraries required.
(() => {
  const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
  const progress=document.getElementById('scrollProgress');
  const targets=document.querySelectorAll('.intro-grid, .section-header, .collection-card, .statement-content, .elements-intro, .element-card, .showroom-copy, .journal-grid article, .newsletter h2, .newsletter form, .footer-main');
  if ('IntersectionObserver' in window && !reducedMotion.matches) {
    document.documentElement.classList.add('js-scroll');
    targets.forEach((el,i)=>{
      el.classList.add('scroll-reveal');
      el.style.setProperty('--reveal-delay',`${(i%4)*85}ms`);
    });
    document.querySelectorAll('.element-card, .journal-grid article').forEach(el=>el.classList.add('image-reveal'));
    const observer=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}
      });
    },{threshold:0.12,rootMargin:'0px 0px -35px 0px'});
    targets.forEach(el=>observer.observe(el));
  }
  const hero=document.querySelector('.hero');
  const heroImage=document.querySelector('.hero-background');
  const statement=document.querySelector('.statement');
  const statementImage=document.querySelector('.statement-image');
  let queued=false;
  function paint(){
    const max=document.documentElement.scrollHeight-innerHeight;
    progress.style.transform=`scaleX(${max>0?Math.min(1,scrollY/max):0})`;
    if(!reducedMotion.matches){
      if(hero.getBoundingClientRect().bottom>0){
        const amount=Math.min(scrollY,hero.offsetHeight);
        heroImage.style.transform=`translate3d(0,${amount*.23}px,0) scale(1.07)`;
      }
      const r=statement.getBoundingClientRect();
      if(r.bottom>0&&r.top<innerHeight){
        const offset=(innerHeight/2-(r.top+r.height/2))*.13;
        statementImage.style.transform=`translate3d(0,${offset}px,0) scale(1.12)`;
      }
    }else{heroImage.style.transform='';statementImage.style.transform=''}
    queued=false;
  }
  function requestPaint(){if(!queued){queued=true;requestAnimationFrame(paint)}}
  window.addEventListener('scroll',requestPaint,{passive:true});
  window.addEventListener('resize',requestPaint,{passive:true});
  reducedMotion.addEventListener?.('change',requestPaint);
  requestPaint();
})();
