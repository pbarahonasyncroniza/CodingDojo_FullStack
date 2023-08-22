import React from 'react';
import IFCViewerComponent from './components/IFCviewerComponent';

function App() {
  return (
    <div className="App">
      <IFCViewerComponent modelUrl="./01prueba.ifc" />
    </div>
  );
}

export default App;
