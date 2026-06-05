// Network & Chain Configuration
const NETWORKS = {
  base: {
    chainId: '0x2105',
    chainName: 'Base Mainnet',
    nativeCurrency: {
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18
    },
    rpcUrls: ['https://mainnet.base.org'],
    blockExplorerUrls: ['https://basescan.org']
  },
  baseGoerli: {
    chainId: '0x14A33',
    chainName: 'Base Goerli Testnet',
    nativeCurrency: {
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18
    },
    rpcUrls: ['https://goerli.base.org'],
    blockExplorerUrls: ['https://goerli.basescan.org']
  }
};

async function switchToBase() {
  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: NETWORKS.base.chainId }]
    });
    showSuccess('Switched to Base Mainnet!');
  } catch (error) {
    if (error.code === 4902) {
      await addBaseNetwork();
    }
  }
}

async function addBaseNetwork() {
  try {
    await window.ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [NETWORKS.base]
    });
    showSuccess('Base network added!');
  } catch (error) {
    showError('Failed to add Base network');
  }
}

async function getCurrentNetwork() {
  const chainId = await window.ethereum.request({
    method: 'eth_chainId'
  });
  return chainId;
}