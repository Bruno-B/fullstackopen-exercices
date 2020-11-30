import { useEffect, useState } from "react";
import axios from "axios";
function App() {
  const [countries, setCountries] = useState([]);
  const [countrySearch, setCountrySearch] = useState("");
  const [selected, setSelected] = useState();
  const API_KEY = process.env.REACT_APP_API_KEY;
  const [weather, setWeather] = useState("");
  console.log(API_KEY)
  function handleCountrySearch(e) {
    setCountrySearch(e.target.value);
  }

  useEffect(() => {
    axios
      .get(
        `https://restcountries.eu/rest/v2/name/${countrySearch}?fullText=false`
      )
      .then((response) => {
        setCountries(response.data);
      });
    if (countries.length === 1)
      axios
        .get(
          `http://api.weatherstack.com/current?access_key=${API_KEY}&query=${countries[0].capital}&units=m`
        )
        .then((response) => {
          setWeather(response.data);
        });
  }, [countrySearch]);
  return (
    <div className="App">
      Find countries
      <input onChange={handleCountrySearch} value={countrySearch} />
      <br />
      {countries.lenght === 0 ? (
        <p>Search a country</p>
      ) : countries.length === 1 && weather != "" ? (
        <Details country={countries[0]} weather={weather} />
      ) : countries.length > 10 ? (
        <p>Too many</p>
      ) : (
        countries.map((country, index) => {
          if (index === selected) {
            return <Details country={country} weather={weather} />;
          } else {
            return (
              <div>
                <p key={country.name}>
                  {country.name}

                  <button
                    onClick={() => {
                      setSelected(index);
                    }}
                  >
                    Show
                  </button>
                </p>
              </div>
            );
          }
        })
      )}
    </div>
  );
}

const Details = ({ country, weather }) => {
  console.log(weather);
  return (
    <div>
      <Info country = {country} />
      <Weather country = {country} weather = {weather} />
    </div>
  );
};

function Info({country}) {
  return (
    <div>
      <h1>{country.name}</h1>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h2>Languages</h2>
      {country.languages.map((language) => {
        return (
          <ul>
            <li>{language.name}</li>
          </ul>
        );
      })}
      <h2>Flag</h2>
      <img style={{ maxWidth: 250 }} src={country.flag} />
    </div>
  );
}

function Weather({weather,country}) {
  return (
    <div>
      <h2>Weather in {country.capital} </h2>
      <p>Temperature: {weather.current.temperature} Celsius </p>
      <img src={weather.current.weather_icons} />
      <p>
        Wind:{weather.current.wind_speed} mph direction{" "}
        {weather.current.wind_dir}{" "}
      </p>
    </div>
  );
}

export default App;
