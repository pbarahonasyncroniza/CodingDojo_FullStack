import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateAuthors from './views/CreateAuthor';
import AuthorList from './components/AuthorList';
import EdithAuthor from './views/EditAuthor';
function App() {
  return (
    <div className="App">
      <h1>Favorite authors</h1>
        <Router>
          <div>
            <Routes>
              <Route path="/" element={<AuthorList />} />
              <Route path="/:new" element={<CreateAuthors />} />
              <Route path="/edit/:authorID" element={<EdithAuthor />} />
            </Routes>
          </div>
        </Router>      
    </div>
  );
}

export default App;
