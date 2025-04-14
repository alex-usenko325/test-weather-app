import axios from 'axios';
import { WeatherData } from '../types/Weather';

// Your API key, replace with your actual key
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

// Check for the presence of the API key
if (!API_KEY) {
  console.error("API key not found! Please check your .env settings.");
  throw new Error("API key not found!");
}

// Function to get the coordinates of the city
const getCoordinates = async (city: string) => {
  try {
    const response = await axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`);
    const data = response.data[0];

    if (!data) {
      throw new Error(`Coordinates for city ${city} not found.`);
    }

    return data; // Return the first result
  } catch (error) {
    console.error("Error fetching coordinates:", error);
    throw error; // Throw the error for further handling
  }
};
export const fetchWeather = async (city: string): Promise<WeatherData | null> => {
  try {
    // Get the coordinates of the city
    const coordinates = await getCoordinates(city);
    const { lat, lon } = coordinates;

    // If coordinates are found, make a request for the weather
    if (lat && lon) {
      const weatherResponse = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
        params: {
          lat,
          lon,
          units: 'metric', // Set units to Celsius (°C)
          appid: API_KEY
        }
      });

      // Format and return the weather data
      const weatherData: WeatherData = {
        city: weatherResponse.data.city,
        main: weatherResponse.data.main,
        weather: weatherResponse.data.weather,
        dt: weatherResponse.data.dt
      };

      return weatherData; // Return the weather data as WeatherData
    } else {
      console.error('No coordinates found for the city');
      return null; // Return null if no coordinates are found
    }
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null; // In case of an error, return null
  }
};

