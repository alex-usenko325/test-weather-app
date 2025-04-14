import { useState } from 'react';
import s from './WeatherForm.module.css';  // Імпортуємо стилі як модуль

interface WeatherFormProps {
  onCitySubmit: (city: string) => void;
}

const WeatherForm: React.FC<WeatherFormProps> = ({ onCitySubmit }) => {
  const [city, setCity] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCitySubmit(city);
  };

  return (
    <form onSubmit={handleSubmit} className={s.form}>
      <input
        type="text"
        value={city}
        onChange={handleChange}
        placeholder="Enter city name"
        required
        className={s.input}
      />
      <button type="submit" className={s.button}>Get Weather</button>
    </form>
  );
};

export default WeatherForm;
