import React, { useState } from 'react';

function PersonCard(props) {
  const [age, setAge] = useState(props.age);  // Añadimos el estado para la edad

  // Función para incrementar la edad
  const handleBirthdayClick = () => {
    setAge(age + 1);
  }

  return (
    <div className="person-card">
      <h2>{props.firstName} {props.lastName}</h2>
      <p>Age: {age}</p>
      <p>Hair Color: {props.hairColor}</p>
      <button onClick={handleBirthdayClick}>Cumpleaños</button>
    </div>
  );
}

export default PersonCard;
