/* ══ NETPULSE MAIN JS ══ */

/* ── Navbar scroll ── */
const navbar = document.getElementById('navbar');
if(navbar){
  window.addEventListener('scroll',()=>{
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  });
}

/* ── Hamburger ── */
const ham = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
if(ham && navLinks){
  ham.addEventListener('click',()=>{
    navLinks.classList.toggle('open');
    ham.classList.toggle('active');
  });
}

/* ── Reveal on scroll ── */
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){ e.target.classList.add('visible'); }
  });
},{threshold:0.12});
revealEls.forEach(el=>revealObserver.observe(el));

/* ── Animated counters ── */
function animateCount(el){
  const target = parseInt(el.dataset.count,10);
  const dur = 1600;
  const step = 16;
  const inc = target/(dur/step);
  let cur=0;
  const t=setInterval(()=>{
    cur=Math.min(cur+inc,target);
    el.textContent=Math.floor(cur);
    if(cur>=target)clearInterval(t);
  },step);
}
const countObserver = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      animateCount(e.target);
      countObserver.unobserve(e.target);
    }
  });
},{threshold:0.5});
document.querySelectorAll('.stat-num[data-count]').forEach(el=>countObserver.observe(el));

/* ── Toast system ── */
function showToast(msg,type='info',duration=3500){
  let container=document.querySelector('.toast-container');
  if(!container){
    container=document.createElement('div');
    container.className='toast-container';
    document.body.appendChild(container);
  }
  const toast=document.createElement('div');
  const icons={success:'✅',error:'❌',info:'ℹ️',warn:'⚠️'};
  toast.className=`toast ${type}`;
  toast.innerHTML=`<span>${icons[type]||'ℹ️'}</span><span>${msg}</span>`;
  container.appendChild(toast);
  setTimeout(()=>{
    toast.style.animation='toast-out .3s ease forwards';
    setTimeout(()=>toast.remove(),300);
  },duration);
}
window.showToast=showToast;

/* ── Auth helpers ── */
function getUser(){ try{return JSON.parse(localStorage.getItem('np_user'))||null;}catch{return null;} }
function setUser(u){ localStorage.setItem('np_user',JSON.stringify(u)); }
function isLoggedIn(){ return !!getUser(); }
window.getUser=getUser; window.setUser=setUser; window.isLoggedIn=isLoggedIn;

/* ── Update nav for logged-in user ── */
function updateNav(){
  const user=getUser();
  const actions=document.querySelector('.nav-actions');
  if(!actions)return;
  if(user){
    actions.innerHTML=`
      <span style="font-family:var(--font-mono);font-size:.8rem;color:var(--text-muted);padding:0 8px">
        ⚡ ${user.xp||0} XP
      </span>
      <a href="dashboard.html" class="btn-ghost">Dashboard</a>
      <button class="btn-primary" onclick="logout()">Sign Out</button>`;
  }
}
function logout(){
  localStorage.removeItem('np_user');
  window.location.href='../index.html';
}
window.logout=logout;
updateNav();

/* ── Active nav link ── */
const currentPath=window.location.pathname;
document.querySelectorAll('.nav-link').forEach(a=>{
  if(a.href && currentPath.includes(a.getAttribute('href').replace('../','').replace('./',''))){
    a.classList.add('active');
  }
});

/* ── Smooth anchor scroll ── */
document.querySelectorAll('a[href*="#"]').forEach(a=>{
  a.addEventListener('click',e=>{
    const hash=a.getAttribute('href').split('#')[1];
    if(!hash)return;
    const target=document.getElementById(hash);
    if(target){ e.preventDefault(); target.scrollIntoView({behavior:'smooth',block:'start'}); }
  });
});
