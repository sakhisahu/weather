import { useState } from "react";
import "./App.css";

function App() {

  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const apiKey = "aa627ddd3838cabf0c8e4bb8fda8135c";

  const getWeather = async () => {

    if(city === ""){
      setError("Please enter city name");
      return;
    }

    try {

      setLoading(true);
      setError("");

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );

      const data = await response.json();

      if(data.cod === 404){
        setError("City not found");
        setWeather(null);
      }
      else{
        setWeather(data);
      }

      setLoading(false);

    } catch(error){

      setLoading(false);
      setError("Something went wrong");

    }

  }

  return (

    <div className="container">

      <div className="weather-card">

        <h1>Weather App</h1>

        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e)=>setCity(e.target.value)}
          onKeyDown={(e)=>{
            if(e.key === "Enter"){
              getWeather();
            }
          }}
        />

        <button onClick={getWeather}>
          Search
        </button>

        {loading && <p className="loading">Loading...</p>}

        {error && <p className="error">{error}</p>}

        {weather && (

          <div className="weather-info">

            <h2>{weather.name}</h2>

            <p className="date">
              {new Date().toDateString()}
            </p>

            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt=""
            />

            <h3>{weather.main.temp}°C</h3>

            <p className="condition">
              {weather.weather[0].main}
            </p>

            <p className="description">
              {weather.weather[0].description}
            </p>

            <div className="details">

              <p>
                Feels Like: {weather.main.feels_like}°C
              </p>

              <p>
                Humidity: {weather.main.humidity}%
              </p>

              <p>
                Wind: {weather.wind.speed} km/h
              </p>

              <p>
                Min Temp: {weather.main.temp_min}°C
              </p>

              <p>
                Max Temp: {weather.main.temp_max}°C
              </p>

              <p>
                Sunrise:
                {" "}
                {new Date(
                  weather.sys.sunrise * 1000
                ).toLocaleTimeString()}
              </p>

              <p>
                Sunset:
                {" "}
                {new Date(
                  weather.sys.sunset * 1000
                ).toLocaleTimeString()}
              </p>

            </div>
          </div>

        )}

      </div>

    </div>

  );
}

export default App;