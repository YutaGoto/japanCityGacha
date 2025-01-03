import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { cities } from "./cities";
import { prefectures } from "./prefectures";
import "./App.css";
import { useState } from "react";

function App() {
  const [pickedCity, setPickedCity] = useState({
    city_name: "",
    city_code: "",
  });
  const [pickedPrefecture, setPickedPrefecture] = useState({
    pref_name: "",
    pref_code: "",
  });

  const pickPrefecture = () => {
    setPickedCity({ city_name: "", city_code: "" });
    const randomIndex = Math.floor(Math.random() * prefectures.length);
    setPickedPrefecture(prefectures[randomIndex]);
  };

  const pickCity = () => {
    const prefectureCity = cities.filter((city) => {
      return city.pref_code === pickedPrefecture.pref_code;
    });
    const randomIndex = Math.floor(Math.random() * prefectureCity.length);
    setPickedCity(prefectureCity[randomIndex]);
  };

  return (
    <>
      <div className="github">
        <a
          href="https://github.com/YutaGoto/japanCityGacha"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      </div>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <div>
        <h1>市区町村ルーレット</h1>
        <div className="buttons">
          <button className="button" onClick={pickPrefecture}>
            都道府県
          </button>
          <button className="button" onClick={pickCity}>
            市町村
          </button>
        </div>
        {pickedPrefecture.pref_name && (
          <div>
            <h3>
              🎉 {pickedPrefecture.pref_name}
              {pickedCity.city_name && pickedCity.city_name} 🎉
            </h3>
          </div>
        )}
      </div>
      <div>
        <h2>候補: {cities.length}</h2>
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
