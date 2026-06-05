// Cache Management Module
const CACHE_PREFIX = 'bwt_cache_';
const DEFAULT_TTL = 5 * 60 * 1000; // 5 minutes

function setCache(key, data, ttl = DEFAULT_TTL) {
  try {
    const item = {
      data,
      expiry: Date.now() + ttl
    };
    localStorage.setItem(CACHE_PREFIX + key, JSON.stringify(item));
  } catch (error) {
    console.warn('Cache set failed:', error);
  }
}

function getCache(key) {
  try {
    const item = localStorage.getItem(CACHE_PREFIX + key);
    if (!item) return null;
    const parsed = JSON.parse(item);
    if (Date.now() > parsed.expiry) {
      localStorage.removeItem(CACHE_PREFIX + key);
      return null;
    }
    return parsed.data;
  } catch {
    return null;
  }
}

function clearCache(key) {
  if (key) {
    localStorage.removeItem(CACHE_PREFIX + key);
  } else {
    Object.keys(localStorage)
      .filter(k => k.startsWith(CACHE_PREFIX))
      .forEach(k => localStorage.removeItem(k));
  }
}

function getCacheSize() {
  let size = 0;
  Object.keys(localStorage)
    .filter(k => k.startsWith(CACHE_PREFIX))
    .forEach(k => {
      size += localStorage.getItem(k)?.length || 0;
    });
  return (size / 1024).toFixed(2) + ' KB';
}

async function cachedFetch(key, fetchFn, ttl = DEFAULT_TTL) {
  const cached = getCache(key);
  if (cached) return cached;
  const data = await fetchFn();
  setCache(key, data, ttl);
  return data;
}