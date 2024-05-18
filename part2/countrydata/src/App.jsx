import { useState, useEffect } from "react";
import axios from "axios";

const CountrySearch = () => {
  const [value, setValue] = useState("");
  const [matchingCountries, setMatchingCountries] = useState([]);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        setCountries(response.data);
      });
  }, []);

  useEffect(() => {
    if (value) {
      setMatchingCountries(
        countries.filter((country) =>
          country["name"]["common"]
            .toLowerCase()
            .startsWith(value.toLowerCase())
        )
      );
    } else {
      setMatchingCountries([]);
    }
  }, [value]);

  let countryData;
  if (matchingCountries.length === 1) {
    let country = matchingCountries[0];
    countryData = (
      <div>
        <h1>{country["name"]["common"]}</h1>
        <div>capital {country["capital"][0]}</div>
        <div>area {country["area"]}</div>
        <p>
          <strong>languages:</strong>
        </p>
        <ul>
          {Object.entries(country["languages"]).map(([abbr, full]) => (
            <li key={abbr}>{full}</li>
          ))}
        </ul>
        <img alt={country["flags"]["alt"]} src={country["flags"]["png"]} />
      </div>
    );
  } else if (matchingCountries.length <= 10) {
    countryData = matchingCountries.map((country) => {
      let countryName = country["name"]["common"];
      return (
        <div key={country["cca2"]}>
          {countryName}{" "}
          <button onClick={() => setValue(countryName)}>
            show
          </button>
        </div>
      );
    });
  } else {
    countryData = <div>Too many matches, specify another filter</div>;
  }

  return (
    <div>
      <label htmlFor="country-input">find countries </label>
      <input id="country-input" onChange={(ev) => setValue(ev.target.value)} />
      {countryData}
    </div>
  );
};

const App = () => {
  return (
    <div>
      <CountrySearch />
    </div>
  );
};

export default App;
