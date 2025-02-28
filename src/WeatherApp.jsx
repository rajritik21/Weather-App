import React, { useState, useEffect } from "react";
import axios from "axios";
import bgImage from "./img.jpg";

const WeatherApp = () => {
  const [city, setCity] = useState(""); // Stores user-input city name
  const [weatherData, setWeatherData] = useState(null); // Stores fetched weather data
  const [error, setError] = useState(""); // Stores error message for invalid city input
  const [currentLocation, setCurrentLocation] = useState({
    lat: null,
    lon: null,
  });
  // Fetch weather data when location changes
  useEffect(() => {
    if (currentLocation.lat && currentLocation.lon) {
      fetchWeatherData(currentLocation.lat, currentLocation.lon);
    }
  }, [currentLocation]);
   // Get user's current location on page load
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCurrentLocation({
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      });
    });
  }, []);
  // Fetch weather data using latitude and longitude
  const fetchWeatherData = (lat, lon) => {
    const apiKey = "3522491eab16a74c112320c5c754f812";
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
      )
      .then((response) => {
        setWeatherData(response.data);
        setError("");
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  };
    // Function to fetch weather data for the searched city
  const handleSearch = () => {
    const apiKey = "3522491eab16a74c112320c5c754f812";
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
      )
      .then((response) => {
        setWeatherData(response.data);
        setError("");
      })
      .catch(() => {
        setError("Please enter a valid city name.");
        setWeatherData(null);
      });
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center p-6"
      style={{
        backgroundImage:
          "url('https://plus.unsplash.com/premium_photo-1664304423623-4f9d5ed90b4f?q=80&w=2068&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      }}
    >
      <div className="w-full max-w-4xl flex flex-col md:flex-row bg-white bg-opacity-20 backdrop-blur-lg rounded-lg p-6 md:p-8 shadow-lg">
          {/* Left Container (Weather Display) */}
        
<div
  className="w-full md:w-1/2 bg-cover bg-center rounded-[25px] p-6 flex flex-col justify-between text-white relative cursor-pointer transition-all duration-300 scale-105 perspective-[200px] shadow-lg hover:scale-110 hover:perspective-[2500px] hover:rotate-y-[5deg]"
  style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
>
  {/* <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-900 opacity-50 rounded-lg"></div> */}

           {/* Date & Location Information */}
          <div className="relative z-10">
            {/* Displays the current day */}
            <h1 className="font-[Poppins] text-white  tracking-wide text-2xl ">
              {new Date().toLocaleDateString("en-US", { weekday: "long" })}
            </h1>
              {/* Displays the full date */}
            <p
              className="font-[Poppins] text-white  tracking-wide text-sm mt-2"
            >
              {new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
               {/* Displays city name and country */}
            </p>
            <p className="font-[Poppins] text-gray-800 font-bold tracking-wide text-sm mt-1 flex items-center">
               {/* Location Icon */}
            <svg className="w-5 h-5 text-gray-600 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="black"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2C8.134 2 5 5.134 5 9c0 5.25 7 12 7 12s7-6.75 7-12c0-3.866-3.134-7-7-7z"/> <circle cx="12" cy="9" r="3"/></svg>

              {weatherData
                ? `${weatherData.name}, ${weatherData.sys.country}`
                : "Loading..."}
            </p>
          </div>
          {/* Temperature & Weather Description */}
          <div className="relative z-10">
            <p className="text-6xl font-bold mt-6">
              {weatherData ? `${weatherData.main.temp}°C` : "Loading..."}
            </p>
            <p className="font-[Inter] text-white font-semibold uppercase text-lg mt-2">
              {weatherData ? weatherData.weather[0].description : "Loading..."}
            </p>
          </div>
        </div>
          {/* Right Container (Additional Weather Details + Search) */}
        <div className="w-full md:w-1/2 p-6 flex flex-col justify-between text-gray-800">
          <div>
            <div className="flex justify-between border-b pb-2">
              <p>Pressure</p>
              <p>
                {weatherData
                  ? `${weatherData.main.pressure} hPa`
                  : "Loading..."}
              </p>
            </div>
            <div className="flex justify-between border-b pb-2 mt-2">
              <p>Humidity</p>
              <p>
                {weatherData ? `${weatherData.main.humidity} %` : "Loading..."}
              </p>
            </div>
            <div className="flex justify-between border-b pb-2 mt-2">
              <p>Wind Speed</p>
              <p>
                {weatherData ? `${weatherData.wind.speed} km/h` : "Loading..."}
              </p>
            </div>
          </div>
           {/* Search Functionality */}
          <div className="mt-6">
            <input
              type="text"
              placeholder="Enter City Name"
              className="w-full p-2 rounded-lg text-gray-800 border"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            {error && <p className="text-red-600 mt-2">{error}</p>}
            {/* Search Button */}
            <button
              className="w-full mt-4 p-2 text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition duration-300"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
