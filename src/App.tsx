import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { cities } from "./cities";
import "./App.css";
import { useState } from "react";

function App() {
  const [pickedCity, setPickedCity] = useState({ name: "", code: "" });

  const pickCity = () => {
    const randomIndex = Math.floor(Math.random() * cities.length);
    setPickedCity(cities[randomIndex]);
  };

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <div>
        <h1>City Roulette</h1>
        <button onClick={pickCity}>Start</button>
        {pickedCity.name && (
          <div>
            <h3>🎉 {pickedCity.name} 🎉</h3>
          </div>
        )}
      </div>
      <div>
        <h2>Cities</h2>
        <ul>
          {cities.map((city) => (
            <li key={city.code}>{city.name}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
