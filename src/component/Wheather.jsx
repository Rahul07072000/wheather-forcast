import React, { useState } from 'react';
import axios from 'axios';

const API_KEY = "YOUR_API_KEY";

function WeatherForecast() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [cityData, setCityData]= useState([])

  const fetchCityData = async()=>{
    try{
        const response = await axios.get("https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=100")
       
        setCityData(response.data.results);
        console.log(response)
        setError(null);
    }catch(err){
        setError('Failed to fetch weather data. Please try again.');
        setWeatherData(null);
    }
  }

  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
      setWeatherData(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');
      setWeatherData(null);
    }
  };

  const handleChange = (e) => {
    setCity(e.target.value);
  };
  React.useEffect(()=>{
    fetchCityData()
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeatherData();
  };

  return (
    <div>
      <h1>Weather Forecast</h1>
      <h1>Please select city: {city}</h1>
      {error && <div>{error}</div>}
      {weatherData && (
        <div>
          <h2>{weatherData.name}, {weatherData.sys.country}</h2>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Weather: {weatherData.weather[0].main}</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Wind Speed: {weatherData.wind.speed} m/s</p>
        </div>
      )}

      <div>
      <table id="customers">
  <tr>
    <th>Sl. No.</th>
    <th>Geo Id</th>
    <th>Name</th>
    <th>Country Code</th>
    <th>Population</th>
  </tr>
 <tbody>
    {cityData.map((item,index)=>(<tr key={item.geoname_id}>
        <td>{index+1}</td>
        <td>{item.geoname_id}</td>
        <td onClick={()=>setCity(item.name)}>{item.name}</td>
        <td>{item.country_code}</td>
        <td>{item.population}</td>
    </tr>))}
 </tbody>
  
</table>
      </div>
    </div>
  );
}

export default WeatherForecast;
