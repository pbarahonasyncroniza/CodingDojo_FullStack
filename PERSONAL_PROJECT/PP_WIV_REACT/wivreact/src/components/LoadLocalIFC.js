import React, { useEffect, useRef, useState } from "react";
import { IfcViewerAPI } from "web-ifc-viewer";
import IfcTreeItem from "./IfctreeItem";
import Typography from '@mui/material/Typography'
import  { Button, Grid,Container,Box,IconButton} from "@mui/material"
import StraightenIcon from '@mui/icons-material/Straighten';
import { Color } from "three";

import OpenModal from "../components/OpenModal";

const LoadLocalIFC = () => {
 
  
  const viewerRef = useRef();
  const [sectionData, setSectionData] = useState ()
  const [treeData, setTreeData ] = useState(null);
  const fileInputRef = useRef(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [isDimensionActive, setDimensionActive] = useState(false);
  
    useEffect(() => {

  const container = document.getElementById("viewer-container");
        const viewer = new IfcViewerAPI({ container, backgroundColor: new Color()});
    
  // Wasm Files Path
  //-------------------------------------------------------------------------------------------------
        viewer.IFC.setWasmPath("../../");
        viewerRef.current = viewer;
       
      //---------------------------------------------------------------------------------------------
      // Onclick event method
      //---------------------------------------------------------------------------------------------
        window.ondblclick = async () => {
          viewer.IFC.selector.pickIfcItem();
          
          window.ondblclick = async () => {
            const found = await viewer.IFC.selector.pickIfcItem();
            
            if (found) {
              const result = await viewer.IFC.loader.ifcManager.getItemProperties(found.modelID, found.id);
              const result1 = await viewer.IFC.loader.ifcManager.getIfcType(found.modelID, found.id);
              setModalOpen(true)
              
              console.log(result);
              console.log(result1);
             
              
          //-------------------------------------------------------------------------------------------
          //Get Properties from IFC model 
          //-------------------------------------------------------------------------------------------      
          if (result && result.Name && result.ObjectType && result.Tag) {    
          setSectionData({
                
                ExpressID:result.expressID,
                name:result.Name.value,
                ObjectType:result.ObjectType.value,
                Tag:result.Tag.value,
                IfcCategory:result1
              })
            }
            }
          }; 


          //-----------------------------------------------------------------------------------------
            // DIMENSIONS
          //-----------------------------------------------------------------------------------------  
           
          
    
        

            // viewer.dimensions.active = true;
            // viewer.dimensions.previewActive = true;

          //   window.ondblclick = ()=>{
          //     const newDimension = viewer.dimensions.create();
          //     if (newDimension) {
          //       newDimension.style.backgroundColor ="red"

          //     }
          //   }

          //   window.onkeydown = (e) =>{
          //     if(e.code === "delete") {
          //       viewer.dimensions.delete()
          //     }
            
          // }
          
        };
        
      }, []);


      //---------------------------------------------------------------------------------------------
      //HANDLERS - CARGA DEL MODELO - CARGA DE SPACIALSTRUCTURE
      //---------------------------------------------------------------------------------------------
      
      const handleDimensionClick = () => {
        const viewer = viewerRef.current;
        if (!isDimensionActive) {
          viewer.dimensions.active = true;
          viewer.dimensions.previewActive = true;
        } else {
          viewer.dimensions.active = false;
          viewer.dimensions.previewActive = false;
        }
        setDimensionActive(!isDimensionActive);
      };







      const handleFileChange = async (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
          // Realiza la carga del archivo
          try {
            const model = await viewerRef.current.IFC.loadIfc(selectedFile, true);
            console.log("Model loaded:", model);
            console.log("Model name:", selectedFile.name);
            
            // Obtener la estructura espacial
            const spatialStructure = await viewerRef.current.IFC.getSpatialStructure(model.modelID);
            setTreeData(spatialStructure)
            // console.log(spatialStructure);
            
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
            
<Container maxWidth sx={{backgroundColor:"#EFEBEB", mt:6, ml:0, mr:0}}>
            <Box>
              <Button
                onClick={handleFileUpload}
                variant="contained"
                // color="success"
                sx={{marginLeft: 10 ,mb:2,marginTop:"25px" }}
              >Load File</Button> 
            </Box>
  <IconButton onClick={handleDimensionClick}>
        <StraightenIcon />
      </IconButton>
<OpenModal isOpen={modalOpen} handleClose={() => setModalOpen(false)} sectionData={sectionData} />

      <input
        type="file"
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={handleFileChange}
      />
    
      <Box  >
        
        <Grid container spacing={3} sx={{marginLeft:10}}>
            <Grid item xl={2}>
              
            </Grid> 

          {/* Contenedor de visualización (Derecha) */}
          <Grid item xl={7} sx={{mt:2, mb:2}} >
            <div
              id="viewer-container"
              sx={{backgroundColor: "blue"
               
              }}
            ></div>
          </Grid>
          <Grid item xl={3}>    
          <Typography sx={{ fontSize:18}}>SPACIAL TREE</Typography>
            <div style={{height:"500px", width :"250px", overflowY: "scroll", marginLeft:"10px"}} >{treeData && <IfcTreeItem node={treeData} sx={{fontSize:15, marginRight:10}}/>}</div>
          </Grid>  
          


        </Grid>

      </Box>
      
      </Container>
          );
        };

        export default LoadLocalIFC;
