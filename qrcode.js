// QR Code Generator Module
function generateQRData(address) {
  return `ethereum:${address}@8453`;
}

function renderQRCode(address) {
  const container = document.querySelector('#qr-container');
  if (!container) return;

  const qrData = generateQRData(address);
  const size = 200;
  const cells = 25;
  const cellSize = size / cells;

  // Simple QR placeholder with address display
  container.innerHTML = `
    <div class="qr-card card">
      <h3>📱 QR Code</h3>
      <div class="qr-wrapper">
        <svg width="${size}" height="${size}" 
          viewBox="0 0 ${size} ${size}"
          style="border: 8px solid white; border-radius: 8px;">
          <rect width="${size}" height="${size}" fill="white"/>
          <!-- Corner markers -->
          <rect x="10" y="10" width="50" height="50" fill="none" 
            stroke="#0052ff" stroke-width="8"/>
          <rect x="20" y="20" width="30" height="30" fill="#0052ff"/>
          <rect x="${size-60}" y="10" width="50" height="50" fill="none"
            stroke="#0052ff" stroke-width="8"/>
          <rect x="${size-50}" y="20" width="30" height="30" fill="#0052ff"/>
          <rect x="10" y="${size-60}" width="50" height="50" fill="none"
            stroke="#0052ff" stroke-width="8"/>
          <rect x="20" y="${size-50}" width="30" height="30" fill="#0052ff"/>
          <!-- Center pattern -->
          <text x="${size/2}" y="${size/2}" 
            text-anchor="middle" 
            dominant-baseline="middle"
            font-size="32">⬡</text>
        </svg>
      </div>
      <p class="qr-address">${shortenAddress(address, 8)}</p>
      <button onclick="copyAddress('${address}')" class="btn-primary">
        📋 Copy Address
      </button>
    </div>
  `;
}

function showQRModal(address) {
  const content = `
    <div id="qr-container"></div>
  `;
  createModal('qr-modal', 'Receive Funds', content);
  renderQRCode(address);
}

document.addEventListener('DOMContentLoaded', () => {
  const qrBtn = document.querySelector('#show-qr');
  if (qrBtn) {
    qrBtn.addEventListener('click', () => {
      if (connectedAddress) showQRModal(connectedAddress);
      else showError('Please connect your wallet first!');
    });
  }
});