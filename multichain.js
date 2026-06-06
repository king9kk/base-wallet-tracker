// Multi-Chain Support Module
const CHAINS = {
  base: {
    id: 8453,
    name: 'Base Mainnet',
    icon: '🔵',
    rpc: 'https://mainnet.base.org',
    explorer: 'https://basescan.org',
    symbol: 'ETH',
    color: '#0052ff'
  },
  ethereum: {
    id: 1,
    name: 'Ethereum',
    icon: '⟠',
    rpc: 'https://eth.llamarpc.com',
    explorer: 'https://etherscan.io',
    symbol: 'ETH',
    color: '#627eea'
  },
  optimism: {
    id: 10,
    name: 'Optimism',
    icon: '🔴',
    rpc: 'https://mainnet.optimism.io',
    explorer: 'https://optimistic.etherscan.io',
    symbol: 'ETH',
    color: '#ff0420'
  },
  arbitrum: {
    id: 42161,
    name: 'Arbitrum',
    icon: '🔷',
    rpc: 'https://arb1.arbitrum.io/rpc',
    explorer: 'https://arbiscan.io',
    symbol: 'ETH',
    color: '#28a0f0'
  }
};

let activeChain = CHAINS.base;

function switchChain(chainId) {
  const chain = Object.values(CHAINS).find(c => c.id === chainId);
  if (!chain) return;
  activeChain = chain;
  updateChainUI();
  showSuccess(`Switched to ${chain.name}!`);
}

function updateChainUI() {
  const indicator = document.querySelector('#chain-indicator');
  if (indicator) {
    indicator.innerHTML = `
      <span>${activeChain.icon}</span>
      <span>${activeChain.name}</span>
    `;
    indicator.style.borderColor = activeChain.color;
  }
}

function renderChainSelector() {
  const container = document.querySelector('#chain-selector');
  if (!container) return;

  container.innerHTML = `
    <div class="chain-card card">
      <h3>🌐 Networks</h3>
      <div class="chain-grid">
        ${Object.values(CHAINS).map(chain => `
          <div class="chain-item ${chain.id === activeChain.id ? 'active' : ''}"
            onclick="switchChain(${chain.id})"
            style="border-color: ${chain.id === activeChain.id ? chain.color : 'transparent'}">
            <span class="chain-icon">${chain.icon}</span>
            <span class="chain-name">${chain.name}</span>
            <span class="chain-symbol">${chain.symbol}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

document.addEventListener('DOMContentLoaded', () => {
  renderChainSelector();
  updateChainUI();
});