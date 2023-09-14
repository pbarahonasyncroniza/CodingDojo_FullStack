import React from 'react';
import { useRef } from 'react';
import { useState , useContext} from 'react';
import LoadLocalIFC from './components/LoadLocalIFC';
import MiniDrawer from "./components/Drawer"
// import  {FileUploadProvider} from "./components/FileUploadContext"
import { DimensionProvider } from './components/DimesionControl'





function App() {

  const viewerRef = useRef(null);

  return (
    
    
    <DimensionProvider viewerRef={viewerRef}> 
        <div className="App">
          
          <LoadLocalIFC viewerRef={viewerRef}  />
          {/* <MiniDrawer /> */}
         
      </div>
    </DimensionProvider>
      // </FileUploadProvider>
      
 
  
  );
}

export default App;
