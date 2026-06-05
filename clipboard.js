// Clipboard & Share Module
async function copyAddress(address) {
  try {
    await navigator.clipboard.writeText(address);
    showSuccess('Address copied to clipboard!');
  } catch {
    fallbackCopy(address);
  }
}

function fallbackCopy(text) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  try {
    document.execCommand('copy');
    showSuccess('Copied!');
  } catch {
    showError('Failed to copy!');
  }
  document.body.removeChild(textarea);
}

function shareWallet(address) {
  const url = `${window.location.origin}?address=${address}`;
  if (navigator.share) {
    navigator.share({
      title: 'Base Wallet Tracker',
      text: `Check out this wallet on Base: ${shortenAddress(address)}`,
      url
    });
  } else {
    copyToClipboard(url);
    showSuccess('Share link copied!');
  }
}

function initCopyButtons() {
  document.querySelectorAll('[data-copy]').forEach(btn => {
    btn.addEventListener('click', () => {
      const text = btn.getAttribute('data-copy');
      copyAddress(text);
      btn.textContent = '✅ Copied';
      setTimeout(() => btn.textContent = '📋 Copy', 2000);
    });
  });
}

function loadFromURL() {
  const params = new URLSearchParams(window.location.search);
  const address = params.get('address');
  if (address && isValidAddress(address)) {
    const input = document.querySelector('.search-input');
    if (input) input.value = address;
    searchWallet(address);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initCopyButtons();
  loadFromURL();
});