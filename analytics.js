// Analytics Module
function calculateStats(transactions) {
  if (!transactions || transactions.length === 0) {
    return {
      total: 0,
      sent: 0,
      received: 0,
      failed: 0,
      totalVolume: 0,
      avgValue: 0
    };
  }

  const stats = transactions.reduce((acc, tx) => {
    const value = parseFloat(formatEth(tx.value));
    acc.total++;
    if (tx.isError === '1') {
      acc.failed++;
    } else if (tx.from.toLowerCase() === connectedAddress?.toLowerCase()) {
      acc.sent++;
      acc.totalVolume += value;
    } else {
      acc.received++;
      acc.totalVolume += value;
    }
    return acc;
  }, { total: 0, sent: 0, received: 0, failed: 0, totalVolume: 0 });

  stats.avgValue = stats.total > 0
    ? (stats.totalVolume / stats.total).toFixed(4)
    : 0;
  stats.totalVolume = stats.totalVolume.toFixed(4);

  return stats;
}

function renderAnalytics(transactions) {
  const stats = calculateStats(transactions);
  const container = document.querySelector('#analytics-container');
  if (!container) return;

  container.innerHTML = `
    <div class="analytics-card card">
      <h3>📊 Analytics</h3>
      <div class="stats-grid">
        <div class="stat-item">
          <span class="stat-label">Total Txs</span>
          <span class="stat-value">${stats.total}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">Sent</span>
          <span class="stat-value">${stats.sent}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">Received</span>
          <span class="stat-value">${stats.received}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">Failed</span>
          <span class="stat-value red">${stats.failed}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">Total Volume</span>
          <span class="stat-value">${stats.totalVolume} ETH</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">Avg Value</span>
          <span class="stat-value">${stats.avgValue} ETH</span>
        </div>
      </div>
    </div>
  `;
}