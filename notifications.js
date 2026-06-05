// Notifications Module
const WATCHED_WALLETS_KEY = 'watched_wallets';

function getWatchedWallets() {
  try {
    return JSON.parse(localStorage.getItem(WATCHED_WALLETS_KEY)) || [];
  } catch {
    return [];
  }
}

function addWatchedWallet(address) {
  let wallets = getWatchedWallets();
  if (wallets.includes(address)) {
    showError('Wallet already being watched!');
    return;
  }
  wallets.push(address);
  localStorage.setItem(WATCHED_WALLETS_KEY, JSON.stringify(wallets));
  showSuccess('Wallet added to watchlist!');
  renderWatchlist();
}

function removeWatchedWallet(address) {
  let wallets = getWatchedWallets();
  wallets = wallets.filter(w => w !== address);
  localStorage.setItem(WATCHED_WALLETS_KEY, JSON.stringify(wallets));
  showSuccess('Wallet removed from watchlist!');
  renderWatchlist();
}

function renderWatchlist() {
  const container = document.querySelector('#watchlist-container');
  if (!container) return;

  const wallets = getWatchedWallets();
  if (wallets.length === 0) {
    container.innerHTML = '<p class="no-watch">No wallets in watchlist</p>';
    return;
  }

  container.innerHTML = `
    <div class="watchlist-card card">
      <h3>👀 Watchlist</h3>
      ${wallets.map(wallet => `
        <div class="watch-item">
          <span>${wallet.slice(0, 8)}...${wallet.slice(-6)}</span>
          <button onclick="removeWatchedWallet('${wallet}')" 
            class="remove-btn">Remove</button>
        </div>
      `).join('')}
    </div>
  `;
}

document.addEventListener('DOMContentLoaded', renderWatchlist);