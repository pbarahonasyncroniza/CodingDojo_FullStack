import './App.css';
import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [pokemons, setPokemons] = useState([]);
  const [sendRequest, setSendRequest] = useState(false);

  useEffect(() => {
    if (sendRequest) {
      axios
        .get("https://pokeapi.co/api/v2/pokemon/?limit=807")
        .then((response) => setPokemons(response.data.results))
        .catch((error) => console.log(error));
      setSendRequest(false);
    }
  }, [sendRequest]);

  const handleFetchPokemons = () => {
    setSendRequest(true);
  };

  return (
    <div className="App">
      <button onClick={handleFetchPokemons}>Fetch Pokemons</button>
      {/* Render your pokemons data here */}
      <ul>
        {pokemons &&
          pokemons.map((pokemon, index) => (
            <li key={index}>{pokemon.name}</li>
          ))}
      </ul>
    </div>
  );
};

export default App;
