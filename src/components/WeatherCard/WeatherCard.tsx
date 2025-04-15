import { Card, CardContent, Typography, CardMedia, Box, Skeleton } from '@mui/material';
import { WeatherData } from '../../types/Weather';

interface WeatherCardProps {
  weatherData: WeatherData | null;
  isLoading: boolean;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weatherData, isLoading }) => {

  if (isLoading) {
    return (
      <Card
        sx={{
          maxWidth: 400,
          margin: '20px auto',
          borderRadius: 3,
          boxShadow: 5,
          backgroundColor: '#f9f9f9',
          minHeight: '300px',
        }}
      >
        <CardContent>
          <Skeleton variant="text" height={40} width="60%" sx={{ mb: 2 }} />
          <Skeleton variant="circular" width={100} height={100} sx={{ mx: 'auto', my: 2 }} />
          <Skeleton variant="text" height={30} width="40%" sx={{ mx: 'auto' }} />
          <Skeleton variant="text" height={20} width="70%" sx={{ mx: 'auto' }} />
          <Skeleton variant="text" height={15} width="50%" sx={{ mx: 'auto', mt: 1 }} />
        </CardContent>
      </Card>
    );
  }


  if (weatherData) {
    const { city, main, weather, dt } = weatherData;
    const lastUpdated = new Date(dt * 1000).toLocaleTimeString();

    return (
      <Card
        sx={{
          maxWidth: 400,
          margin: '20px auto',
          borderRadius: 3,
          boxShadow: 5,
          backgroundColor: '#f9f9f9',
        }}
      >
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom align="center">
            {city}
          </Typography>

          <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" mb={2}>
            <CardMedia
              component="img"
              sx={{ width: 100, height: 100 }}
              image={`http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
              alt={weather[0].description}
            />
            <Typography variant="h6" component="div">
              {main.temp}°C
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {weather[0].description}
            </Typography>
          </Box>

          <Typography variant="caption" display="block" align="center" color="text.secondary">
            Last updated: {lastUpdated}
          </Typography>
        </CardContent>
      </Card>
    );
  }
  return null;
};

export default WeatherCard;
