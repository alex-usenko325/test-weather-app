import { useState, useEffect } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

import WeatherForm from '../components/WeatherForm/WeatherForm';
import WeatherCard from '../components/WeatherCard/WeatherCard';
import ErrorAlert from '../components/ErrorAlert';

import { fetchWeather } from '../api/fetchWeather';
import { WeatherData } from '../types/Weather';
import { getCached, setCached } from '../utils/cached';

const WeatherPage: React.FC = () => {
  const [city, setCity] = useState<string>('');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const fetchWeatherData = async (city: string) => {
    setLoading(true);
    setError('');

    const cachedData = getCached(city);
    if (cachedData) {
      setWeatherData(cachedData);
      setLoading(false);
      return;
    }

    try {
      const data = await fetchWeather(city);
      if (data) {
        setWeatherData(data);
        setCached(city, data);
      } else {
        setError('No data returned from the API');
      }
    } catch {
      setError('City not found or API error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (city) {
      fetchWeatherData(city);
    }
  }, [city]);

  const handleCitySubmit = (city: string) => {
    setCity(city);
  };

  return (
    <div>
      <WeatherForm onCitySubmit={handleCitySubmit} />

      {loading && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
          <ClipLoader color="#4caf50" size={60} />
        </div>
      )}

      {error && <ErrorAlert message={error} />}
      {weatherData && <WeatherCard weatherData={weatherData} />}
    </div>
  );
};

export default WeatherPage;
