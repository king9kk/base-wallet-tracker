// Transaction History Utilities
const TX_TYPES = {
  SEND: "send",
  RECEIVE: "receive",
  SWAP: "swap",
  APPROVE: "approve",
  CONTRACT: "contract",
};

const TX_STATUS = {
  PENDING: "pending",
  SUCCESS: "success",
  FAILED: "failed",
};

function classifyTx(tx, userAddress) {
  if (!tx || !userAddress) return TX_TYPES.CONTRACT;

  const from = tx.from?.toLowerCase();
  const to = tx.to?.toLowerCase();
  const user = userAddress.toLowerCase();

  if (from === user && to === user) return TX_TYPES.SWAP;
  if (from === user) return TX_TYPES.SEND;
  if (to === user) return TX_TYPES.RECEIVE;
  return TX_TYPES.CONTRACT;
}

function formatTxDate(timestamp) {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatTxTime(timestamp) {
  const date = new Date(timestamp * 1000);
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function filterTxByType(transactions, type) {
  if (!type || type === "all") return transactions;
  return transactions.filter((tx) => tx.type === type);
}

function filterTxByStatus(transactions, status) {
  if (!status || status === "all") return transactions;
  return transactions.filter((tx) => tx.status === status);
}

function sortTxByDate(transactions, order = "desc") {
  return [...transactions].sort((a, b) => {
    return order === "desc"
      ? b.timestamp - a.timestamp
      : a.timestamp - b.timestamp;
  });
}

function calcTotalSent(transactions, userAddress) {
  return transactions
    .filter(
      (tx) =>
        tx.from?.toLowerCase() === userAddress?.toLowerCase() &&
        tx.status === TX_STATUS.SUCCESS
    )
    .reduce((sum, tx) => sum + parseFloat(tx.value || 0), 0);
}

function calcTotalReceived(transactions, userAddress) {
  return transactions
    .filter(
      (tx) =>
        tx.to?.toLowerCase() === userAddress?.toLowerCase() &&
        tx.status === TX_STATUS.SUCCESS
    )
    .reduce((sum, tx) => sum + parseFloat(tx.value || 0), 0);
}

export {
  TX_TYPES,
  TX_STATUS,
  classifyTx,
  formatTxDate,
  formatTxTime,
  filterTxByType,
  filterTxByStatus,
  sortTxByDate,
  calcTotalSent,
  calcTotalReceived,
};