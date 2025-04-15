import { WeatherData } from "../types/Weather";

const CACHE_KEY = 'weatherCache';

// Get data from cached storage (with type checking)
export const getCached = (city: string): WeatherData | null => {
  const cachedData = localStorage.getItem(CACHE_KEY);
  if (cachedData) {
    const parsedData: { [key: string]: { data: WeatherData, timestamp: number } } = JSON.parse(cachedData);
    const cityCache = parsedData[city];

    // Return cached data if it's less than 5 minutes old
    if (cityCache && Date.now() - cityCache.timestamp < 5 * 60 * 1000) {
      return cityCache.data;
    }
  }
  return null;
};

// Set data to cached storage
export const setCached = (city: string, data: WeatherData) => {
  const cachedData = localStorage.getItem(CACHE_KEY);
  const newCache = cachedData ? JSON.parse(cachedData) : {};

  // Save city-specific data along with timestamp
  newCache[city] = {
    data,
    timestamp: Date.now(),
  };

  localStorage.setItem(CACHE_KEY, JSON.stringify(newCache));
};
