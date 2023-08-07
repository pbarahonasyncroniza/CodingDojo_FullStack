import './App.css';
import React, { useEffect, useState } from "react";
import axios from 'axios';

const App = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [sendRequest, setSendRequest] = useState(false);
  const [characterData, setCharacterData] = useState(null);

  useEffect(() => {
    if (sendRequest && inputValue.trim() !== "") {
      axios.get(`https://swapi.dev/api/${selectedOption}/${inputValue}`)
        .then((response) => {
          setCharacterData(response.data);
        })
        .catch((error) => {||
          console.log(error);
          setCharacterData(null); // En caso de error, limpiamos los datos del personaje
        })
        .finally(() => {
          setSendRequest(false);
        });
    }
  }, [sendRequest, selectedOption, inputValue]);

  const options = [
    { value: "people", label: "CharacterName" },
    { value: "planets", label: "HomeWorld" },
    { value: "mass", label: "mass" },
    { value: "birth_year", label: "birth_year" },
  ];

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleOnChange = (e) => {|  
    setSelectedOption(e.target.value);
    setCharacterData(null); // Limpiamos los datos del personaje al cambiar la opción del dropdown
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    setSendRequest(true); // Cambiamos el estado a true para activar el useEffect y hacer la solicitud a la API
  };

  return (
    <div className="App">
      <div>
        <h2>Select Ability</h2>
        <select value={selectedOption} onChange={handleOnChange}>
          <option value="">Select one Option</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {selectedOption && <p>Selected: {selectedOption}</p>}
      </div>
      <form onSubmit={handleOnSubmit}>
        <label htmlFor="nameInput">Character Number</label>
        <input
          type="text"
          id="nameInput"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button type="submit">Search</button>
      </form>

      {/* Mostramos los detalles del personaje */}
      {characterData && (
        <div>
          <h3>Character Details</h3>
          <h2>Name: {characterData.name}</h2>
          <p>Height: {characterData.height}</p>
          <p>Mass: {characterData.mass}</p>
          <p>Birth_year:{characterData.birth_year}</p>
          <p>Gender:{characterData.gender}</p>
          {/* Agrega aquí más propiedades del personaje según tus necesidades */}
        </div>
      )}
    </div>
  );
};

export default App;
