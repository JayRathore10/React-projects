import { useState } from 'react';
import axios from 'axios';
import { convertTemp } from '../utils/convertTemp';
import { convertWindSpeed } from '../utils/convertWindSpeed';
import './HomePage.css';
import { WeatherPage } from './WeatherPage';
export function HomePage() {

  const [city, setCity] = useState('');
  const [currWeather, setCurrWeather] = useState('');
  const [wind, setWind] = useState('');
  const [currTemp, setCurrTemp] = useState('');
  const [humidity , setHumidity] = useState('');
  const [bg , setBg] = useState('');
  const [show, setShow] = useState(false);

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

     setBg(response.data.weather[0].main);

    console.log(bg);
      
      setAllData(response);

    } catch (error) {
      console.log(error);
      setCurrWeather("No Output");
    }
  }

  return (
    <>
      <h1
        className='heading'
      >Weather App</h1>
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
            if(e.key === 'Enter'){
              fetchWeather(); 
              setShow(true);
            }
          }}
        ></input>
        <button
          className='check-btn'
          onClick={async () => {
            setShow(true);
            fetchWeather();
          }}
        >
          Check Weather
        </button>
      </div>
      { show === true && <WeatherPage currTemp={currTemp} wind={wind} currWeather={currWeather} humidity={humidity} bg={bg} />}
    </>
  );
}