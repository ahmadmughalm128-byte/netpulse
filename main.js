cat > /home/claude/netpulse/js/main.js << 'EOF'
/* ══ NETPULSE MAIN JS v2 ══ */
'use strict';

/* ── Navbar scroll ── */
(function(){
  const nb=document.getElementById('navbar');
  if(nb) window.addEventListener('scroll',()=>nb.classList.toggle('scrolled',window.scrollY>40),{passive:true});
})();

/* ── Hamburger ── */
(function(){
  const ham=document.getElementById('hamburger');
  const nl=document.getElementById('navLinks');
  if(!ham||!nl)return;
  ham.addEventListener('click',()=>{nl.classList.toggle('open');ham.classList.toggle('active');});
  document.addEventListener('click',e=>{if(!ham.contains(e.target)&&!nl.contains(e.target)){nl.classList.remove('open');ham.classList.remove('active');}});
})();

/* ── Reveal on scroll ── */
const _revObs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible');});
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>_revObs.observe(el));

/* ── Count-up ── */
function animateCount(el){
  const target=parseInt(el.dataset.count,10);const dur=1600;const step=16;
  const inc=target/(dur/step);let cur=0;
  const t=setInterval(()=>{cur=Math.min(cur+inc,target);el.textContent=Math.floor(cur);if(cur>=target)clearInterval(t);},step);
}
const _cntObs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting){animateCount(e.target);_cntObs.unobserve(e.target);}});
},{threshold:.5});
document.querySelectorAll('.stat-num[data-count]').forEach(el=>_cntObs.observe(el));

/* ── Toast ── */
function showToast(msg,type='info',dur=3500){
  let c=document.querySelector('.toast-container');
  if(!c){c=document.createElement('div');c.className='toast-container';document.body.appendChild(c);}
  const icons={success:'✅',error:'❌',info:'ℹ️',warn:'⚠️'};
  const t=document.createElement('div');
  t.className=`toast ${type}`;
  t.innerHTML=`<span>${icons[type]||'ℹ️'}</span><span>${msg}</span>`;
  c.appendChild(t);
  setTimeout(()=>{t.style.animation='toast-out .3s ease forwards';setTimeout(()=>t.remove(),300);},dur);
}
window.showToast=showToast;

/* ── Auth helpers ── */
function getUser(){try{return JSON.parse(localStorage.getItem('np_user'))||null;}catch{return null;}}
function setUser(u){localStorage.setItem('np_user',JSON.stringify(u));}
function isLoggedIn(){return!!getUser();}
window.getUser=getUser;window.setUser=setUser;window.isLoggedIn=isLoggedIn;

/* ── Update nav for logged-in state ── */
function updateNav(){
  const user=getUser();
  const actions=document.getElementById('navActions');
  if(!actions)return;
  if(user){
    // detect if we're in /pages/ subfolder
    const inPages=window.location.pathname.includes('/pages/');
    const dash=inPages?'dashboard.html':'pages/dashboard.html';
    actions.innerHTML=`
      <span style="font-family:var(--font-mono);font-size:.8rem;color:var(--text-muted);padding:0 8px">⚡${user.xp||0} XP</span>
      <a href="${dash}" class="btn-ghost">Dashboard</a>
      <button class="btn-primary" onclick="doLogout()">Sign Out</button>
      <button class="hamburger" id="hamburger" aria-label="Menu"><span></span><span></span><span></span></button>`;
    // re-bind hamburger after replacing innerHTML
    const ham2=document.getElementById('hamburger');
    const nl=document.getElementById('navLinks');
    if(ham2&&nl)ham2.addEventListener('click',()=>{nl.classList.toggle('open');ham2.classList.toggle('active');});
  }
}
function doLogout(){localStorage.removeItem('np_user');window.location.href=window.location.pathname.includes('/pages/')?'../index.html':'index.html';}
window.doLogout=doLogout;
updateNav();

/* ── Active nav link ── */
const _path=window.location.pathname;
document.querySelectorAll('.nav-link').forEach(a=>{
  const href=(a.getAttribute('href')||'').replace('../','').replace('./','');
  if(href&&_path.endsWith(href))a.classList.add('active');
});
