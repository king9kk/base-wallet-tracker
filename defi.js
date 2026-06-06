// DeFi Protocol Integration Module
const DEFI_PROTOCOLS = {
  uniswap: {
    name: 'Uniswap V3',
    router: '0x2626664c2603336E57B271c5C0b26F421741e481',
    icon: '🦄'
  },
  aerodrome: {
    name: 'Aerodrome',
    router: '0xcF77a3Ba9A5CA399B7c97c74d54e5b1Beb874E43',
    icon: '✈️'
  },
  compound: {
    name: 'Compound',
    router: '0x9c4ec768c28032803D9d61d5C60E8A8d3951399C',
    icon: '🏦'
  }
};

async function getDeFiActivity(address) {
  try {
    const txs = await getAccountTransactions(address);
    if (!txs) return [];

    return txs.filter(tx => {
      const to = tx.to?.toLowerCase();
      return Object.values(DEFI_PROTOCOLS).some(p =>
        p.router.toLowerCase() === to
      );
    }).map(tx => {
      const protocol = Object.values(DEFI_PROTOCOLS).find(p =>
        p.router.toLowerCase() === tx.to?.toLowerCase()
      );
      return {
        ...tx,
        protocol: protocol?.name || 'Unknown',
        icon: protocol?.icon || '🔷'
      };
    });
  } catch {
    return [];
  }
}

function renderDeFiActivity(activities) {
  const container = document.querySelector('#defi-container');
  if (!container) return;

  if (activities.length === 0) {
    container.innerHTML = '<p class="no-defi">No DeFi activity found</p>';
    return;
  }

  container.innerHTML = `
    <div class="defi-card card">
      <h3>🏦 DeFi Activity</h3>
      ${activities.slice(0, 5).map(activity => `
        <div class="defi-item">
          <span class="defi-icon">${activity.icon}</span>
          <span class="defi-protocol">${activity.protocol}</span>
          <span class="defi-value">${formatEth(activity.value)} ETH</span>
          <span class="defi-date">${timeAgo(activity.timeStamp)}</span>
        </div>
      `).join('')}
    </div>
  `;
}

async function loadDeFiActivity(address) {
  const activities = await getDeFiActivity(address);
  renderDeFiActivity(activities);
}