// Error Handling Module
const ERROR_TYPES = {
  NETWORK: 'network_error',
  WALLET: 'wallet_error',
  API: 'api_error',
  VALIDATION: 'validation_error'
};

function handleError(error, type = ERROR_TYPES.NETWORK) {
  console.error(`[${type}]`, error);

  const messages = {
    [ERROR_TYPES.NETWORK]: 'Network error. Please check your connection.',
    [ERROR_TYPES.WALLET]: 'Wallet error. Please reconnect your wallet.',
    [ERROR_TYPES.API]: 'API error. Please try again later.',
    [ERROR_TYPES.VALIDATION]: 'Invalid input. Please check your data.'
  };

  showError(messages[type] || 'Something went wrong!');
  logError(error, type);
}

function logError(error, type) {
  const logs = getErrorLogs();
  logs.unshift({
    type,
    message: error.message || String(error),
    timestamp: new Date().toISOString()
  });
  if (logs.length > 50) logs.pop();
  localStorage.setItem('error_logs', JSON.stringify(logs));
}

function getErrorLogs() {
  try {
    return JSON.parse(localStorage.getItem('error_logs')) || [];
  } catch {
    return [];
  }
}

function clearErrorLogs() {
  localStorage.removeItem('error_logs');
  showSuccess('Error logs cleared!');
}

function renderErrorLogs() {
  const container = document.querySelector('#error-logs');
  if (!container) return;
  const logs = getErrorLogs();

  container.innerHTML = logs.length === 0
    ? '<p>No errors logged</p>'
    : logs.map(log => `
      <div class="error-log-item">
        <span class="error-type">${log.type}</span>
        <span class="error-msg">${log.message}</span>
        <span class="error-time">${new Date(log.timestamp).toLocaleTimeString()}</span>
      </div>
    `).join('');
}

window.addEventListener('unhandledrejection', (event) => {
  handleError(event.reason, ERROR_TYPES.NETWORK);
});