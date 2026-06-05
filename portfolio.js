// Portfolio Dashboard Module
let portfolioData = {
  totalValue: 0,
  tokens: [],
  lastUpdated: null
};

async function loadPortfolio(address) {
  try {
    showLoading('portfolio-container');
    const balance = await getWalletBalance(address);
    const ethPrice = await getEthPrice();
    
    portfolioData = {
      totalValue: (parseFloat(balance) * ethPrice).toFixed(2),
      tokens: [
        { symbol: 'ETH', balance: balance, price: ethPrice }
      ],
      lastUpdated: new Date().toLocaleTimeString()
    };
    renderPortfolio();
  } catch (error) {
    showError('Failed to load portfolio');
  }
}

async function getEthPrice() {
  try {
    const response = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd'
    );
    const data = await response.json();
    return data.ethereum.usd;
  } catch {
    return 0;
  }
}

function renderPortfolio() {
  const container = document.querySelector('#portfolio-container');
  if (!container) return;
  container.innerHTML = `
    <div class="portfolio-card card">
      <h3>Portfolio Value</h3>
      <div class="total-value">$${portfolioData.totalValue}</div>
      <div class="token-list">
        ${portfolioData.tokens.map(token => `
          <div class="token-item">
            <span>${token.symbol}</span>
            <span>${token.balance}</span>
            <span>$${(parseFloat(token.balance) * token.price).toFixed(2)}</span>
          </div>
        `).join('')}
      </div>
      <small>Last updated: ${portfolioData.lastUpdated}</small>
    </div>
  `;
}