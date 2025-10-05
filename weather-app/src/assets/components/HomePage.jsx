import { useState } from 'react';
import axios from 'axios';
import { convertTemp } from '../utils/convertTemp';
import { convertWindSpeed } from '../utils/convertWindSpeed';
import './HomePage.css';
export function HomePage() {

  const [city, setCity] = useState('');
  const [currWeather, setCurrWeather] = useState('');
  const [wind, setWind] = useState('');
  const [currTemp, setCurrTemp] = useState('');
  const [humidity , setHumidity] = useState('');

  const setAllData = (response) => {
    setCurrWeather(response.data.weather[0].description)
    const tempK = response.data.main.temp;
    setCurrTemp(convertTemp(tempK));
    const windSpeedMs = response.data.wind.speed;
    setWind(convertWindSpeed(windSpeedMs));
    setHumidity(response.data.main.humidity);
  }

  const apiKey = "6ebbc164edd1a8b2178b4e0be0e934c9";

  const fetchWeather = async () => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)

      setAllData(response);

    } catch (error) {
      console.log(error);
      setCurrWeather("No Output");
    }
  }

  return (
    <>
      <h1>Weather App</h1>
      <div
        className="input-container"
      >
        <input
          type="text"
          className="input-city"
          onChange={(e) => {
            setCity(e.target.value)
          }}
          onKeyDown={(e)=>{
            if(e.key === 'Enter') fetchWeather(); 
          }}
        ></input>
        <button
          className='check-btn'
          onClick={async () => {
            fetchWeather();
          }}
        >
          Check Weather
        </button>
      </div>
      <div
        className='weather-container'
      >
        <div
          className='weather-output'
        >
          <p>
            Weather : {currWeather}
          </p>
          <p>
            Temperature : {currTemp} {currTemp && `°C` } 
          </p>
          <p>
            Wind Speed : {wind} {wind && `KM/H`}
          </p>
          <p>
            Humidity : {humidity}{humidity && `%`}
          </p>
        </div>
      </div>
    </>
  );
}