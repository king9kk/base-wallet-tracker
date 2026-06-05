// Network Configuration
const NETWORKS = {
  ethereum: {
    chainId: 1,
    name: "Ethereum Mainnet",
    symbol: "ETH",
    decimals: 18,
    rpcUrl: "https://mainnet.infura.io/v3/",
    explorerUrl: "https://etherscan.io",
    color: "#627EEA",
  },
  polygon: {
    chainId: 137,
    name: "Polygon Mainnet",
    symbol: "MATIC",
    decimals: 18,
    rpcUrl: "https://polygon-rpc.com",
    explorerUrl: "https://polygonscan.com",
    color: "#8247E5",
  },
  bsc: {
    chainId: 56,
    name: "BNB Smart Chain",
    symbol: "BNB",
    decimals: 18,
    rpcUrl: "https://bsc-dataseed.binance.org",
    explorerUrl: "https://bscscan.com",
    color: "#F3BA2F",
  },
  arbitrum: {
    chainId: 42161,
    name: "Arbitrum One",
    symbol: "ETH",
    decimals: 18,
    rpcUrl: "https://arb1.arbitrum.io/rpc",
    explorerUrl: "https://arbiscan.io",
    color: "#28A0F0",
  },
};

function getNetworkByChainId(chainId) {
  return Object.values(NETWORKS).find((n) => n.chainId === chainId) || null;
}

function getExplorerTxUrl(network, txHash) {
  const net = NETWORKS[network];
  if (!net) return "#";
  return `${net.explorerUrl}/tx/${txHash}`;
}

function getExplorerAddressUrl(network, address) {
  const net = NETWORKS[network];
  if (!net) return "#";
  return `${net.explorerUrl}/address/${address}`;
}

function isSupportedNetwork(chainId) {
  return Object.values(NETWORKS).some((n) => n.chainId === chainId);
}

export {
  NETWORKS,
  getNetworkByChainId,
  getExplorerTxUrl,
  getExplorerAddressUrl,
  isSupportedNetwork,
};