
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddTask from './components/Addtask';
import HomeViewTask from './views/HomeViewTask';


function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Routes>
            <Route path='/' element={<HomeViewTask />}></Route>
            <Route path= "/new/" element={<AddTask/>}/>
          </Routes>
        </div>
      </Router>








    </div>
  );
}

export default App;

