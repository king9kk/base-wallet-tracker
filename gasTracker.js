// Gas Tracker Utilities
const GAS_LEVELS = {
  slow: { label: "Slow", multiplier: 0.8, waitTime: "~5 min" },
  standard: { label: "Standard", multiplier: 1.0, waitTime: "~2 min" },
  fast: { label: "Fast", multiplier: 1.2, waitTime: "~30 sec" },
};

function estimateGasCost(gasPrice, gasLimit = 21000) {
  const costInWei = gasPrice * gasLimit;
  const costInGwei = costInWei / 1e9;
  const costInEth = costInWei / 1e18;
  return {
    gwei: costInGwei.toFixed(2),
    eth: costInEth.toFixed(6),
  };
}

function getGasLevel(baseFee) {
  return {
    slow: Math.floor(baseFee * GAS_LEVELS.slow.multiplier),
    standard: Math.floor(baseFee * GAS_LEVELS.standard.multiplier),
    fast: Math.floor(baseFee * GAS_LEVELS.fast.multiplier),
  };
}

function formatGwei(value) {
  return `${parseFloat(value).toFixed(1)} Gwei`;
}

function isHighGas(gweiValue, threshold = 50) {
  return parseFloat(gweiValue) > threshold;
}

function suggestGasLevel(urgency = "normal") {
  if (urgency === "urgent") return GAS_LEVELS.fast;
  if (urgency === "low") return GAS_LEVELS.slow;
  return GAS_LEVELS.standard;
}

export {
  GAS_LEVELS,
  estimateGasCost,
  getGasLevel,
  formatGwei,
  isHighGas,
  suggestGasLevel,
};