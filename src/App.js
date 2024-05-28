import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import SearchBar from './component/SearchBar';
import CurrentWeather from './component/CurrentWeather'
import WeekWeather from './component/WeekWeather'


function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState([]);

  const handleChange =  async(e) => {
    setSearchTerm(e.target.value);
    if (e.target.value) {
      const apiKey = '89ff43a0bb1a7056b605e80c955feaf0';
      const url = `https://api.openweathermap.org/data/2.5/find?q=${e.target.value}&type=like&sort=population&cnt=5&appid=${apiKey}`;

      try {
        const response = await axios.get(url);
        setCity(response.data.list);
      } catch (error) {
        console.error("error feching city!!", error)
      }
    } else {
      setCity([]);
    }
  };

  const handleSearch = async () => {
    if (searchTerm) {
      const apiKey = '89ff43a0bb1a7056b605e80c955feaf0';
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&appid=${apiKey}&units=metric`;

      try {
        const response = await axios.get(url);
        setWeather(response.data);
      } catch (error) {
        console.error("Error fetching the weather data!!", error)
      }
    }
  };

  return (
    <div className="App">
      <h2>Weather</h2>
      <SearchBar searchTerm={searchTerm}  handleChange={handleChange} handleSearch={handleSearch} weather={weather}
      city={city}/>
      {weather &&<CurrentWeather weather={weather}/>}
      <WeekWeather />
    </div>
  );
}

export default App;
