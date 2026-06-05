// Balance Fetcher Module
async function getWalletBalance(address) {
  try {
    const response = await fetch(
      `https://api.basescan.org/api?module=account&action=balance&address=${address}&tag=latest`
    );
    const data = await response.json();
    const balanceInEth = parseInt(data.result) / 1e18;
    return balanceInEth.toFixed(4);
  } catch (error) {
    console.error('Failed to fetch balance:', error);
    return '0.0000';
  }
}

async function displayBalance(address) {
  const balanceEl = document.querySelector('.balance-amount');
  if (!balanceEl) return;
  balanceEl.textContent = 'Loading...';
  const balance = await getWalletBalance(address);
  balanceEl.textContent = `${balance} ETH`;
}

function formatAddress(address) {
  if (!address) return '';
  return address.slice(0, 6) + '...' + address.slice(-4);
}

function formatBalance(balance) {
  return parseFloat(balance).toLocaleString('en-US', {
    minimumFractionDigits: 4,
    maximumFractionDigits: 4
  });
}