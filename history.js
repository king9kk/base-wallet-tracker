// Search History Module
const HISTORY_KEY = 'wallet_search_history';
const MAX_HISTORY = 10;

function getSearchHistory() {
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY)) || [];
  } catch {
    return [];
  }
}

function saveToHistory(address) {
  let history = getSearchHistory();
  history = history.filter(h => h !== address);
  history.unshift(address);
  if (history.length > MAX_HISTORY) {
    history = history.slice(0, MAX_HISTORY);
  }
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  renderHistory();
}

function clearHistory() {
  localStorage.removeItem(HISTORY_KEY);
  renderHistory();
}

function renderHistory() {
  const container = document.querySelector('#search-history');
  if (!container) return;

  const history = getSearchHistory();
  if (history.length === 0) {
    container.innerHTML = '<p class="no-history">No recent searches</p>';
    return;
  }

  container.innerHTML = `
    <div class="history-card card">
      <div class="history-header">
        <h3>🕒 Recent Searches</h3>
        <button onclick="clearHistory()" class="clear-btn">Clear</button>
      </div>
      ${history.map(address => `
        <div class="history-item" onclick="searchWallet('${address}')">
          <span class="history-address">${address.slice(0, 8)}...${address.slice(-6)}</span>
          <span class="history-arrow">→</span>
        </div>
      `).join('')}
    </div>
  `;
}

document.addEventListener('DOMContentLoaded', renderHistory);