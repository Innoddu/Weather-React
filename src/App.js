import React, { useState, useEffect, useCallback } from 'react';
import ClipLoader from "react-spinners/ClipLoader";
import debounce from "lodash.debounce";
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
  const [weekWeather, setWeekWeather] = useState([]);

 

  // Get current location
  const getCurrentLocation = () => {
    setLoading(true);
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
   
    const apiKey = "89ff43a0bb1a7056b605e80c955feaf0";
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    try {
      let response = await fetch(url);
      let data = await response.json();

      console.log("Current Location Weather data!!", data);
      setWeather(data); 
      // setWeekWeather(data)
      setIcon(data.weather[0].icon);
      setLoading(false);
    } catch (error) {
      console.error("Error Fetching Weather Data on Current Location", error);
    } 
  };


  // Get week weather based on current location
  const getWeekWeatherByCurrentLocation = async (lat, lon) => {
    setLoading(true);
    const apiKey = "89ff43a0bb1a7056b605e80c955feaf0";
    let url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&cnt=${5}&units=metric`;
    try {
      let response = await fetch(url);
      let data = await response.json();
      console.log("Current Location WeekWeather data:", data.list);
      setWeekWeather(data.list);
      setLoading(false);
    } catch (error) {
      console.error("Error Fetching WeekWeather data", error);
    };
  };

  useEffect(() => {
    if (location.lat && location.lon) {
      console.log(new Date().toLocaleTimeString());
      getWeatherByCurrentLocation(location.lat, location.lon);
      getWeekWeatherByCurrentLocation(location.lat, location.lon);
    }
  }, [location]);


  const debouncedFetch = useCallback(
    debounce(async (value) => {
      if (value) {
        const apiKey = "89ff43a0bb1a7056b605e80c955feaf0";
        const url = `https://api.openweathermap.org/data/2.5/find?q=${value}&type=like&sort=population&cnt=5&appid=${apiKey}`;
        try {
          const response = await axios.get(url);
          setCity(response.data.list);
          console.log("City list:", response.data.list);
        } catch (error) {
          console.error("Error fetching city!!", error);
        }
      } else {
        setCity([]);
      }
    }, 300),
    []
  );

  const handleChange = (e) => {
    const newValue = e.target.value;
    setSearchTerm(newValue);

    if (!newValue) {
      setCity([]);
      return;
    }

    debouncedFetch(newValue);
  };


  // Reutrn the result of user search
  const handleSearch = async () => {
    if (searchTerm) {
      const apiKey = "89ff43a0bb1a7056b605e80c955feaf0"
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&appid=${apiKey}&units=metric`;

      try {
        const response = await axios.get(url);
        setWeather(response.data);
        // setWeekWeather(response.data)
        setIcon(response.data.weather[0].icon);
        console.error("handleSearch: response.data:", response.data.list)
        // If user click the city, cities will be hidden
        setCity([]);
        // If user click the city, clear input text
        setSearchTerm("");
      } catch (error) {
        console.error("Error fetching the handleSearch!!", error)
        
      }
    }
  };

  const handleSearchWeekWeather = async () => {
    if (searchTerm) {
      const apiKey = "89ff43a0bb1a7056b605e80c955feaf0"
      const url = `https://api.openweathermap.org/data/2.5/forecast?q=${searchTerm}&appid=${apiKey}&cnt=${5}&units=metric`;

      try {
        const response = await axios.get(url);
        setWeekWeather(response.data.list);
        console.log("handleSearchWeekWeather!!", response.data.list)

        setSearchTerm("");
      } catch (error) {
        console.error("Error fetching handleSearchWeekWeather!!", error)
        
      }
    }
  };
  
  const handleCombinedSearch = async () => {
    await handleSearch();
    await handleSearchWeekWeather();
  };


  return (
    <div className="App" >
      <h2 style={{ textAlign: "center"}}>What is Today's Weather ?</h2>
      <SearchBar 
      searchTerm={searchTerm} 
      handleChange={handleChange} 
      handleCombinedSearch={handleCombinedSearch}
      city={city}/>
      <div style={{textAlign: "center"}}>
      {loading ? 
      (<ClipLoader color={"black"} loading={loading} size={60} />)
       : (weather &&<CurrentWeather weather={weather} icon={icon}/>)
      }
      </div>
      <WeekWeather weekWeather={weekWeather} />
    </div>
  );
}

export default App;
