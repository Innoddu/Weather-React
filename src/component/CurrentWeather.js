import './CurrentWeather.css'
import { Button } from'react-bootstrap';
const CurrentWeather = ({ weather }) => {
    return (
        <div className="CurrentWeather">
            <h2>Current Weather in {weather.name}, {weather.sys.country}</h2>
            <p>Temperature: {weather.main.temp} °C</p>
            <p>Weather: {weather.weather[0].description}</p>
            <p>Humidity: {weather.main.humidity} %</p>
            <p>Wind Speed: {weather.wind.speed} m/s</p>

        </div>
    );
};

export default CurrentWeather;