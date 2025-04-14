export interface WeatherData {
  // The name of the city (for example)
  city: string;

  // Main weather information such as temperature
  main: {
    // Temperature in degrees (usually in Kelvin, Celsius, or Fahrenheit)
    temp: number;
  };

  // Array of weather conditions (e.g., description, icon)
  weather: {
    // Weather description (e.g., "clear sky", "rainy")
    description: string;

    // Icon representing the weather condition (URL or code for the icon)
    icon: string;
  }[];

  // Timestamp of the data (Unix timestamp in seconds)
  dt: number;
}
