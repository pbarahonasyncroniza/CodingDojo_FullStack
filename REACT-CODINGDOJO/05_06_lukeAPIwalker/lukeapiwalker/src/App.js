import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from "react"; 
import axios from "axios";
import {Form, useNavigate} from "react-router-dom"


const  App=() => {
  const [selectedPath, setSelectedPach] = useState ("/path")
  const [Id, setId] = useState(null);
  
  const search =() =>{
      if (selectedPath && id){
        axios.get (`https://swapi.dev/api/${selectedPath}/${id}`)
        .then((response)=>{
          console.log(response)
        }).catch((error)=>{
          console.log(error)
        })

    }
  }, [selectedPath, id])
  
  
  return (
    <div>
      <form>
       <label htmlFor="resource">Select a Field</label>
        <select value = {selectedPath} onChange={(e) => setSelectedPath(e.target.value)}> 
            <options value= {"/people"}>People</options>
            <options value= {"/films"}>Films</options>
            <options value= {"vehicles"}>Vehicles</options>
        </select>
            <input type = "text"/>
            <button>Search</button>
            <input type="number" value={id} onChange={(e) => setId(e.target.value)}/>
            <button onClick={() =>
            {search();}}
            >Search...</button>
        </form>

    <div>
          {data ?
          
          
          
          }
      
      
    </div>            


    </div>
  );
};

export default App;
