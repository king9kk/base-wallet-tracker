// Transaction Chart Module
function generateChartData(transactions) {
  const last7Days = {};
  const today = new Date();

  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const key = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    last7Days[key] = 0;
  }

  transactions.forEach(tx => {
    const date = new Date(parseInt(tx.timeStamp) * 1000);
    const key = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    if (last7Days[key] !== undefined) {
      last7Days[key] += parseFloat((parseInt(tx.value) / 1e18).toFixed(4));
    }
  });

  return last7Days;
}

function renderBarChart(data) {
  const container = document.querySelector('#chart-container');
  if (!container) return;

  const max = Math.max(...Object.values(data), 0.001);
  const bars = Object.entries(data).map(([label, value]) => {
    const height = Math.max((value / max) * 100, 2);
    return `
      <div class="bar-wrapper">
        <div class="bar" style="height: ${height}%" title="${value} ETH"></div>
        <span class="bar-label">${label}</span>
      </div>
    `;
  }).join('');

  container.innerHTML = `
    <div class="c