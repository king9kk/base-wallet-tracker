// Auto Refresh Module
let refreshTimer = null;
let lastRefresh = null;
let isRefreshing = false;

function startAutoRefresh(address, interval = 30000) {
  stopAutoRefresh();
  if (!address) return;

  refreshTimer = setInterval(async () => {
    await refreshData(address);
  }, interval);

  console.log(`Auto refresh started: every ${interval / 1000}s`);
}

function stopAutoRefresh() {
  if (refreshTimer) {
    clearInterval(refreshTimer);
    refreshTimer = null;
  }
}

async function refreshData(address) {
  if (isRefreshing) return;
  isRefreshing = true;

  const refreshBtn = document.querySelector('#refresh-btn');
  if (refreshBtn) {
    refreshBtn.textContent = '🔄 Refreshing...';
    refreshBtn.disabled = true;
  }

  try {
    await Promise.all([
      displayBalance(address),
      loadTransactions(address),
      loadPortfolio(address),
      renderGasTracker(),
      renderPriceTracker()
    ]);

    lastRefresh = new Date();
    updateLastRefreshUI();
    showSuccess('Data refreshed!');
  } catch (error) {
    handleError(error, ERROR_TYPES.NETWORK);
  } finally {
    isRefreshing = false;
    if (refreshBtn) {
      refreshBtn.textContent = '🔄 Refresh';
      refreshBtn.disabled = false;
    }
  }
}

function updateLastRefreshUI() {
  const el = document.querySelector('#last-refresh');
  if (el && lastRefresh) {
    el.textContent = `Last updated: ${lastRefresh.toLocaleTimeString()}`;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const refreshBtn = document.querySelector('#refresh-btn');
  if (refreshBtn) {
    refreshBtn.addEventListener('click', () => {
      if (connectedAddress) refreshData(connectedAddress);
    });
  }
});