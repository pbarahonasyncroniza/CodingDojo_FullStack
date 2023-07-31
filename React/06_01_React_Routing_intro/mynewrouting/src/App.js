import React from "react";
import {BrowserRouter, Routes, Route, Link} from "react-router-dom"
import './App.css';


import Home from "./component/Home";
import About from "./component/About";
import Contact from "./component/Contact";

const App = () => {
  
  return (
  
  <div className="App bg-light p-3 text-center"> 
    <h1>Routing Example  without Anchor </h1>
    <hr /> 
      <nav className="d-flex jusfity-content-center my-3">
          <Link  to ="/">
            <h4>Home</h4>        
          </Link>;

          <h4 className="mx-2">|</h4>
          <Link to = "/about">
            <h4>About</h4>          
          </Link>

          <h4 className="mx-2">|</h4>
          <Link to = "/contact">
            <h4>Contact</h4>          
          </Link>
      </nav>    

    <Routes>
      <Route path = "/"      element={<Home/>}/>
      <Route path = "/about" element={<About/>}/>
      <Route path = "/contact" element={<Contact/>}/>
    </Routes>
  </div>

  );
}

export default App;
