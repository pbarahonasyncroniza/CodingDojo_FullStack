import logo from './logo.svg';
import './App.css';
import {useState} from "react"
import Description from "./componentes/Description/description.component"

const App =() => {
const [description, setDescription ] = useState("")
const [taskList, settaskList] = useState ([]);



  return (
    <div>
      <div>
        <Description
         onAddtask={handleAddTask}
         description={description}
         setDescription={setDescription}

      />
      </div>
      <div>
        <List
         

      />
      </div>
    
    
    
    </div>
  );
}

export default App;
