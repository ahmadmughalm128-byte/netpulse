cat > /home/claude/netpulse/js/components.js << 'EOF'
/* ══ SHARED COMPONENTS ══ */
/* Call renderNav() and renderFooter() in every page */

function renderNav(activePage){
  const inPages=window.location.pathname.includes('/pages/');
  const root=inPages?'../':'./';
  const nav=document.getElementById('site-nav');
  if(!nav)return;
  nav.innerHTML=`
  <div class="nav-container">
    <a href="${root}index.html" class="nav-logo">
      <span class="logo-pulse"></span>
      <span class="logo-text">Net<span class="accent">Pulse</span></span>
      <span class="logo-tag">ACADEMY</span>
    </a>
    <div class="nav-links" id="navLinks">
      <a href="${root}index.html" class="nav-link${activePage==='home'?' active':''}">Home</a>
      <a href="${root}pages/tools.html" class="nav-link${activePage==='tools'?' active':''}">Tools</a>
      <a href="${root}pages/learn.html" class="nav-link${activePage==='learn'?' active':''}">Learn</a>
      <a href="${root}pages/challenges.html" class="nav-link${activePage==='challenges'?' active':''}">Challenges</a>
      <a href="${root}pages/pricing.html" class="nav-link${activePage==='pricing'?' active':''}">Pricing</a>
    </div>
    <div class="nav-actions" id="navActions">
      <button class="btn-ghost" onclick="window.location='${root}pages/login.html'">Sign In</button>
      <button class="btn-primary" onclick="window.location='${root}pages/register.html'">
        <span>Get Started</span>
      </button>
      <button class="hamburger" id="hamburger" aria-label="Toggle menu">
        <span></span><span></span><span></span>
      </button>
    </div>
  </div>`;
}

function renderFooter(){
  const inPages=window.location.pathname.includes('/pages/');
  const root=inPages?'../':'./';
  const footer=document.getElementById('site-footer');
  if(!footer)return;
  footer.className='site-footer';
  footer.innerHTML=`
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <a href="${root}index.html" class="nav-logo" style="margin-bottom:16px">
          <span class="logo-pulse"></span>
          <span class="logo-text">Net<span class="accent">Pulse</span></span>
          <span class="logo-tag">ACADEMY</span>
        </a>
        <p>The cybersecurity toolbox + learning hub for the next generation of IT professionals. Free tools. Structured paths. Real skills.</p>
        <div class="social-links">
          <a href="https://github.com" target="_blank" rel="noopener" aria-label="GitHub">
            <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
          </a>
          <a href="https://discord.com" target="_blank" rel="noopener" aria-label="Discord">
            <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/></svg>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener" aria-label="Twitter/X">
            <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          </a>
        </div>
      </div>
      <div class="footer-col">
        <h4>Tools</h4>
        <a href="${root}pages/tools.html#subnet">Subnet Calculator</a>
        <a href="${root}pages/tools.html#cidr">CIDR Converter</a>
        <a href="${root}pages/tools.html#port">Port Lookup</a>
        <a href="${root}pages/tools.html#ip">IP Info Tool</a>
        <a href="${root}pages/tools.html#dns">DNS Lookup</a>
        <a href="${root}pages/tools.html#mac">MAC Lookup</a>
        <a href="${root}pages/tools.html#ping">Ping Simulator</a>
      </div>
      <div class="footer-col">
        <h4>Learn</h4>
        <a href="${root}pages/learn.html#networking">Networking Basics</a>
        <a href="${root}pages/learn.html#security">Cybersecurity</a>
        <a href="${root}pages/learn.html#ethical">Ethical Hacking</a>
        <a href="${root}pages/challenges.html">Challenges</a>
        <a href="${root}pages/challenges.html#labs">Practice Labs</a>
        <a href="${root}pages/learn.html#flashcards">Flashcards</a>
      </div>
      <div class="footer-col">
        <h4>Platform</h4>
        <a href="${root}pages/pricing.html">Pricing</a>
        <a href="${root}pages/login.html">Sign In</a>
        <a href="${root}pages/register.html">Register</a>
        <a href="${root}pages/dashboard.html">Dashboard</a>
        <a href="${root}pages/privacy.html">Privacy Policy</a>
        <a href="${root}pages/terms.html">Terms of Service</a>
      </div>
    </div>
    <div class="footer-bottom">
      <p>© 2025 NetPulse Academy · Educational purposes only · Not affiliated with Cisco, CompTIA, or EC-Council</p>
      <div class="footer-legal">
        <a href="${root}pages/privacy.html">Privacy</a>
        <a href="${root}pages/terms.html">Terms</a>
        <a href="${root}pages/sitemap.html">Sitemap</a>
      </div>
    </div>
  </div>`;
}
EOF
