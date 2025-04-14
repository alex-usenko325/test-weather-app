import { WeatherData } from '../../types/Weather';
import s from './WeatherCard.module.css';  

interface WeatherCardProps {
  weatherData: WeatherData;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weatherData }) => {
  const { city, main, weather, dt } = weatherData;
  const lastUpdated = new Date(dt * 1000).toLocaleTimeString();

  return (
    <div className={s.card}>
      <h2>{city}</h2>
      <p className={s.temp}>{main.temp}°C</p>
      <p className={s.description}>{weather[0].description}</p>
      <img
        src={`http://openweathermap.org/img/wn/${weather[0].icon}.png`}
        alt={weather[0].description}
      />
      <p className={s.lastUpdated}>Last updated: {lastUpdated}</p>
    </div>
  );
};

export default WeatherCard;
