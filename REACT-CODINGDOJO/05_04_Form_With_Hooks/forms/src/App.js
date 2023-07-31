import logo from './logo.svg';
import './App.css';
import Wrapped  from "./components/Wrapped"

const  App =() => {
  return (
    <div className='App'>
      <Wrapped items ={["something" , "sombrero", "wholesome","ransom", "apple", "react","javascrip"]}/> 
    </div>
    );
}

export default App;
