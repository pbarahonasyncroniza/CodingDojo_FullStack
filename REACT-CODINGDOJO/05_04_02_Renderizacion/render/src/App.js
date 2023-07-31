import './App.css';
import "./components/MovieForm";
import "./components/UserFormOptimal"
function App() {
  return (
    <div className='container'>
      <UserFormOptimal/>
      <hr/>
      <MovieForm/>
    </div>
  );
}

export default App;
