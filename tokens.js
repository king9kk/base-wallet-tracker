// Token List Module
const BASE_TOKENS = [
  { symbol: 'ETH', name: 'Ethereum', address: 'native', decimals: 18 },
  { symbol: 'USDC', name: 'USD Coin', address: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913', decimals: 6 },
  { symbol: 'DAI', name: 'Dai Stablecoin', address: '0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb', decimals: 18 },
  { symbol: 'WETH', name: 'Wrapped Ether', address: '0x4200000000000000000000000000000000000006', decimals: 18 }
];

async function getTokenBalance(walletAddress, tokenAddress) {
  try {
    const response = await fetch(
      `https://api.basescan.org/api?module=account&action=tokenbalance&contractaddress=${tokenAddress}&address=${walletAddress}&tag=latest`
    );
    const data = await response.json();
    return data.result || '0';
  } catch {
    return '0';
  }
}

async function loadAllTokens(walletAddress) {
  const container = document.querySelector('#token-list');
  if (!container) return;

  container.innerHTML = '<p>Loading tokens...</p>';

  const tokenData = await Promise.all(
    BASE_TOKENS.filter(t => t.address !== 'native').map(async token => {
      const balance = await getTokenBalance(walletAddress, token.address);
      return {
        ...token,
        balance: (parseInt(balance) / Math.pow(10, token.decimals)).toFixed(4)
      };
    })
  );

  container.innerHTML = tokenData.map(token => `
    <div class="token-row card">
      <div class="token-symbol">${token.symbol}</div>
      <div class="token-name">${token.name}</div>
      <div class="token-balance">${token.balance}</div>
    </div>
  `).join('');
}