// utils/cache.js
const LOCAL_STORAGE_KEY = 'food_explorer_cache';

export function getLocalCache() {
  try {
    const cached = localStorage.getItem(LOCAL_STORAGE_KEY);
    return cached ? JSON.parse(cached) : {};
  } catch {
    return {};
  }
}

export function setLocalCache(key, data) {
  try {
    const cache = getLocalCache();
    cache[key] = {
      data,
      timestamp: Date.now()
    };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cache));
  } catch (error) {
    console.error('Failed to cache data:', error);
  }
}

export function getFromLocalCache(key, maxAge = 30 * 60 * 1000) {
  const cache = getLocalCache();
  const cached = cache[key];
  
  if (cached && Date.now() - cached.timestamp < maxAge) {
    return cached.data;
  }
  
  return null;
}