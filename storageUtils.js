// Local Storage Utilities
const STORAGE_KEYS = {
  WALLET: "crypto_wallet",
  SETTINGS: "crypto_settings",
  ALERTS: "crypto_alerts",
  FAVORITES: "crypto_favorites",
  THEME: "crypto_theme",
  NETWORK: "crypto_network",
  NOTIFICATIONS: "crypto_notifications",
};

function saveToStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (err) {
    console.error("Storage save error:", err);
    return false;
  }
}

function loadFromStorage(key, defaultValue = null) {
  try {
    const item = localStorage.getItem(key);
    if (!item) return defaultValue;
    return JSON.parse(item);
  } catch (err) {
    console.error("Storage load error:", err);
    return defaultValue;
  }
}

function removeFromStorage(key) {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (err) {
    console.error("Storage remove error:", err);
    return false;
  }
}

function clearAllStorage() {
  try {
    Object.values(STORAGE_KEYS).forEach((key) => {
      localStorage.removeItem(key);
    });
    return true;
  } catch (err) {
    console.error("Storage clear error:", err);
    return false;
  }
}

function saveWallet(walletData) {
  return saveToStorage(STORAGE_KEYS.WALLET, walletData);
}

function loadWallet() {
  return loadFromStorage(STORAGE_KEYS.WALLET, null);
}

function saveSettings(settings) {
  return saveToStorage(STORAGE_KEYS.SETTINGS, settings);
}

function loadSettings() {
  return loadFromStorage(STORAGE_KEYS.SETTINGS, {
    currency: "USD",
    language: "en",
    notifications: true,
  });
}

function saveTheme(theme) {
  return saveToStorage(STORAGE_KEYS.THEME, theme);
}

function loadTheme() {
  return loadFromStorage(STORAGE_KEYS.THEME, "dark");
}

export {
  STORAGE_KEYS,
  saveToStorage,
  loadFromStorage,
  removeFromStorage,
  clearAllStorage,
  saveWallet,
  loadWallet,
  saveSettings,
  loadSettings,
  saveTheme,
  loadTheme,
};