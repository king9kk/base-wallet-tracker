// Swap & DEX Utilities
const SLIPPAGE_PRESETS = [0.1, 0.5, 1.0, 3.0];

const DEX_LIST = {
  uniswap: {
    name: "Uniswap V3",
    url: "https://app.uniswap.org",
    fee: 0.3,
    network: "ethereum",
  },
  pancakeswap: {
    name: "PancakeSwap",
    url: "https://pancakeswap.finance",
    fee: 0.25,
    network: "bsc",
  },
  quickswap: {
    name: "QuickSwap",
    url: "https://quickswap.exchange",
    fee: 0.3,
    network: "polygon",
  },
  sushiswap: {
    name: "SushiSwap",
    url: "https://www.sushi.com",
    fee: 0.3,
    network: "ethereum",
  },
};

function calcMinReceived(amount, slippage) {
  const slippageFactor = 1 - slippage / 100;
  return (parseFloat(amount) * slippageFactor).toFixed(6);
}

function calcPriceImpact(inputUSD, outputUSD) {
  if (!inputUSD || inputUSD === 0) return 0;
  const impact = ((inputUSD - outputUSD) / inputUSD) * 100;
  return Math.abs(impact).toFixed(2);
}

function calcSwapFee(amount, feePercent) {
  return (parseFloat(amount) * (feePercent / 100)).toFixed(6);
}

function isPriceImpactHigh(impact, threshold = 3) {
  return parseFloat(impact) > threshold;
}

function getExchangeRate(fromAmount, toAmount) {
  if (!fromAmount || fromAmount === 0) return 0;
  return (parseFloat(toAmount) / parseFloat(fromAmount)).toFixed(6);
}

function formatSwapRoute(tokens) {
  if (!tokens || tokens.length === 0) return "";
  return tokens.join(" → ");
}

function getDexByNetwork(network) {
  return Object.values(DEX_LIST).filter(
    (dex) => dex.network === network.toLowerCase()
  );
}

function validateSwapInput(fromAmount, fromBalance) {
  if (!fromAmount || parseFloat(fromAmount) <= 0) {
    return { valid: false, error: "Enter a valid amount" };
  }
  if (parseFloat(fromAmount) > parseFloat(fromBalance)) {
    return { valid: false, error: "Insufficient balance" };
  }
  return { valid: true, error: null };
}

export {
  SLIPPAGE_PRESETS,
  DEX_LIST,
  calcMinReceived,
  calcPriceImpact,
  calcSwapFee,
  isPriceImpactHigh,
  getExchangeRate,
  formatSwapRoute,
  getDexByNetwork,
  validateSwapInput,
};