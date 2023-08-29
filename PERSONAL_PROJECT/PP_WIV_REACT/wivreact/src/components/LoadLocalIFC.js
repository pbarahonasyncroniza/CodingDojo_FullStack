import React, { Fragment, useEffect, createRef, useRef, useState } from "react";
import { IfcViewerAPI } from "web-ifc-viewer";
import Dropzone from "react-dropzone";
import { IconButton } from "@material-ui/core";
import FolderOpenOutlinedIcon from "@material-ui/icons/FolderOpenOutlined";
import AddBoxIcon from '@mui/icons-material/AddBox';
import { Loader } from "three";
import { IfcProperties } from "web-ifc-viewer/dist/components/ifc/ifc-properties";



const LoadLocalIFC = () => {
  const dropzoneRef = createRef();
  const viewerRef = useRef();
  
    useEffect(() => {

    const container = document.getElementById("viewer-container");
    
    
    const viewer = new IfcViewerAPI({ container });
    viewer.addAxes();
    viewer.addGrid();

  // Wasm Files Path
  
    viewer.IFC.setWasmPath("../../");
    viewerRef.current = viewer;
    

    // Onclick event 
      //---------------------------------------------------------------------------------------------
    window.onclick = async () => {
      viewer.IFC.selector.pickIfcItem();
  
      window.onclick = async () => {
          const found = await viewer.IFC.selector.pickIfcItem();
          const result = await viewer.IFC.loader.ifcManager.getTypeProperties(found.modelID, found.id);
          const project = await viewer.IFC.loader.ifcManager.getSpatialStructure(found.modelID, found.id);
          console.log(result);
          console.log(project);
      //---------------------------------------------------------------------------------------------   
      const dataToSave = {
        properties: result,
        spatialStructure: project,
      };

      // Convertir a cadena JSON
      const jsonData = JSON.stringify(dataToSave, null, 2);

      // Crear un Blob y un enlace de descarga
      const blob = new Blob([jsonData], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "ifc_data.json";
      link.click();
      URL.revokeObjectURL(url);

      
      };
   };


    }, []);





      const onDrop = (files) => {
        viewerRef.current.IFC.loadIfc(files[0], true);
      };
      const handleClickOpen = () => {
        dropzoneRef.current.open();

    
      

  };

  return (
    <Fragment>
      <aside style={{ width: 50 }}>
        <IconButton onClick={handleClickOpen}>
          <AddBoxIcon />
        </IconButton> 
      </aside>
      <Dropzone ref={dropzoneRef} onDrop={onDrop}>
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps({ className: "dropzone" })}>
            <input {...getInputProps()} />
          </div>
        )}
        
      </Dropzone>
      <div
        id="viewer-container"
        style={{
          position: "relative",
          height: "60vh",
          width: "60vw",
        }}
      ></div>
    </Fragment>
  );
};

export default LoadLocalIFC;
