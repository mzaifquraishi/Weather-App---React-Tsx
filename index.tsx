import React, { useEffect, useState } from 'react';
import { render } from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import './style.css';
import Weather from './weather';

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
