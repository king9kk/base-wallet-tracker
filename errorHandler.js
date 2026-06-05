// Error Handler Utilities
const ERROR_CODES = {
  NETWORK_ERROR: "NETWORK_ERROR",
  WALLET_NOT_FOUND: "WALLET_NOT_FOUND",
  INSUFFICIENT_BALANCE: "INSUFFICIENT_BALANCE",
  INVALID_ADDRESS: "INVALID_ADDRESS",
  TX_FAILED: "TX_FAILED",
  UNSUPPORTED_NETWORK: "UNSUPPORTED_NETWORK",
  USER_REJECTED: "USER_REJECTED",
  TIMEOUT: "TIMEOUT",
};

const ERROR_MESSAGES = {
  NETWORK_ERROR: "Network connection failed. Please try again.",
  WALLET_NOT_FOUND: "No wallet found. Please connect your wallet.",
  INSUFFICIENT_BALANCE: "Insufficient balance for this transaction.",
  INVALID_ADDRESS: "Invalid wallet address provided.",
  TX_FAILED: "Transaction failed. Please try again.",
  UNSUPPORTED_NETWORK: "This network is not supported.",
  USER_REJECTED: "Transaction rejected by user.",
  TIMEOUT: "Request timed out. Please try again.",
};

function createError(code, customMessage = null) {
  return {
    code,
    message: customMessage || ERROR_MESSAGES[code] || "Unknown error",
    timestamp: Date.now(),
  };
}

function handleRPCError(error) {
  if (!error) return createError("UNKNOWN");

  const msg = error.message?.toLowerCase() || "";

  if (msg.includes("rejected") || msg.includes("denied")) {
    return createError(ERROR_CODES.USER_REJECTED);
  }
  if (msg.includes("insufficient")) {
    return createError(ERROR_CODES.INSUFFICIENT_BALANCE);
  }
  if (msg.includes("network") || msg.includes("connection")) {
    return createError(ERROR_CODES.NETWORK_ERROR);
  }
  if (msg.includes("timeout")) {
    return createError(ERROR_CODES.TIMEOUT);
  }

  return createError("UNKNOWN", error.message);
}

function isUserRejection(error) {
  return error?.code === ERROR_CODES.USER_REJECTED;
}

function isNetworkError(error) {
  return error?.code === ERROR_CODES.NETWORK_ERROR;
}

function logError(error, context = "") {
  console.error(`[${context}] Error:`, {
    code: error?.code,
    message: error?.message,
    timestamp: new Date(error?.timestamp).toISOString(),
  });
}

function formatErrorForUI(error) {
  return {
    title: "Something went wrong",
    message: error?.message || "An unexpected error occurred.",
    code: error?.code || "UNKNOWN",
  };
}

export {
  ERROR_CODES,
  ERROR_MESSAGES,
  createError,
  handleRPCError,
  isUserRejection,
  isNetworkError,
  logError,
  formatErrorForUI,
};