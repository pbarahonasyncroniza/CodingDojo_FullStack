import React from 'react';
import  { Button, Container} from "@mui/material"
import LoadLocalIFC from './components/LoadLocalIFC';
import IfcTreeItem from './components/IfctreeItem';



function App() {
  return (
    <div className="App">
      <Container>
        
      <LoadLocalIFC  /> 
      {/* <IfcTreeItem /> */}
      </Container>
    </div>
  );
}

export default App;
