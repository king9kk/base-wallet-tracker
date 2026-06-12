// Security & Safety Module
function sanitizeInput(input) {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

function isPhishingAddress(address) {
  const knownPhishing = [
    '0x0000000000000000000000000000000000000000'
  ];
  return knownPhishing.includes(address.toLowerCase());
}

function isSuspiciousTransaction(tx) {
  const value = parseInt(tx.value) / 1e18;
  return {
    isHighValue: value > 10,
    isFailed: tx.isError === '1',
    isNewContract: tx.to === null || tx.to === '',
    warnings: [
      value > 10 ? '⚠️ High value transaction' : null,
      tx.isError === '1' ? '❌ Transaction failed' : null,
    ].filter(Boolean)
  };
}

function checkContractSafety(address) {
  return {
    isVerified: false,
    isProxy: false,
    warning: 'Always verify contracts before interacting',
    explorerUrl: `https://basescan.org/address/${address}#code`
  };
}

function renderSecurityWarning(tx) {
  const analysis = isSuspiciousTransaction(tx);
  if (analysis.warnings.length === 0) return '';

  return `
    <div style="background:rgba(255,61,0,0.1);border:1px solid #ff3d00;
      border-radius:8px;padding:12px;margin-top:8px">
      ${analysis.warnings.map(w => `
        <div style="color:#ff3d00;font-size:13px">${w}</div>
      `).join('')}
    </div>
  `;
}

function maskSensitiveData(data) {
  if (typeof data !== 'string') return data;
  if (data.startsWith('0x') && data.length === 42) {
    return data.slice(0, 6) + '****' + data.slice(-4);
  }
  return data;
}