import moment=require('moment');
import React, { useEffect, useState } from 'react';
import { render } from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import { Card } from 'semantic-ui-react';
import './style.css';

const Weather = ({ weatherData }) => (
  <Card>
    <Card.Content>
      <Card.Header className="header">
        City Name: {weatherData.name}
      </Card.Header>
      <p>Day: {moment().format('dddd')}</p>
      <p>Date: {moment().format('LL')}</p>
      <p>Temprature: {weatherData.main.temp} &deg;C</p>
      <p>
        Sunrise:{' '}
        {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString('en-IN')}
      </p>
      <p>
        Sunset:{' '}
        {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString('en-IN')}
      </p>
      <p>Description: {weatherData.weather[0].main}</p>
      <p>Humidity: {weatherData.main.humidity} %</p>
    </Card.Content>
  </Card>
);

function App() {
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function(position) {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
    });
    const fetchData = async () => {
      await fetch(
        `${'https://api.weatherapi.com/v1/current.json?key=2c00608e2d7645f4adf144601213008&q='}${lat},${long}${'&aqi=no'}`
      )
        .then(res => res.json())
        .then(result => {
          setData(result);
          console.log(result);
        });
    };
    fetchData();
  }, [lat, long]);

  return (
    <div className="App">
      <Weather weatherData={data} />
    </div>
  );
}

render(<App />, document.getElementById('root'));
