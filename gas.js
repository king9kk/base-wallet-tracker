// Gas Fee Tracker Module
async function getGasPrice() {
  try {
    const response = await fetch(
      'https://api.basescan.org/api?module=gastracker&action=gasoracle'
    );
    const data = await response.json();
    return {
      slow: data.result.SafeGasPrice,
      average: data.result.ProposeGasPrice,
      fast: data.result.FastGasPrice
    };
  } catch (error) {
    console.error('Failed to fetch gas price:', error);
    return { slow: '0', average: '0', fast: '0' };
  }
}

async function renderGasTracker() {
  const container = document.querySelector('#gas-container');
  if (!container) return;

  container.innerHTML = '<p>Loading gas prices...</p>';
  const gas = await getGasPrice();

  container.innerHTML = `
    <div class="gas-card card">
      <h3>⛽ Gas Tracker</h3>
      <div class="gas-grid">
        <div class="gas-item slow">
          <span>🐢 Slow</span>
          <span>${gas.slow} Gwei</span>
        </div>
        <div class="gas-item average">
          <span>🚗 Average</span>
          <span>${gas.average} Gwei</span>
        </div>
        <div class="gas-item fast">
          <span>🚀 Fast</span>
          <span>${gas.fast} Gwei</span>
        </div>
      </div>
    </div>
  `;
}

function initGasTracker() {
  renderGasTracker();
  setInterval(renderGasTracker, 30000);
}

document.addEventListener('DOMContentLoaded', initGasTracker);