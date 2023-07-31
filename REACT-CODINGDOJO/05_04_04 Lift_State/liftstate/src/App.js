
import './App.css';
import MassasgeForm from './components/MassageForm';
import MassageDisplay from './components/MassageDisplay';
import { useState } from 'react';



function App() {

  const [currentMsg, setCurrentMsg] = useState ("There are no massages");

  const youveGotEmail = (newMassage) => {
    setCurrentMsg (newMassage)
  };

  return (
    <div className="App">
      <MassasgeForm NewMassage = {youveGotEmail}/>
      <MassageDisplay message = {currentMsg}/>
    </div>
  );
}

export default App;
