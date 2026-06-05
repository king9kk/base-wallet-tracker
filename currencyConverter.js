// Currency Converter Utilities
const FIAT_CURRENCIES = {
  USD: { symbol: "$", name: "US Dollar", locale: "en-US" },
  EUR: { symbol: "€", name: "Euro", locale: "de-DE" },
  GBP: { symbol: "£", name: "British Pound", locale: "en-GB" },
  JPY: { symbol: "¥", name: "Japanese Yen", locale: "ja-JP" },
  BDT: { symbol: "৳", name: "Bangladeshi Taka", locale: "bn-BD" },
  INR: { symbol: "₹", name: "Indian Rupee", locale: "hi-IN" },
  CAD: { symbol: "CA$", name: "Canadian Dollar", locale: "en-CA" },
  AUD: { symbol: "A$", name: "Australian Dollar", locale: "en-AU" },
};

function convertCryptoToFiat(cryptoAmount, priceInUSD, usdToFiatRate = 1) {
  const usdValue = parseFloat(cryptoAmount) * parseFloat(priceInUSD);
  return (usdValue * usdToFiatRate).toFixed(2);
}

function convertFiatToCrypto(fiatAmount, priceInUSD, usdToFiatRate = 1) {
  const usdAmount = parseFloat(fiatAmount) / usdToFiatRate;
  return (usdAmount / parseFloat(priceInUSD)).toFixed(8);
}

function formatFiatAmount(amount, currencyCode = "USD") {
  const currency = FIAT_CURRENCIES[currencyCode];
  if (!currency) return `${amount}`;

  return new Intl.NumberFormat(currency.locale, {
    style: "currency",
    currency: currencyCode,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

function getCurrencySymbol(currencyCode) {
  return FIAT_CURRENCIES[currencyCode]?.symbol || currencyCode;
}

function getSupportedCurrencies() {
  return Object.keys(FIAT_CURRENCIES).map((code) => ({
    code,
    ...FIAT_CURRENCIES[code],
  }));
}

function calcExchangeRate(fromRate, toRate) {
  if (!fromRate || fromRate === 0) return 0;
  return (toRate / fromRate).toFixed(6);
}

export {
  FIAT_CURRENCIES,
  convertCryptoToFiat,
  convertFiatToCrypto,
  formatFiatAmount,
  getCurrencySymbol,
  getSupportedCurrencies,
  calcExchangeRate,
};