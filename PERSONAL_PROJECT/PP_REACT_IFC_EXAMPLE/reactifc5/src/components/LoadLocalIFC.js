import React , {useState, useRef, useEffect} from "react"
import { IfcViewerAPI } from "web-ifc-viewer";


    const LoadLocalIFC = () => {

        const viewerRef = useRef();
        
        useEffect (()=>{    
            const container = document.getElementById("local-ifc-container");
            const viewerAPI = new IfcViewerAPI({ container });
            viewerAPI.axes()
            viewerAPI.grid()
            viewerAPI.IFC.setWasmPath("/wasm");
            viewerRef.current = viewerAPI;
            viewerRef.current.IFC.loadIfcUrl("static/PT.ifc", true)

        }, [])

        return(
            
            <div
                id="local-ifc-container"
                style={{
                    position: "relative",
                    height: "80vh",
                    width: "80vw",
                }}
            ></div>






        )



    }

    export default LoadLocalIFC