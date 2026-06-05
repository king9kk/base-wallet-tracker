// Wallet Connection Module
const walletConfig = {
  networkName: 'Base Mainnet',
  chainId: 8453,
  rpcUrl: 'https://mainnet.base.org',
  explorer: 'https://basescan.org',
  symbol: 'ETH'
};

let connectedAddress = null;

async function connectWallet() {
  try {
    if (!window.ethereum) {
      alert('Please install MetaMask to connect your wallet!');
      return;
    }
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts'
    });
    connectedAddress = accounts[0];
    updateWalletUI(connectedAddress);
    console.log('Wallet connected:', connectedAddress);
  } catch (error) {
    console.error('Wallet connection failed:', error);
  }
}

function disconnectWallet() {
  connectedAddress = null;
  updateWalletUI(null);
}

function updateWalletUI(address) {
  const btn = document.querySelector('.connect-btn');
  if (!btn) return;
  if (address) {
    btn.textContent = address.slice(0, 6) + '...' + address.slice(-4);
    btn.style.background = '#00c853';
  } else {
    btn.textContent = 'Connect Wallet';
    btn.style.background = '#0052ff';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const btn = document.querySelector('.connect-btn');
  if (btn) btn.addEventListener('click', connectWallet);
});