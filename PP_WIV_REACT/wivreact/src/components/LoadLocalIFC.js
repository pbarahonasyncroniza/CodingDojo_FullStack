import React, { useEffect, useRef, useState } from "react";
import { IfcViewerAPI } from "web-ifc-viewer";
import IfcTreeItem from "./IfctreeItem";
import Typography from "@mui/material/Typography";
import { Color, LineBasicMaterial, MeshBasicMaterial } from "three";
import { Button, Grid, Container, Box, IconButton } from "@mui/material";
import StraightenIcon from "@mui/icons-material/Straighten";
import OpenModal from "../components/OpenModal";
import Filter3D from "../components/Filter3D";
import FloorPlanViewer from "./FloorPlanViewer";
import { Select, MenuItem } from '@mui/material';

import {
  IFCWALLSTANDARDCASE,
  IFCSLAB,
  IFCDOOR,
  IFCWINDOW,
  IFCFURNISHINGELEMENT,
  IFCMEMBER,
  IFCPLATE
} from 'web-ifc';

const categories = {
  IFCWALLSTANDARDCASE,
  IFCSLAB,
  IFCFURNISHINGELEMENT,
  IFCDOOR,
  IFCWINDOW,
  IFCPLATE,
  IFCMEMBER
};

const LoadLocalIFC = () => {
  const viewerRef = useRef();
  const fileInputRef = useRef(null);
  const [sectionData, setSectionData] = useState();
  const [treeData, setTreeData] = useState(null);
  const [model, setModel] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [isDimensionActive, setDimensionActive] = useState(false);
  const [allPlans, setAllPlans] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [subsets, setSubsets] = useState({});
  const [isClippingPaneSelected, setClippingPaneSelected] = useState(false);
  



  const [filters, setFilters] = useState({
    IFCWALLSTANDARDCASE: true,
    IFCSLAB: true,
    IFCFURNISHINGELEMENT: true,
    IFCDOOR: true,
    IFCWINDOW: true,
    IFCPLATE: true,
    IFCMEMBER: true,
  });

  
  useEffect(() => {

    // DEFINICION DE LA ESCENA 

    const container = document.getElementById("viewer-container");
    const viewer = new IfcViewerAPI({
      container,
      backgroundColor: new Color(),
    
    });

    // Wasm Files Path
    //-------------------------------------------------------------------------------------------------
    viewer.IFC.setWasmPath("../../");
    viewerRef.current = viewer;
    
   
    //---------------------------------------------------------------------------------------------
    // Onclick event method
    //---------------------------------------------------------------------------------------------
 


   
    window.onmousemove =()=> viewer.IFC.selector.prePickIfcItem();
    
    window.onclick = async () => {
      viewer.IFC.selector.pickIfcItem();
      
      
      window.onclick = async () => {
        const found = await viewer.IFC.selector.pickIfcItem();

        //-------------------------------------------------------------------------------------------
				//Get Properties from IFC model
				//-------------------------------------------------------------------------------------------

       
        if (found) {
          const result = await viewer.IFC.loader.ifcManager.getItemProperties(
            found.modelID,
            found.id
          );
          const result1 = await viewer.IFC.loader.ifcManager.getIfcType(
            found.modelID,
            found.id
          );
          
          const result2 = await viewer.IFC.loader.ifcManager.getPropertySets(found.modelID,
            found.id,true
          );

          setModalOpen(true);

          console.log("GetItemsProperties",result);
          console.log("GetIFcType",result1);
          console.log("GetPropertySets",result2);  
          //-------------------------------------------------------------------------------------------
          //Get Quantities
          //-------------------------------------------------------------------------------------------
        
        const extractValue = (quantitiesArray, key, name) => {
          // Busca en el arreglo por la clave especificada y devuelve el valor si lo encuentra
          const item = quantitiesArray.find(quantity => quantity[key] && quantity.Name.value === name);
          return item ? item[key].value : null;
        };
        
        // Usamos el método find para buscar el objeto IfcElementQuantity dentro de result2
        const elementQuantity = result2.find(item => item.Quantities);

        let data = {
          name: result.Name.value,
          ExpressID: result.expressID,
          ObjectType: result.ObjectType.value,
          Tag: result.Tag.value,
          IfcCategory: result1
        }
        
        if (elementQuantity) {
          // Usamos la función extractValue para obtener los valores de interés
          const volumenValue = extractValue(elementQuantity.Quantities, 'VolumeValue', "NetVolume");
          const areaValue = extractValue(elementQuantity.Quantities, 'AreaValue', 'NetSideArea');
          const heightValue = extractValue(elementQuantity.Quantities, 'LengthValue', 'Height');
          const lengthValue = extractValue(elementQuantity.Quantities, 'LengthValue', 'Length');
          const widthValue = extractValue(elementQuantity.Quantities, 'LengthValue', 'Width');
        
          data = {
            ...data,
            Height: heightValue,
            Length: lengthValue,
            Width: widthValue,
            Volumen: volumenValue,
            Area: areaValue,
          }
        }

        setSectionData(data);

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
      // FLOOR PLANS
      //---------------------------------------------------------------------------------------------

      const showFloorPlans = async () => {
    
        const viewer = viewerRef.current;
        const modelID = model.modelID;
        console.log("Model ID",modelID)

        // Setup camera controls
	      const controls = viewer.context.ifcCamera.cameraControls;
	      controls.setPosition(7.6, 4.3, 24.8, false);
	      controls.setTarget(-7.1, -0.3, 2.5, false);


    
        const viewerPlans= await viewer.plans.computeAllPlanViews(modelID);
        console.log("vista de planos ",viewerPlans)
    
        const lineMaterial = new LineBasicMaterial({ color: 'black' });
        const baseMaterial = new MeshBasicMaterial({
            polygonOffset: true,
            polygonOffsetFactor: 1, // positive value pushes polygon further away
            polygonOffsetUnits: 1,
        });
        
        const plansFromViewer = viewer.plans.getAll(modelID);
        let collectedPlans = [];
    
        for (const expressID of plansFromViewer) {
          console.log(expressID)  
                  
            const allPlansData = viewer.plans.planLists[modelID][expressID];
            console.log("Conseguir allplans", allPlansData);
    
            collectedPlans.push(allPlansData);
        }
    
        setAllPlans(collectedPlans);




    }
    



    //-----------------------------------------------------------------------------------------------
    // FILTER 3D
    //-----------------------------------------------------------------------------------------------

  async function setupAllCategories() {
    const allCategories = Object.values(categories);
    for (let i = 0; i < allCategories.length; i++) {
      const category = allCategories[i];
      await setupCategory(category);
    }
  }

  // Creates a new subset and configures the checkbox
  async function setupCategory(category) {
    subsets[category] = await newSubsetOfType(category);
    setSubsets(subsets)
  }

  async function newSubsetOfType(category) {
    const ids = await getAll(category);

    return viewerRef.current.IFC.loader.ifcManager.createSubset({
      modelID: 0,
      ids: ids,
      // material: material,
      scene: viewerRef.current.getScene,
      removePrevious: true,
    })
}

async function getAll(category) {
  return viewerRef.current.IFC.loader.ifcManager.getAllItemsOfType(0, category, false);
}


//---------------------------------------------------------------------------------------------
      // CLIPING PLANES
      //---------------------------------------------------------------------------------------------
      const toggleClippingPlanes = ()=>{
        const viewer = viewerRef.current;
        console.log("que muestera viewer",viewer)
        const createPlane = viewer.clipper.createPlane();
        console.log("Creacion de Plano",createPlane)
       if(viewer){
        viewer.toggleClippingPlanes();
        if(viewer.clipper.active){
          setClippingPaneSelected(true)
        }else{
          setClippingPaneSelected(false)
        }

       }
       }

       window.onkeydown =(e)=>{
        const viewer = viewerRef.current;
        if(e.code ==="KeyP"){
          viewer.clipper.createPlane();
        }

       }

      //  const ifcOnRightClick = async () => {
      //   const viewer = viewerRef.current;
      //   console.log(viewer)
      //   if (viewer) {
      //     viewer.clipper.createPlane();
      //     viewer.clipper.deleteAllPlanes();
      //   }
      // }

  //---------------------------------------------------------------------------------------------
  //HANDLERS - CARGA DEL MODELO - CARGA DE SPACIALSTRUCTURE
  //---------------------------------------------------------------------------------------------

  const handleFilterChange = (categoryName, isChecked, category) => {
    setFilters({ ...filters, [categoryName]: isChecked });
    const subset = subsets[category];
    // console.log("Eliminando", subset, subsets);
    if (isChecked) viewerRef.current.getScene.add(subset);
    else subset.removeFromParent();
  };

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
        setModel(model);
        // console.log("Model loaded:", model);
        // console.log("Model name:", selectedFile.name);

        // Obtener la estructura espacial
        const spatialStructure =
          await viewerRef.current.IFC.getSpatialStructure(model.modelID);
        setTreeData(spatialStructure);
        setupAllCategories();
        // console.log(spatialStructure);
      } catch (error) {
        console.log("Error loading model:", error);
      }
    }
  };


  // encargado de la carga del File muy importante
  const handleFileUpload = () => {
    fileInputRef.current.click();
  };

  // encargado de cargar Floors
  const handleLevelSelect = (expressID) =>{
    setSelectedLevel(expressID)
    const viewer = viewerRef.current;
    if(selectedLevel){
    const viewPlans =viewer.plans.goTo(model.modelID, expressID)
    .then(viewPlans=>{
      console.log("Funcionamiento TOGO", viewPlans)
    })
    .catch(error=>{
      console.error("Error al acceder Floor", error)
    })
    // viewer.edges.toggle("example", true)
    }
  }
    const handleExitFloorPlan = () => {
    const viewer = viewerRef.current;
    
    // Restablecer la vista 3D
    const existFloorPlans=viewer.plans.exitPlanView(model.modelID);
    console.log(existFloorPlans)
    // viewer.render();
    }


  

  //-----------------------------------------------------------------------------------------------
  //JSX
  //-----------------------------------------------------------------------------------------------
  return (
    <Box
      
      sx={{ backgroundColor: "#EFEBEB", mt: 6, ml: 0, mr: 0 }}>
      {viewerRef.current && (
        <Filter3D
          filters={filters}
          onFilterChange={handleFilterChange}
        />
      )}
{/* --------------------------------------------------------------- */}
      <Box>
        <Button 
        onClick={showFloorPlans}
        variant="contained"
        >Floor Plans
        </Button>
      </Box>

      <Box>
  {
    allPlans && Array.isArray(allPlans) 
    ? allPlans.map(plan => (
        <div key={plan.expressID}>
          <p>{plan.name}</p>
          <button onClick={() => handleLevelSelect(plan.expressID)}>
            Seleccionar este nivel
          </button>
        </div>
      ))
    : <p>No Floors Available </p>
  }
</Box>

        <Button
          onClick={handleExitFloorPlan}
           variant="contained"
          >Exit Floor Plan
        </Button>
{/* ------------------------------------------------------------------ */}
    <Box>
      <Button 
      variant="contained"
      key={"showPlane"}
      onClick={()=>toggleClippingPlanes()}
      selected={isClippingPaneSelected}
            >Clipping Planes
      </Button>
      </Box>





      <Box>
        <Button
          onClick={handleFileUpload}
          variant="contained"
          // color="success"
          sx={{ marginLeft: 10, mb: 2, marginTop: "25px" }}>
          Load File
        </Button>
      </Box>

      <IconButton onClick={handleDimensionClick}>
        <StraightenIcon />
      </IconButton>

      <OpenModal
        isOpen={modalOpen}
        handleClose={() => setModalOpen(false)}
        sectionData={sectionData}
      />

      <input
        type="file"
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      <Box>
        <Grid container spacing={3} sx={{ marginLeft: 10 }}>
          <Grid item xl={2}></Grid>

          {/* Contenedor de visualización (Derecha) */}
          <Grid item xl={7} sx={{ mt: 2, mb: 2 }}>
            <div id="viewer-container" sx={{ backgroundColor: "blue" }}></div>
          </Grid>
          <Grid item xl={3}>
            <Typography sx={{ fontSize: 18 }}>SPACIAL TREE</Typography>
            <div
              style={{
                height: "500px",
                width: "250px",
                overflowY: "scroll",
                marginLeft: "10px",
              }}>
              {treeData && (
                <IfcTreeItem
                  node={treeData}
                  sx={{ fontSize: 15, marginRight: 10 }}
                />
              )}
            </div>
          </Grid>
        </Grid>
      </Box>

     

    </Box>
  );
};

export default LoadLocalIFC;
