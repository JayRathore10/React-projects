import './WeatherPage.css';
export function WeatherPage({currWeather , wind , currTemp , humidity , bg}) {
  return (
    <>

      <div className={`main-container bg-${bg}`}>
        <div className="temp-container">
          <div className="temp">
            <h1>{currTemp}</h1>
          </div>
          <div className="temp-type">
            °C
          </div>
        </div>
        <div className="weather-container">
          <p>
            {currWeather}
          </p>
        </div>
        <div className="other-container">
          <div className="wind-div">
            <p>
              Wind speed
            </p>
            <p>
              {wind} KM/H
            </p>
          </div>
          <div className="humidity">
            <p>
              Humidity
            </p>
            <p>
              {humidity}%
            </p>
          </div>
        </div>
      </div>
    </>
  );
}