import { Search, MapPin } from "react-feather";
import getWeather from "../api/api";
import { useState } from "react";
import dateFormat from "dateformat";
import "./Weather.css";
function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState({});

  const getWeatherbyCity = async () => {
    const weatherData = await getWeather(city);
    setWeather(weatherData);
    setCity("");
  };

  const renderDate = () => {
    let now = new Date();
    return dateFormat(now, "dddd, mmmm dS, h:MM TT");
  };

  return (
    <div className="app">
      <h1>Weather App</h1>
      <div className="input-wrapper">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter City Name"
        />
        <button onClick={() => getWeatherbyCity()}>
          <Search></Search>
        </button>
      </div>

      {weather && weather.weather && (
        <div className="content">
          <div className="location">
            <MapPin></MapPin>
            <h2>
              {weather.name} <span>({weather.sys.country})</span>
            </h2>
          </div>
          <p className="datetext">{renderDate()}</p>
          <div className="tempstats d-flex flex-c">
            <h1>
              {weather.main.temp} <span>&deg;C</span>
            </h1>
            <h3>
              Approximate {weather.main.feels_like} <span>&deg;C</span>
            </h3>
          </div>
        </div>
      )}

      {!weather.weather && (
        <div className="content">
          <h4>No Data found !</h4>
        </div>
      )}
    </div>
  );
}

export default Weather;
