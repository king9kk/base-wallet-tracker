// Achievement Badges Module
const BADGES = [
  {
    id: 'first_connect',
    name: 'First Connection',
    icon: '🔗',
    description: 'Connected wallet for the first time',
    condition: (stats) => stats.totalConnections >= 1
  },
  {
    id: 'whale',
    name: 'Whale',
    icon: '🐋',
    description: 'Wallet balance over 10 ETH',
    condition: (stats) => stats.balance >= 10
  },
  {
    id: 'active_trader',
    name: 'Active Trader',
    icon: '📈',
    description: 'Made over 50 transactions',
    condition: (stats) => stats.txCount >= 50
  },
  {
    id: 'nft_collector',
    name: 'NFT Collector',
    icon: '🎨',
    description: 'Owns 5 or more NFT collections',
    condition: (stats) => stats.nftCount >= 5
  },
  {
    id: 'defi_user',
    name: 'DeFi User',
    icon: '🏦',
    description: 'Interacted with DeFi protocols',
    condition: (stats) => stats.defiTxCount >= 1
  },
  {
    id: 'base_og',
    name: 'Base OG',
    icon: '⬡',
    description: 'Early Base network adopter',
    condition: (stats) => stats.firstTxBlock < 5000000
  }
];

function getEarnedBadges(stats) {
  return BADGES.filter(badge => {
    try { return badge.condition(stats); }
    catch { return false; }
  });
}

function renderBadges(stats) {
  const container = document.querySelector('#badges-container');
  if (!container) return;

  const earned = getEarnedBadges(stats);

  container.innerHTML = `
    <div class="card">
      <h3>🏅 Achievements (${earned.length}/${BADGES.length})</h3>
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:12px;margin-top:16px">
        ${BADGES.map(badge => {
          const isEarned = earned.find(b => b.id === badge.id);
          return `
            <div style="background:var(--bg);border-radius:12px;padding:16px;
              text-align:center;opacity:${isEarned ? '1' : '0.4'};
              border:1px solid ${isEarned ? '#0052ff' : 'var(--border)'}">
              <div style="font-size:32px;margin-bottom:8px">${badge.icon}</div>
              <div style="font-weight:bold;font-size:13px">${badge.name}</div>
              <div style="color:#888;font-size:11px;margin-top:4px">
                ${badge.description}
              </div>
              ${isEarned ? '<div style="color:#00c853;font-size:11px;margin-top:6px">✅ Earned</div>' : ''}
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}