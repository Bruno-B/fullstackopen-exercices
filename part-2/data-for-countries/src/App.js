import { useEffect, useState } from "react";
import axios from "axios";
function App() {
  const [countries, setCountries] = useState([]);
  const [countrySearch, setCountrySearch] = useState("");
  const [selected, setSelected] = useState();

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
        <Detail country={countries[0]} />
      ) : countries.length > 10 ? (
        <p>Too many</p>
      ) : (
        countries.map((country, index) => {
          if (index === selected) {
            return <Detail country = {country} />;
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

const Detail = ({ country }) => {
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
};

export default App;
