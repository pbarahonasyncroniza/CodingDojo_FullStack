import logo from './logo.svg';
import './App.css';
import "./components/PersonCard"
import "./components/Button"
import PersonCard from './components/PersonCard';

const App = () => {
  return (
    <div className='border border-4 w-50 text-center mx-auto mt-3 p-3 App'> 
      <h1>Wellcome to my Cards List </h1>
      <PersonCard
        firstName = "jane"
        lastName = "Doe"
        age = {45}
        hairColor ="Black"
      />

      <PersonCard
        firstName = "John,"
        lastName = "Smith"
        age = {88}
        hairColor ="Brown"
      />

      <PersonCard
        firstName = "Millard"
        lastName = "Fillmore"
        age = {50}
        hairColor ="Brown"
      />
      <PersonCard
        firstName = "Maria"
        lastName = "Smith"
        age = {62}
        hairColor ="Brown"
      />


    </div>
  );
}

export default App;
