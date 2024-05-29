import React, { useState, useEffect } from 'react';
import ClipLoader from "react-spinners/ClipLoader";

import axios from 'axios';
import './App.css';
import SearchBar from './component/SearchBar';
import CurrentWeather from './component/CurrentWeather'
import WeekWeather from './component/WeekWeather'


function App() {
  const [location, setLocation] = useState({lat: null, lon: null})
  const [searchTerm, setSearchTerm] = useState("");
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState([]);
  const [loading, setLoading] = useState(false);
  const [icon, setIcon] = useState("");

 

  // Get current location
  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition( (position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      console.log('current position: lat, lon', lat, lon);
      setLocation({lat, lon});
    }, (error) => {
      console.error("Erorr Getting Current Location", error);
    }, 
    {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    }
    );
  };
  useEffect(() => {
      getCurrentLocation();
  }, []);

  // Get Weather based on current location
  const getWeatherByCurrentLocation = async (lat, lon) => {
    setLoading(true)
    const apiKey = "89ff43a0bb1a7056b605e80c955feaf0"
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    try {
      let response = await fetch(url);
      let data = await response.json();

      console.log("Current Location Weather data!!", data);
      setWeather(data); 
      setIcon(data.weather[0].icon);
      setLoading(false);
    } catch (error) {
      console.error("Error Fetching Weather Data on Current Location", error);
    } 
  }
  useEffect(() => {
    if (location.lat && location.lon) {
      getWeatherByCurrentLocation(location.lat, location.lon);
    }
  }, [location]);

  // Get City list based on users search
  const handleChange =  async(e) => {

    setSearchTerm(e.target.value);
    setSearchTerm(e.target.value);
    if (e.target.value) {
      const apiKey = "89ff43a0bb1a7056b605e80c955feaf0";
      const url = `https://api.openweathermap.org/data/2.5/find?q=${e.target.value}&type=like&sort=population&cnt=5&appid=${apiKey}`;
      try {
        const response = await axios.get(url);
        setCity(response.data.list);
        console.log("setcity's seticon:", response.data.list)
      } catch (error) {
        console.error("error feching city!!", error)
      }
    } else {
      setCity([]);
    }
  };

  const handleSearch = async () => {
    if (searchTerm) {
      const apiKey = "89ff43a0bb1a7056b605e80c955feaf0"
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&appid=${apiKey}&units=metric`;

      try {
        const response = await axios.get(url);
        setWeather(response.data);
        setIcon(response.data.weather[0].icon);
        console.error("response.data:", response.data.weather[0].icon)
        // If user click the city, cities will be hidden
        setCity([]);
        // If user click the city, clear input text
        setSearchTerm("");
      } catch (error) {
        console.error("Error fetching the weather data!!", error)
      }
    }
  };
  



  return (
    <div className="App">
      <h2>What is the Today's Weather ?</h2>
      <SearchBar 
      searchTerm={searchTerm} 
      handleChange={handleChange} 
      handleSearch={handleSearch}
      weather={weather}
      city={city}/>
      {loading ? 
      (<ClipLoader color={"black"} loading={loading} size={100} />)
       : (weather &&<CurrentWeather weather={weather} icon={icon}/>)
      }
      <WeekWeather />
    </div>
  );
}

export default App;
