import React from 'react';
import  { Button, Container, container} from "@mui/material"
import LoadLocalIFC from './components/LoadLocalIFC';
// import Header from './components/Header';


function App() {
  return (
    <div className="App">
      <Container>
        <Button variant='contained' color="success" mt-5>Import</Button>
      <LoadLocalIFC  />
      </Container>
    </div>
  );
}

export default App;
