import { useState, useEffect } from 'react';
import WeatherForm from '../../components/WeatherForm/WeatherForm';
import WeatherCard from '../../components/WeatherCard/WeatherCard';
import ErrorAlert from '../../components/ErrorAlert/ErrorAlert';
import { fetchWeather } from '../../api/fetchWeather';
import { WeatherData } from '../../types/Weather';
import { getCached, setCached } from '../../utils/cached';

import { Container, Paper, Typography, Box } from '@mui/material';

const WeatherPage: React.FC = () => {
  const [city, setCity] = useState<string>('');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const fetchWeatherData = async (city: string) => {
    setLoading(true); 
    setError('');
    setWeatherData(null); 

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
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#f5f5f5',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 2,
      }}
    >
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ padding: 4, borderRadius: 3 }}>
          <Typography variant="h4" align="center" color="primary" gutterBottom
    sx={{
    fontWeight: 600, 
    fontSize: '3rem',
  }}
>
            Weather App
          </Typography>

          <WeatherForm onCitySubmit={handleCitySubmit} setLoading={setLoading} />

          {error && <ErrorAlert message={error} />}

          <WeatherCard weatherData={weatherData} isLoading={loading} />
        </Paper>
      </Container>
    </Box>
  );
};

export default WeatherPage;
