import { useEffect, useState } from "react";
import axios from "axios";
function App() {
  const [countries, setCountries] = useState([]);
  const [countrySearch, setCountrySearch] = useState("");

  function handleCountrySearch(e) {
    console.log(e.target.value);
    setCountrySearch(e.target.value);
  }

  useEffect(() => {
    axios
      .get(
        `https://restcountries.eu/rest/v2/name/${countrySearch}?fullText=false`
      )
      .then((response) => {
        setCountries(response.data);
        console.log(response.data);
      }, []);
  });
  return (
    <div className="App">
      Find countries
      <input onChange={handleCountrySearch} value={countrySearch} />
      <br />
      {countries.lenght === 0 ? (
        <p>Search a country</p>
      ) : countries.length === 1 ? (
        <div>
          <h1>{countries[0].name}</h1>
          <p>capital {countries[0].capital}</p>
          <p>population {countries[0].population}</p>
          <h2>Languages</h2>
          {countries[0].languages.map((language) => {
            console.log(language);

            return (
              <ul>
                <li>{language.name}</li>
              </ul>
            );
          })}
          <img src={countries[0].flag} />
        </div>
      ) : countries.length > 10 ? (
        <p>Too many</p>
      ) : (
        countries.map((country) => {
          return <p key={country.name}>{country.name}</p>;
        })
      )}
    </div>
  );
}

export default App;
