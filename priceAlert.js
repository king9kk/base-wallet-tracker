// Price Alert System
const ALERT_TYPES = {
  ABOVE: "above",
  BELOW: "below",
  PERCENT_CHANGE: "percent_change",
};

const ALERT_STATUS = {
  ACTIVE: "active",
  TRIGGERED: "triggered",
  CANCELLED: "cancelled",
};

function createAlert(token, type, targetValue, currentPrice) {
  return {
    id: `alert_${Date.now()}`,
    token: token.toUpperCase(),
    type,
    targetValue: parseFloat(targetValue),
    currentPrice: parseFloat(currentPrice),
    status: ALERT_STATUS.ACTIVE,
    createdAt: Date.now(),
    triggeredAt: null,
  };
}

function checkAlert(alert, currentPrice) {
  if (alert.status !== ALERT_STATUS.ACTIVE) return false;

  const price = parseFloat(currentPrice);

  if (alert.type === ALERT_TYPES.ABOVE) {
    return price >= alert.targetValue;
  }

  if (alert.type === ALERT_TYPES.BELOW) {
    return price <= alert.targetValue;
  }

  if (alert.type === ALERT_TYPES.PERCENT_CHANGE) {
    const change =
      ((price - alert.currentPrice) / alert.currentPrice) * 100;
    return Math.abs(change) >= alert.targetValue;
  }

  return false;
}

function triggerAlert(alert) {
  return {
    ...alert,
    status: ALERT_STATUS.TRIGGERED,
    triggeredAt: Date.now(),
  };
}

function cancelAlert(alert) {
  return {
    ...alert,
    status: ALERT_STATUS.CANCELLED,
  };
}

function getActiveAlerts(alerts) {
  return alerts.filter((a) => a.status === ALERT_STATUS.ACTIVE);
}

function formatAlertMessage(alert, currentPrice) {
  if (alert.type === ALERT_TYPES.ABOVE) {
    return `${alert.token} reached above $${alert.targetValue}`;
  }
  if (alert.type === ALERT_TYPES.BELOW) {
    return `${alert.token} dropped below $${alert.targetValue}`;
  }
  return `${alert.token} changed by ${alert.targetValue}%`;
}

export {
  ALERT_TYPES,
  ALERT_STATUS,
  createAlert,
  checkAlert,
  triggerAlert,
  cancelAlert,
  getActiveAlerts,
  formatAlertMessage,
};