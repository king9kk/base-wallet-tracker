// Modal Component Module
function createModal(id, title, content) {
  const existing = document.getElementById(id);
  if (existing) existing.remove();

  const modal = document.createElement('div');
  modal.id = id;
  modal.className = 'modal-overlay';
  modal.innerHTML = `
    <div class="modal-box card">
      <div class="modal-header">
        <h3>${title}</h3>
        <button class="modal-close" onclick="closeModal('${id}')">✕</button>
      </div>
      <div class="modal-body">${content}</div>
    </div>
  `;

  document.body.appendChild(modal);
  setTimeout(() => modal.classList.add('show'), 10);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal(id);
  });
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.classList.remove('show');
  setTimeout(() => modal.remove(), 300);
}

function showTxDetail(tx) {
  const content = `
    <div class="tx-detail">
      <div class="detail-row">
        <span>Hash:</span>
        <a href="https://basescan.org/tx/${tx.hash}" target="_blank">
          ${shortenAddress(tx.hash, 8)}
        </a>
      </div>
      <div class="detail-row">
        <span>From:</span><span>${shortenAddress(tx.from)}</span>
      </div>
      <div class="detail-row">
        <span>To:</span><span>${shortenAddress(tx.to)}</span>
      </div>
      <div class="detail-row">
        <span>Value:</span><span>${formatEth(tx.value)} ETH</span>
      </div>
      <div class="detail-row">
        <span>Date:</span><span>${formatDate(tx.timeStamp)}</span>
      </div>
      <div class="detail-row">
        <span>Status:</span>
        <span class="${tx.isError === '0' ? 'success' : 'failed'}">
          ${tx.isError === '0' ? '✅ Success' : '❌ Failed'}
        </span>
      </div>
    </div>
  `;
  createModal('tx-modal', 'Transaction Details', content);
}