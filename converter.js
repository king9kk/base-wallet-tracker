// Currency Converter Module
const SUPPORTED_CURRENCIES = {
  USD: { symbol: '$', name: 'US Dollar' },
  EUR: { symbol: '€', name: 'Euro' },
  GBP: { symbol: '£', name: 'British Pound' },
  BDT: { symbol: '৳', name: 'Bangladeshi Taka' },
  JPY: { symbol: '¥', name: 'Japanese Yen' },
  KRW: { symbol: '₩', name: 'Korean Won' }
};

let exchangeRates = {};

async function fetchExchangeRates(baseCurrency = 'USD') {
  try {
    const cached = getCache(`rates_${baseCurrency}`);
    if (cached) {
      exchangeRates = cached;
      return cached;
    }

    const response = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=${
        Object.keys(SUPPORTED_CURRENCIES).join(',').toLowerCase()
      }`
    );
    const data = await response.json();
    const rates = data.ethereum;
    setCache(`rates_${baseCurrency}`, rates, 300000);
    exchangeRates = rates;
    return rates;
  } catch {
    return {};
  }
}

function convertEthTo(ethAmount, currency) {
  const rate = exchangeRates[currency.toLowerCase()];
  if (!rate) return 0;
  return (parseFloat(ethAmount) * rate).toFixed(2);
}

function renderConverter() {
  const container = document.querySelector('#converter-container');
  if (!container) return;

  container.innerHTML = `
    <div class="converter-card card">
      <h3>💱 ETH Converter</h3>
      <div class="converter-input">
        <input type="number" id="eth-amount" 
          placeholder="0.00" step="0.001" min="0"
          class="profile-input" oninput="updateConversions()">
        <span class="converter-symbol">ETH</span>
      </div>
      <div id="conversion-results" class="conversion-results">
        ${Object.entries(SUPPORTED_CURRENCIES).map(([code, info]) => `
          <div class="conversion-row">
            <span>${info.symbol} ${code}</span>
            <span id="rate-${code}">—</span>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

async function updateConversions() {
  const amount = document.querySelector('#eth-amount')?.value || 0;
  await fetchExchangeRates();

  Object.keys(SUPPORTED_CURRENCIES).forEach(currency => {
    const el = document.querySelector(`#rate-${currency}`);
    if (el) {
      const converted = convertEthTo(amount, currency);
      el.textContent = converted > 0
        ? `${SUPPORTED_CURRENCIES[currency].symbol}${parseFloat(converted).toLocaleString()}`
        : '—';
    }
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  renderConverter();
  await fetchExchangeRates();
});