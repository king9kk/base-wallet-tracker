// Sidebar Navigation Module
const PAGES = [
  { id: 'dashboard', icon: '🏠', label: 'Dashboard' },
  { id: 'portfolio', icon: '💼', label: 'Portfolio' },
  { id: 'transactions', icon: '📜', label: 'Transactions' },
  { id: 'tokens', icon: '🪙', label: 'Tokens' },
  { id: 'nfts', icon: '🖼️', label: 'NFTs' },
  { id: 'analytics', icon: '📊', label: 'Analytics' },
  { id: 'watchlist', icon: '👀', label: 'Watchlist' },
  { id: 'settings', icon: '⚙️', label: 'Settings' }
];

let activePage = 'dashboard';

function renderSidebar() {
  const container = document.querySelector('#sidebar');
  if (!container) return;

  container.innerHTML = `
    <div class="sidebar-inner">
      <div class="sidebar-logo">⬡ Base Tracker</div>
      <nav class="sidebar-nav">
        ${PAGES.map(page => `
          <div 
            class="nav-item ${page.id === activePage ? 'active' : ''}"
            onclick="navigateTo('${page.id}')"
          >
            <span class="nav-icon">${page.icon}</span>
            <span class="nav-label">${page.label}</span>
          </div>
        `).join('')}
      </nav>
    </div>
  `;
}

function navigateTo(pageId) {
  activePage = pageId;
  document.querySelectorAll('.page-section').forEach(section => {
    section.style.display = 'none';
  });
  const target = document.querySelector(`#${pageId}-section`);
  if (target) target.style.display = 'block';
  renderSidebar();
}

document.addEventListener('DOMContentLoaded', () => {
  renderSidebar();
  navigateTo('dashboard');
});