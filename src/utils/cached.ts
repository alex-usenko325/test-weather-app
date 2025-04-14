import { WeatherData } from "../types/Weather";

const CACHE_KEY = 'weatherCache';

// Get data from cached storage (with type checking)
export const getCached = (city: string): WeatherData | null => {
  const cachedData = localStorage.getItem(CACHE_KEY);
  if (cachedData) {
    const parsedData = JSON.parse(cachedData);
    const cacheTimestamp = parsedData.timestamp;

    // Return cached data if it's less than 5 minutes old
    if (Date.now() - cacheTimestamp < 5 * 60 * 1000) {
      return parsedData[city] || null;
    }
  }
  return null;
};

// Set data to cached storage
export const setCached = (city: string, data: WeatherData) => {
  const cachedData = localStorage.getItem(CACHE_KEY);
  const newCache = cachedData ? JSON.parse(cachedData) : {};

  newCache[city] = data;
  newCache.timestamp = Date.now();

  localStorage.setItem(CACHE_KEY, JSON.stringify(newCache));
};
