import React, { useState } from "react";
import axios from "axios";

export default function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState({});
  const [loaded, setLoaded] = useState(false);

  function cityChange(event) {
    setCity(event.target.value);
  }

  function showTemperature(response) {
    console.log(response.data);
    setLoaded(true);
    setWeather({
      temperature: response.data.main.temp,
      wind: 45,
      humidity: 65,
      icon: " "
    });
  }

  function changeCity(event) {
    event.preventDefault();
    let apiKey = "bea8e5cfc09f2c80726c878f5fd81290";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metrics`;

    axios.get(apiUrl).then(showTemperature);
  }

  let form = (
    <form onSubmit={changeCity}>
      <input type="search" placeholder="Enter a city.." onChange={cityChange} />
      <button type="Submit">Search</button>
    </form>
  );

  if (loaded) {
    return (
      <div>
        {" "}
        {form}
        <ul>
          <li>Temperature: {weather.temperature}C</li>
          <li>Wind: {weather.wind}</li>
          <li>Humidity: {weather.humidity}</li>
          <li>Icon : {weather.icon}</li>
        </ul>
      </div>
    );
  } else {
    return form;
  }
}
