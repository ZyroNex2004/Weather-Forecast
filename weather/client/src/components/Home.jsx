import { useState, useEffect } from 'react';
import axios from 'axios';

function Home() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [dateTime, setDateTime] = useState(new Date());

  const apiKey = 'c3a14b64fd3eb5f994230183700f79d1';

  // Live clock updater
  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Get weather by city name
  const fetchWeather = async () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    try {
      const res = await axios.get(url);
      setWeather(res.data);
    } catch (error) {
      alert('City not found!');
    }
  };

  // Get weather by geolocation
  const fetchWeatherByLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

        try {
          const res = await axios.get(url);
          setWeather(res.data);
          setCity(res.data.name); // update input box with city name
        } catch (error) {
          alert('Unable to fetch weather for your location.');
        }
      }, (error) => {
        alert('Location access denied or unavailable.');
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  // Fetch location-based weather on first load
  useEffect(() => {
    fetchWeatherByLocation();
  }, []);

  return (
    <>
     
      <div className="min-h-screen bg-gradient-to-b from-blue-300 to-indigo-500 flex flex-col items-center justify-center p-4">
        <h1 className="text-4xl font-bold text-white mb-6">🌦️ Weather Forecast</h1>

        <div className="flex flex-wrap gap-2 mb-4 justify-center">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city..."
            className="px-4 py-2 rounded shadow-md focus:outline-none"
          />
          <button
            onClick={fetchWeather}
            className="bg-white px-4 py-2 rounded shadow hover:bg-gray-200"
          >
            Search
          </button>
          <button
            onClick={fetchWeatherByLocation}
            className="bg-yellow-300 px-4 py-2 rounded shadow hover:bg-yellow-400"
          >
            Use My Location 📍
          </button>
        </div>

        {weather && (
          <div className="bg-white bg-opacity-20 backdrop-blur-lg p-6 rounded-xl text-white shadow-lg mt-4 text-center">
            <h2 className="text-2xl font-semibold">
              {weather.name}, {weather.sys.country}
            </h2>
            <p className="text-xl mt-2">
              📅 {dateTime.toLocaleDateString()} ⏰ {dateTime.toLocaleTimeString()}
            </p>
            <p className="text-xl mt-2">🌡 {weather.main.temp}°C</p>
            <p className="capitalize">☁️ {weather.weather[0].description}</p>
            <p>💧 Humidity: {weather.main.humidity}%</p>
            <p>🌬 Wind: {weather.wind.speed} m/s</p>
          </div>
        )}
      </div>
    </>
  );
}

export default Home;
