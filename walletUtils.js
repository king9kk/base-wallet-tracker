// Wallet Utility Functions
function validateAddress(address) {
  if (!address) return false;
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

function checksumAddress(address) {
  if (!validateAddress(address)) return null;
  return address.toLowerCase();
}

function generateWalletLabel(address, name = null) {
  if (name) return name;
  return `Wallet ${address.slice(0, 6)}...${address.slice(-4)}`;
}

function sortTokensByBalance(tokens) {
  return [...tokens].sort((a, b) => {
    const aVal = parseFloat(a.balanceUSD || 0);
    const bVal = parseFloat(b.balanceUSD || 0);
    return bVal - aVal;
  });
}

function filterZeroBalances(tokens) {
  return tokens.filter((t) => parseFloat(t.balance || 0) > 0);
}

function calcTotalPortfolioValue(tokens) {
  return tokens.reduce((sum, t) => {
    return sum + parseFloat(t.balanceUSD || 0);
  }, 0);
}

function groupTxByDate(transactions) {
  return transactions.reduce((groups, tx) => {
    const date = new Date(tx.timestamp * 1000).toLocaleDateString();
    if (!groups[date]) groups[date] = [];
    groups[date].push(tx);
    return groups;
  }, {});
}

function isSentTx(tx, userAddress) {
  return tx.from?.toLowerCase() === userAddress?.toLowerCase();
}

function isReceivedTx(tx, userAddress) {
  return tx.to?.toLowerCase() === userAddress?.toLowerCase();
}

export {
  validateAddress,
  checksumAddress,
  generateWalletLabel,
  sortTokensByBalance,
  filterZeroBalances,
  calcTotalPortfolioValue,
  groupTxByDate,
  isSentTx,
  isReceivedTx,
};