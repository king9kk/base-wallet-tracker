// Price Tracker Module
const PRICE_CACHE = {};
const CACHE_DURATION = 60000;

async function getTokenPrice(tokenId) {
  const now = Date.now();
  if (PRICE_CACHE[tokenId] && 
      now - PRICE_CACHE[tokenId].timestamp < CACHE_DURATION) {
    return PRICE_CACHE[tokenId].price;
  }

  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${tokenId}&vs_currencies=usd&include_24hr_change=true`
    );
    const data = await response.json();
    const price = data[tokenId]?.usd || 0;
    const change = data[tokenId]?.usd_24h_change || 0;

    PRICE_CACHE[tokenId] = { price, change, timestamp: now };
    return price;
  } catch {
    return 0;
  }
}

async function renderPriceTracker() {
  const container = document.querySelector('#price-container');
  if (!container) return;

  const tokens = [
    { id: 'ethereum', symbol: 'ETH' },
    { id: 'usd-coin', symbol: 'USDC' },
    { id: 'dai', symbol: 'DAI' }
  ];

  const prices = await Promise.all(
    tokens.map(async token => {
      const cached = PRICE_CACHE[token.id];
      await getTokenPrice(token.id);
      return {
        ...token,
        price: PRICE_CACHE[token.id]?.price || 0,
        change: PRICE_CACHE[token.id]?.change || 0
      };
    })
  );

  container.innerHTML = `
    <div class="price-card card">
      <h3>📈 Token Prices</h3>
      ${prices.map(token => `
        <div class="price-row">
          <span class="price-symbol">${token.symbol}</span>
          <span class="price-value">$${token.price.toLocaleString()}</span>
          <span class="price-change ${token.change >= 0 ? 'positive' : 'negative'}">
            ${token.change >= 0 ? '▲' : '▼'} ${Math.abs(token.change).toFixed(2)}%
          </span>
        </div>
      `).join('')}
    </div>
  `;
}

document.addEventListener('DOMContentLoaded', () => {
  renderPriceTracker();
  setInterval(renderPriceTracker, 60000);
});