import {  useState } from 'react';
import axios from 'axios';
import { convertTemp } from '../utils/convertTemp';
import './HomePage.css';
export function HomePage(){

  const [city , setCity] = useState('');
  const [currWeather , setCurrWeather]  = useState('');
  const [currTemp , setCurrTemp ] = useState('');

  const apiKey = "6ebbc164edd1a8b2178b4e0be0e934c9";

  const fetchWeather = async()=>{
    try{
      const response =  await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
      setCurrWeather(response.data.weather[0].description)
      const tempK = response.data.main.temp;
      setCurrTemp(convertTemp(tempK));
    }catch(error){
      console.log(error);
      setCurrWeather("No Output");
    }    
  }

  return(
    <>
      <h1>Weather App</h1>
      <div
        className="input-container"
      >
        <input
          type = "text"
          className="input-city"
          onChange={(e)=>{
            setCity(e.target.value)
          }}
        ></input>
        <button
          className='check-btn'
          onClick={async()=>{
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
            Temperature : {currTemp}
          </p>
        </div>
      </div>
    </>
  );
}