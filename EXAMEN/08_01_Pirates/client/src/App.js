
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PirateCrew from "./components/PirateCrew"
import DetailPirate from './view/DetailPirate';
import AddPirates from './view/AddPirate';
import HomeView from './view/HomeView';


function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Routes>
            <Route path='/' element={<PirateCrew />}></Route>
            <Route path= "/edit/:pirateId" element={<DetailPirate/>}/>
            <Route path= "/new/" element={<AddPirates/>}/>
            <Route path= "/register/" element={<HomeView/>}/>
          </Routes>
        </div>
      </Router>
      
    </div>
  );
}

export default App;
