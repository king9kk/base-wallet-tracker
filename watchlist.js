// Watchlist Alert Module
const ALERT_KEY = 'wallet_alerts';

function getAlerts() {
  try {
    return JSON.parse(localStorage.getItem(ALERT_KEY)) || [];
  } catch {
    return [];
  }
}

function addAlert(address, type, threshold) {
  const alerts = getAlerts();
  const alert = {
    id: Date.now(),
    address,
    type,
    threshold: parseFloat(threshold),
    active: true,
    createdAt: new Date().toISOString()
  };
  alerts.push(alert);
  localStorage.setItem(ALERT_KEY, JSON.stringify(alerts));
  showSuccess(`Alert added for ${shortenAddress(address)}!`);
  renderAlerts();
}

function removeAlert(id) {
  let alerts = getAlerts();
  alerts = alerts.filter(a => a.id !== id);
  localStorage.setItem(ALERT_KEY, JSON.stringify(alerts));
  renderAlerts();
}

async function checkAlerts() {
  const alerts = getAlerts().filter(a => a.active);
  for (const alert of alerts) {
    const balance = await getWalletBalance(alert.address);
    if (alert.type === 'balance_below' && 
        parseFloat(balance) < alert.threshold) {
      notifyAlert(alert, balance);
    }
    if (alert.type === 'balance_above' && 
        parseFloat(balance) > alert.threshold) {
      notifyAlert(alert, balance);
    }
  }
}

function notifyAlert(alert, currentValue) {
  showToast(
    `⚠️ Alert: ${shortenAddress(alert.address)} balance is ${currentValue} ETH`,
    'error'
  );
}

function renderAlerts() {
  const container = document.querySelector('#alerts-container');
  if (!container) return;
  const alerts = getAlerts();

  container.innerHTML = alerts.length === 0
    ? '<p class="no-alerts">No alerts set</p>'
    : alerts.map(alert => `
      <div class="alert-item card">
        <span>${shortenAddress(alert.address)}</span>
        <span>${alert.type === 'balance_below' ? '⬇️' : '⬆️'} ${alert.threshold} ETH</span>
        <button onclick="removeAlert(${alert.id})" class="remove-btn">Remove</button>
      </div>
    `).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  renderAlerts();
  setInterval(checkAlerts, 60000);
});