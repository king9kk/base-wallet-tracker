// General Helper Functions
function debounce(func, delay = 300) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), delay);
  };
}

function throttle(func, limit = 1000) {
  let lastCall = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      return func.apply(this, args);
    }
  };
}

function copyToClipboard(text) {
  if (navigator.clipboard) {
    return navigator.clipboard.writeText(text);
  }
  const el = document.createElement("textarea");
  el.value = text;
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
  return Promise.resolve();
}

function truncateText(text, maxLength = 30) {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}

function capitalizeFirst(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function randomId(length = 8) {
  return Math.random().toString(36).substring(2, 2 + length);
}

function isEmptyObject(obj) {
  return obj && Object.keys(obj).length === 0;
}

function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function formatDate(timestamp, locale = "en-US") {
  return new Date(timestamp).toLocaleDateString(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function formatNumber(num, decimals = 2) {
  if (isNaN(num)) return "0";
  return parseFloat(num).toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export {
  debounce,
  throttle,
  copyToClipboard,
  truncateText,
  capitalizeFirst,
  sleep,
  randomId,
  isEmptyObject,
  deepClone,
  formatDate,
  formatNumber,
};