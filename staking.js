// Staking Module
const STAKING_CONTRACTS = {
  rocketPool: {
    name: 'Rocket Pool',
    contract: '0xae78736Cd615f374D3085123A210448E74Fc6393',
    icon: '🚀',
    apy: '3.5%'
  },
  lido: {
    name: 'Lido',
    contract: '0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84',
    icon: '🌊',
    apy: '3.8%'
  },
  coinbase: {
    name: 'Coinbase ETH',
    contract: '0xBe9895146f7AF43049ca1c1AE358B0541Ea49704',
    icon: '🔵',
    apy: '3.2%'
  }
};

async function getStakingPositions(address) {
  try {
    const txs = await getAccountTransactions(address);
    if (!txs) return [];

    return txs.filter(tx => {
      const to = tx.to?.toLowerCase();
      return Object.values(STAKING_CONTRACTS).some(s =>
        s.contract.toLowerCase() === to
      );
    }).map(tx => {
      const staking = Object.values(STAKING_CONTRACTS).find(s =>
        s.contract.toLowerCase() === tx.to?.toLowerCase()
      );
      return {
        ...tx,
        protocol: staking?.name || 'Unknown',
        icon: staking?.icon || '💎',
        apy: staking?.apy || 'N/A'
      };
    });
  } catch {
    return [];
  }
}

function renderStaking(positions) {
  const container = document.querySelector('#staking-container');
  if (!container) return;

  container.innerHTML = `
    <div class="staking-card card">
      <h3>💎 Staking Protocols</h3>
      <div class="protocol-list">
        ${Object.values(STAKING_CONTRACTS).map(protocol => `
          <div class="protocol-item">
            <span class="protocol-icon">${protocol.icon}</span>
            <span class="protocol-name">${protocol.name}</span>
            <span class="protocol-apy green">APY: ${protocol.apy}</span>
          </div>
        `).join('')}
      </div>
      ${positions.length > 0 ? `
        <h4>Your Positions</h4>
        ${positions.slice(0, 3).map(pos => `
          <div class="position-item">
            <span>${pos.icon} ${pos.protocol}</span>
            <span>${formatEth(pos.value)} ETH</span>
            <span>${timeAgo(pos.timeStamp)}</span>
          </div>
        `).join('')}
      ` : '<p class="no-stake">No staking positions found</p>'}
    </div>
  `;
}

async function loadStaking(address) {
  const positions = await getStakingPositions(address);
  renderStaking(positions);
}