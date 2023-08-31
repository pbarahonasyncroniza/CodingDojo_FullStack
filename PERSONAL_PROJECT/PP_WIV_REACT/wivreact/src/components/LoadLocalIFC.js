import React, { Fragment, useEffect, createRef, useRef, useState } from "react";
import { IfcViewerAPI } from "web-ifc-viewer";
import IfcTreeItem from "./IfctreeItem";
import  { Button, Grid, Paper} from "@mui/material"



const LoadLocalIFC = () => {
  
  const viewerRef = useRef();
  const [sectionData, setSectionData ] = useState({});
  const [treeData, setTreeData ] = useState(null);
  const fileInputRef = useRef(null);

  
    useEffect(() => {

    const container = document.getElementById("viewer-container");
        const viewer = new IfcViewerAPI({ container });
    
  // Wasm Files Path
  //-------------------------------------------------------------------------------------------------
        viewer.IFC.setWasmPath("../../");
        viewerRef.current = viewer;
       
      //---------------------------------------------------------------------------------------------
      // Onclick event method
      //---------------------------------------------------------------------------------------------
        window.onclick = async () => {
          viewer.IFC.selector.pickIfcItem();
          
          window.onclick = async () => {
            const found = await viewer.IFC.selector.pickIfcItem();
            
            if (found) {
              const result = await viewer.IFC.loader.ifcManager.getItemProperties(found.modelID, found.id);
              // const result1 = await viewer.IFC.loader.ifcManager.getIfcType(found.modelID, found.id);
              
              console.log(result);
              // console.log(result1);
             
        //-------------------------------------------------------------------------------------------
        //Get Properties from IFC model 
        //-------------------------------------------------------------------------------------------      
              setSectionData({
                
                ExpressID:result.expressID,
                name:result.Name.value,
                ObjectType:result.ObjectType.value,
                Tag:result.Tag.value,
                // IfcCategory:result1
              })
            }
          }; 
        };
        
      }, []);


      //---------------------------------------------------------------------------------------------
      //HANDLERS
      //---------------------------------------------------------------------------------------------
      
      const handleFileChange = async (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
          // Realiza la carga del archivo
          try {
            const model = await viewerRef.current.IFC.loadIfc(selectedFile, true);
            // console.log("Model loaded:", model);
            
            // Obtener la estructura espacial
            const spatialStructure = await viewerRef.current.IFC.getSpatialStructure(model.modelID);
            setTreeData(spatialStructure)
            console.log(spatialStructure);
            
          } catch (error) {
            console.log("Error loading model:", error);
          }
        }
      };
      
        

        const handleFileUpload = () => {
          fileInputRef.current.click();
        };
    

      

    //-----------------------------------------------------------------------------------------------
    //JSX
    //-----------------------------------------------------------------------------------------------
    return (
            
    <Fragment>
      <input
        type="file"
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={handleFileChange}
      />
       <Button
        onClick={handleFileUpload}
        variant="contained"
        color="primary"
        style={{ marginTop: "1rem" }}
      >
        Load File
      </Button>
        <Grid container spacing={4} style={{ width: "100%", height: "100vh" }}>
            {/* Metadatos (Izquierda) */}
            <Grid 
            item 
            xl={3}
          >

          <Paper elevation={1} style={{ padding: "1rem" }}>
            {sectionData && (
              <div>
                <h3>Name: {sectionData.name}</h3>
                <p>IFC Category: {sectionData.IfcCategory}</p>
                <p>ExpressId: {sectionData.ExpressID}</p>
                <p>ObjectType: {sectionData.ObjectType}</p>
                <p>Tag: {sectionData.Tag}</p>
              </div>
          


            )}
          </Paper>
        </Grid>

          {/* Contenedor de visualización (Derecha) */}
          <Grid item  xl={9} >
            <div
              id="viewer-container"
              // style={{
              //   position: "relative",
              //   height: "50vh",
              //   width: "100%",
              // }}
            ></div>
            {treeData && <IfcTreeItem node={treeData} />}
            
          </Grid>
        </Grid>
     
             
      </Fragment>
          );
        };

        export default LoadLocalIFC;
