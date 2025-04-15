import { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';

interface WeatherFormProps {
  onCitySubmit: (city: string) => void;
  setLoading: (loading: boolean) => void;
}

const WeatherForm: React.FC<WeatherFormProps> = ({ onCitySubmit, setLoading }) => {
  const [city, setCity] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    onCitySubmit(city.trim());
  };

  return (
    <Box 
      component="form" 
      onSubmit={handleSubmit} 
      sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        gap: 2, 
        mt: 4 
      }}
    >
      <TextField
        label="Enter city"
        variant="outlined"
        value={city}
        onChange={handleChange}
        required
      />
      <Button 
        variant="contained" 
        color="primary" 
        type="submit"
      >
        Get Weather
      </Button>
    </Box>
  );
};

export default WeatherForm;
