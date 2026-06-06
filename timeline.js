// Transaction Timeline Module
function groupTransactionsByDate(transactions) {
  const groups = {};

  transactions.forEach(tx => {
    const date = new Date(parseInt(tx.timeStamp) * 1000);
    const key = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    if (!groups[key]) groups[key] = [];
    groups[key].push(tx);
  });

  return groups;
}

function renderTimeline(transactions) {
  const container = document.querySelector('#timeline-container');
  if (!container) return;

  if (!transactions || transactions.length === 0) {
    container.innerHTML = '<p class="no-data">No transactions found</p>';
    return;
  }

  const groups = groupTransactionsByDate(transactions);

  container.innerHTML = `
    <div class="timeline-card card">
      <h3>📅 Transaction Timeline</h3>
      <div class="timeline">
        ${Object.entries(groups).map(([date, txs]) => `
          <div class="timeline-group">
            <div class="timeline-date">${date}</div>
            <div class="timeline-items">
              ${txs.map(tx => `
                <div class="timeline-item ${tx.isError === '1' ? 'failed' : 'success'}">
                  <div class="timeline-dot"></div>
                  <div class="timeline-content">
                    <span class="timeline-type">
                      ${tx.from.toLowerCase() === connectedAddress?.toLowerCase() 
                        ? '📤 Sent' : '📥 Received'}
                    </span>
                    <span class="timeline-value">${formatEth(tx.value)} ETH</span>
                    <span class="timeline-address">
                      ${tx.from.toLowerCase() === connectedAddress?.toLowerCase()
                        ? `To: ${shortenAddress(tx.to)}`
                        : `From: ${shortenAddress(tx.from)}`}
                    </span>
                    <span class="timeline-time">
                      ${new Date(parseInt(tx.timeStamp) * 1000)
                        .toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

async function loadTimeline(address) {
  const txs = await getAccountTransactions(address);
  renderTimeline(txs);
}