// Notification System
const NOTIFICATION_TYPES = {
  SUCCESS: "success",
  ERROR: "error",
  WARNING: "warning",
  INFO: "info",
};

const NOTIFICATION_EVENTS = {
  TX_SENT: "tx_sent",
  TX_CONFIRMED: "tx_confirmed",
  TX_FAILED: "tx_failed",
  PRICE_ALERT: "price_alert",
  LOW_BALANCE: "low_balance",
  SWAP_COMPLETE: "swap_complete",
};

function createNotification(type, title, message, event = null) {
  return {
    id: `notif_${Date.now()}`,
    type,
    title,
    message,
    event,
    timestamp: Date.now(),
    read: false,
  };
}

function markAsRead(notification) {
  return { ...notification, read: true };
}

function markAllAsRead(notifications) {
  return notifications.map((n) => ({ ...n, read: true }));
}

function getUnreadCount(notifications) {
  return notifications.filter((n) => !n.read).length;
}

function filterByType(notifications, type) {
  if (!type || type === "all") return notifications;
  return notifications.filter((n) => n.type === type);
}

function sortByDate(notifications, order = "desc") {
  return [...notifications].sort((a, b) =>
    order === "desc" ? b.timestamp - a.timestamp : a.timestamp - b.timestamp
  );
}

function deleteNotification(notifications, id) {
  return notifications.filter((n) => n.id !== id);
}

function clearAllNotifications() {
  return [];
}

function createTxNotification(txHash, status) {
  if (status === "success") {
    return createNotification(
      NOTIFICATION_TYPES.SUCCESS,
      "Transaction Confirmed",
      `Tx ${txHash.slice(0, 10)}... confirmed`,
      NOTIFICATION_EVENTS.TX_CONFIRMED
    );
  }
  return createNotification(
    NOTIFICATION_TYPES.ERROR,
    "Transaction Failed",
    `Tx ${txHash.slice(0, 10)}... failed`,
    NOTIFICATION_EVENTS.TX_FAILED
  );
}

function createPriceAlertNotification(token, price) {
  return createNotification(
    NOTIFICATION_TYPES.INFO,
    "Price Alert Triggered",
    `${token} reached $${price}`,
    NOTIFICATION_EVENTS.PRICE_ALERT
  );
}

export {
  NOTIFICATION_TYPES,
  NOTIFICATION_EVENTS,
  createNotification,
  markAsRead,
  markAllAsRead,
  getUnreadCount,
  filterByType,
  sortByDate,
  deleteNotification,
  clearAllNotifications,
  createTxNotification,
  createPriceAlertNotification,
};