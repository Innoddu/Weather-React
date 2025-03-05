import './WeekWeather.css'
const WeekWeather = ( { weekWeather } ) => {
    const timeChange = (time) => {
        const timestamp = time;
        const date = new Date(timestamp * 1000);
        const weekday = date.toLocaleDateString('en-US', { weekday: 'short', timeZone: 'UTC' });
        const month = date.toLocaleDateString('en-US', { month: 'short', day: '2-digit', timeZone: 'UTC' });
        const timeString = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' });
        return (
            <span>
            {weekday}, {month}
            <br />
            {timeString}
          </span>
        );
    };

    return (
        <div className="WeekWeather">
            {/* <h4>Daily Weather</h4> */}
            <div className="week-wrapper">
                {weekWeather.map( (w, index) => 
                    <div key={w.id}>
                        <p>{timeChange(w.dt)}</p>
                        <p>{Math.round(w.main.temp)} °C</p>
                        <p><img className="img-fluid" alt="icon-img2" src={`http://openweathermap.org/img/wn/${w.weather[0].icon}@2x.png`} /></p>
                    </div>
                )
                }
                {/* <p>{weekWeatherIcon}</p> */}
            </div>
        </div>
    );
}

export default WeekWeather;