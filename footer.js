// Footer Component Module
function renderFooter() {
  const existing = document.querySelector('#app-footer');
  if (existing) existing.remove();

  const footer = document.createElement('footer');
  footer.id = 'app-footer';
  footer.innerHTML = `
    <div class="footer-inner container">
      <div class="footer-left">
        <span>⬡ Base Wallet Tracker</span>
        <span class="footer-version">v1.0.0</span>
      </div>
      <div class="footer-links">
        <a href="https://base.org" target="_blank">Base Network</a>
        <a href="https://basescan.org" target="_blank">BaseScan</a>
        <a href="https://github.com/king9kk/base-wallet-tracker" target="_blank">GitHub</a>
      </div>
      <div class="footer-right">
        <span class="network-status">
          <span class="status-dot"></span>
          Base Mainnet
        </span>
      </div>
    </div>
  `;

  const style = document.createElement('style');
  style.textContent = `
    #app-footer {
      background: var(--card);
      border-top: 1px solid var(--border);
      padding: 16px 0;
      margin-top: 48px;
    }
    .footer-inner {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 12px;
    }
    .footer-links { display: flex; gap: 16px; }
    .footer-links a { color: var(--muted); text-decoration: none; font-size: 14px; }
    .footer-links a:hover { color: var(--primary); }
    .footer-version { color: var(--muted); font-size: 12px; margin-left: 8px; }
    .status-dot {
      display: inline-block;
      width: 8px; height: 8px;
      background: #00c853;
      border-radius: 50%;
      margin-right: 6px;
      animation: pulse 2s infinite;
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.4; }
    }
  `;

  document.head.appendChild(style);
  document.body.appendChild(footer);
}

document.addEventListener('DOMContentLoaded', renderFooter);