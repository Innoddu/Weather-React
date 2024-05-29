import './CurrentWeather.css'
import { Button } from'react-bootstrap';
import { format } from 'date-fns'


const CurrentWeather = ({ weather, icon }) => {
    const now = new Date();
    const formattedDate = format(now, 'EEEE, MMMM do yyyy');
    return (
        <div className="CurrentWeather">
            <div className='LocationDate-wrapper'>
                <h1>{weather.name}, {weather.sys.country}</h1>
                <p>{formattedDate}</p>
                <img className="img-fluid" src={`http://openweathermap.org/img/wn/${icon}@2x.png`} />
            </div>
            <div className='Temp'>
                    <h1>{Math.round(weather?.main.temp)} °C</h1>  
                <div className='Elements'>
                    <p>Weather: {weather.weather[0].description}</p>
                    <p>Humidity: {weather.main.humidity} %</p>
                    <p>Wind Speed: {weather.wind.speed} m/s</p>
                </div>
            </div>

        </div>
    );
};

export default CurrentWeather;