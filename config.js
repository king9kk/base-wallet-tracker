// App Configuration Module
const APP_CONFIG = {
  version: '1.0.0',
  name: 'Base Wallet Tracker',
  description: 'Track your Base network wallet',
  author: 'king9kk',
  github: 'https://github.com/king9kk/base-wallet-tracker',

  network: {
    name: 'Base Mainnet',
    chainId: 8453,
    rpc: 'https://mainnet.base.org',
    explorer: 'https://basescan.org',
    symbol: 'ETH',
    decimals: 18
  },

  api: {
    basescan: 'https://api.basescan.org/api',
    coingecko: 'https://api.coingecko.com/api/v3',
    refreshInterval: 30000,
    cacheTimeout: 300000
  },

  ui: {
    defaultTheme: 'dark',
    defaultLanguage: 'en',
    defaultCurrency: 'USD',
    maxHistoryItems: 10,
    maxWatchlistItems: 20,
    itemsPerPage: 10
  },

  features: {
    darkMode: true,
    multiChain: true,
    nftViewer: true,
    defiTracker: true,
    bridgeTracker: true,
    stakingTracker: true,
    gasTracker: true,
    priceTracker: true,
    exportData: true,
    pwa: true
  }
};

function getConfig(path) {
  return path.split('.').reduce((obj, key) => obj?.[key], APP_CONFIG);
}

function isFeatureEnabled(feature) {
  return APP_CONFIG.features[feature] === true;
}

function getNetworkExplorerUrl(type, value) {
  const base = APP_CONFIG.network.explorer;
  const urls = {
    tx: `${base}/tx/${value}`,
    address: `${base}/address/${value}`,
    token: `${base}/token/${value}`,
    block: `${base}/block/${value}`
  };
  return urls[type] || base;
}

console.log(`${APP_CONFIG.name} v${APP_CONFIG.version} initialized`);