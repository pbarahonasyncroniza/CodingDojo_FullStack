
import { useState, useEffect } from "react";
import axios from "axios";
import './App.css';

const App = () => {
  const [pokemons, setPokemons] = useState([]);
  const [sendRequest, setSendRequest] = useState(false);

  useEffect(() => {
    if (sendRequest) {
      getPokemonsFromAPI();
      setSendRequest(false);
    }
  }, [sendRequest]);

  const getPokemonsFromAPI = async () => {
    try {
      const response = await axios.get(
        "https://swapi.dev/api/people/"
      );
      setPokemons(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnClickFetchyPokemons = () => {
    setSendRequest(true);
  };

  return (
    <div className="App bg-light p-3 text-left">
      <div className="w-25 mt-2 mx-auto">
        <button
          className="btn btn-secondary mb-3 d-block"
          onClick={handleOnClickFetchyPokemons}
        >
          Fetch Pokemon
        </button>
        <p className="mb-1">List of Pokemons:</p>
        <ol>
          {pokemons &&
            pokemons.map((pokemon, index) => (
              <li key={index}>{pokemon.name}</li>
            ))}
        </ol>
      </div>
    </div>
  );
}

export default App;

