import React from 'react';
import  { Button, Container} from "@mui/material"
import LoadLocalIFC from './components/LoadLocalIFC';
import NestedList from './components/NestedList';


function App() {
  return (
    <div className="App">
      <Container>
        
      <LoadLocalIFC  /> 
      <NestedList />
      </Container>
    </div>
  );
}

export default App;
