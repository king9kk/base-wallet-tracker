// Bridge Transaction Module
const BRIDGE_CONTRACTS = {
  base: {
    name: 'Base Official Bridge',
    contract: '0x49048044D57e1C92A77f79988d21Fa8fAF74E97f',
    icon: '🌉',
    url: 'https://bridge.base.org'
  },
  stargate: {
    name: 'Stargate Finance',
    contract: '0x45f1a95a4d3f3836523F5c83673c797f4d4d263B',
    icon: '⭐',
    url: 'https://stargate.finance'
  },
  hop: {
    name: 'Hop Protocol',
    contract: '0xb3C68a491608952Cb1257FC9909a537a0173b63B',
    icon: '🐇',
    url: 'https://hop.exchange'
  }
};

async function getBridgeTransactions(address) {
  try {
    const txs = await getAccountTransactions(address);
    if (!txs) return [];

    return txs.filter(tx => {
      const to = tx.to?.toLowerCase();
      return Object.values(BRIDGE_CONTRACTS).some(b =>
        b.contract.toLowerCase() === to
      );
    }).map(tx => {
      const bridge = Object.values(BRIDGE_CONTRACTS).find(b =>
        b.contract.toLowerCase() === tx.to?.toLowerCase()
      );
      return {
        ...tx,
        bridge: bridge?.name || 'Unknown Bridge',
        icon: bridge?.icon || '🌉',
        url: bridge?.url
      };
    });
  } catch {
    return [];
  }
}

function renderBridgeActivity(bridges) {
  const container = document.querySelector('#bridge-container');
  if (!container) return;

  container.innerHTML = `
    <div class="bridge-card card">
      <h3>🌉 Bridge Activity</h3>
      <div class="bridge-protocols">
        ${Object.values(BRIDGE_CONTRACTS).map(b => `
          <a href="${b.url}" target="_blank" class="bridge-link">
            <span>${b.icon}</span>
            <span>${b.name}</span>
          </a>
        `).join('')}
      </div>
      ${bridges.length > 0 ? `
        <h4>Recent Bridges</h4>
        ${bridges.slice(0, 5).map(b => `
          <div class="bridge-item">
            <span>${b.icon} ${b.bridge}</span>
            <span>${formatEth(b.value)} ETH</span>
            <span>${timeAgo(b.timeStamp)}</span>
          </div>
        `).join('')}
      ` : '<p class="no-bridge">No bridge transactions found</p>'}
    </div>
  `;
}

async function loadBridgeActivity(address) {
  const bridges = await getBridgeTransactions(address);
  renderBridgeActivity(bridges);
}