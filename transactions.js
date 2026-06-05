// Transaction History Module
async function getTransactions(address) {
  try {
    const response = await fetch(
      `https://api.basescan.org/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=desc`
    );
    const data = await response.json();
    return data.result || [];
  } catch (error) {
    console.error('Failed to fetch transactions:', error);
    return [];
  }
}

function renderTransactions(transactions) {
  const container = document.querySelector('.tx-list');
  if (!container) return;

  if (transactions.length === 0) {
    container.innerHTML = '<p class="no-tx">No transactions found</p>';
    return;
  }

  container.innerHTML = transactions.slice(0, 10).map(tx => `
    <div class="tx-item">
      <div class="tx-hash">
        <a href="https://basescan.org/tx/${tx.hash}" target="_blank">
          ${tx.hash.slice(0, 10)}...
        </a>
      </div>
      <div class="tx-value">${(parseInt(tx.value) / 1e18).toFixed(4)} ETH</div>
      <div class="tx-status ${tx.isError === '0' ? 'success' : 'failed'}">
        ${tx.isError === '0' ? '✅ Success' : '❌ Failed'}
      </div>
    </div>
  `).join('');
}

async function loadTransactions(address) {
  const txs = await getTransactions(address);
  renderTransactions(txs);
}