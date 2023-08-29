// import React, { useRef, useEffect, useState } from 'react';
// import * as THREE from 'three';
// import { AmbientLight, DirectionalLight, PerspectiveCamera, Raycaster, Vector2 } from 'three';
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// import { IFCLoader } from "web-ifc-three/IFCLoader";
// import { acceleratedRaycast, computeBoundsTree, disposeBoundsTree} from "three-mesh-bvh"


// const Model3D = () => {
//     const mountRef = useRef();
//     const [ifcFile, setIfcFile] = useState();

//     useEffect(() => {
//         if (!ifcFile) return;

//         const currentRef = mountRef.current;
//         const { clientWidth: width, clientHeight: height } = currentRef;

//         const scene = new THREE.Scene();

//         const camera = new THREE.PerspectiveCamera(100, width / height, 0.1, 1000);
//         camera.position.z = 5;

//         const renderer = new THREE.WebGLRenderer({ antialias: true });
//         renderer.setSize(width, height);
//         currentRef.appendChild(renderer.domElement);

//         const controls = new OrbitControls(camera, renderer.domElement);
    
//         // IFC loader 
//         const ifcModels=[]
//         const ifcLoader = new IFCLoader();
//         console.log(ifcLoader);

//         ifcLoader.ifcManager.setWasmPath("../../");
//             ifcLoader.load(ifcFile, (ifcModel) => {
//             console.log(ifcModel);
//             scene.add(ifcModel);
//             ifcModels.push(ifcModel);
//             ifcModel.traverse((child) => {
//                 if (child.isMesh) {
//                     child.raycast = acceleratedRaycast;
//                     child.geometry.computeBoundsTree = computeBoundsTree;
//                     child.geometry.disposeBoundsTree = disposeBoundsTree;
//                 }
//             });
//         });





//         const resize = () => {
//             renderer.setSize(currentRef.clientWidth, currentRef.clientHeight);
//             camera.aspect = currentRef.clientWidth / currentRef.clientHeight;
//             camera.updateProjectionMatrix();
//         };
//         window.addEventListener("resize", resize);

//         const axesHelper = new THREE.AxesHelper(2);
//         scene.add(axesHelper);

//         const gridHelper = new THREE.GridHelper(150, 150);
//         scene.add(gridHelper);

//         const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
//         scene.add(ambientLight);

//         const animate = () => {
//             requestAnimationFrame(animate);
//             controls.update();
//             renderer.render(scene, camera);
//         };

//         animate();

//         return () => {
//             renderer.dispose();
//             window.removeEventListener("resize", resize);
//         };

//     }, [ifcFile]);



//     const handleFileChange = (e) => {
//         const files = e.target.files;
//         if (files.length > 0) {
//             var ifcURL = URL.createObjectURL(files[0]);
//             setIfcFile(ifcURL);
//         }
//     };



//     // PIKING ELEMENTS 
//     ifcLoader.ifcManager.setupThreeMeshBVH(
//         computeBoundsTree,
//         disposeBoundsTree,
//         acceleratedRaycast)

//         const raycaster = new Raycaster();
// raycaster.firstHitOnly = true;
// const mouse = new Vector2();

// function cast(event) {

//   // Computes the position of the mouse on the screen
//   const bounds = threeCanvas.getBoundingClientRect();

//   const x1 = event.clientX - bounds.left;
//   const x2 = bounds.right - bounds.left;
//   mouse.x = (x1 / x2) * 2 - 1;

//   const y1 = event.clientY - bounds.top;
//   const y2 = bounds.bottom - bounds.top;
//   mouse.y = -(y1 / y2) * 2 + 1;

//   // Places it on the camera pointing to the mouse
//   raycaster.setFromCamera(mouse, camera);

//   // Casts a ray
//   return raycaster.intersectObjects(ifcModels);
// }

// function pick(event) {
//     const found = cast(event)[0];
//     if (found) {
//         const index = found.faceIndex;
//         const geometry = found.object.geometry;
//         const ifc = ifcLoader.ifcManager;
//         const id = ifc.getExpressId(geometry, index);
//         console.log(id);
//     }
// }

// threeCanvas.ondblclick = (event) => pick(event);




//     return (
//         <div style={{ width: '100%', height: '100vh' }}>
//             <input type="file" onChange={handleFileChange} accept=".ifc" />
//             <div ref={mountRef} style={{ width: '100%', height: 'calc(100% - 30px)' }}></div>
//         </div>
//     );
// }

// export default Model3D;

import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { AmbientLight, DirectionalLight, PerspectiveCamera, Raycaster, Vector2, MeshLambertMaterial } from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { IFCLoader } from "web-ifc-three/IFCLoader";
import { acceleratedRaycast, computeBoundsTree, disposeBoundsTree } from "three-mesh-bvh";

const Model3D = () => {
    const mountRef = useRef();
    const [ifcFile, setIfcFile] = useState();

    useEffect(() => {
        if (!ifcFile) return;

        const currentRef = mountRef.current;
        const { clientWidth: width, clientHeight: height } = currentRef;

        const scene = new THREE.Scene();

        const camera = new THREE.PerspectiveCamera(100, width / height, 0.1, 1000);
        camera.position.z = 5;

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(width, height);
        currentRef.appendChild(renderer.domElement);

        const controls = new OrbitControls(camera, renderer.domElement);
    
        const ifcModels = [];
        const ifcLoader = new IFCLoader();
        
        
        
        async function LoadIFC() {
            await ifcLoader.ifcManager.setWasmPath("../../");
            ifcLoader.load(ifcFile, (ifcModel) => {
                console.log(ifcModel);
                scene.add(ifcModel);
                ifcModels.push(ifcModel);

                
            })
        }
        LoadIFC();
        

       




    // RESIZE

        const resize = () => {
            renderer.setSize(currentRef.clientWidth, currentRef.clientHeight);
            camera.aspect = currentRef.clientWidth / currentRef.clientHeight;
            camera.updateProjectionMatrix();
        };

        window.addEventListener("resize", resize);

        const axesHelper = new THREE.AxesHelper(2);
        scene.add(axesHelper);

        const gridHelper = new THREE.GridHelper(350, 350);
        scene.add(gridHelper);

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
        scene.add(ambientLight);


        // CREATE AN INSTANCE OF THE REYCASTER

        const raycaster = new Raycaster();
        raycaster.firstHitOnly = true;
        const mouse = new Vector2();

        // CAST EVENT

        function cast(event) {
            // Computes the position of the mouse on the screen
            const bounds = threeCanvas.getBoundingClientRect();
          
            const x1 = event.clientX - bounds.left;
            const x2 = bounds.right - bounds.left;
            mouse.x = (x1 / x2) * 2 - 1;
          
            const y1 = event.clientY - bounds.top;
            const y2 = bounds.bottom - bounds.top;
            mouse.y = -(y1 / y2) * 2 + 1;
          
            // Places it on the camera pointing to the mouse
            raycaster.setFromCamera(mouse, camera);
          
            // Casts a ray
            return raycaster.intersectObjects(ifcModels);
          }





        // PICK EVENT

        function pick(event) {
            const found = cast(event)[0];
            if (found) {
              const index = found.faceIndex;
              const geometry = found.object.geometry;
              const ifc = ifcLoader.ifcManager;
              const id = ifc.getExpressId(geometry, index);
              console.log(id);
            }
          }

        // listener event
        threeCanvas.ondblclick = pick;

        animate();

        return () => {
            renderer.dispose();
            window.removeEventListener("resize", resize);
            currentRef.removeEventListener('dblclick', pick);
        };

    }, [ifcFile]);

            // Creates subset material
        const preselectMat = new MeshLambertMaterial({
            transparent: true,
            opacity: 0.6,
            color: 0xff88ff,
            depthTest: false,
        });



    const handleFileChange = (e) => {
        const files = e.target.files;
        if (files.length > 0) {
            const ifcURL = URL.createObjectURL(files[0]);
            setIfcFile(ifcURL);
        }
    };

    return (
        <div style={{ width: '100%', height: '100vh' }}>
            <input type="file" onChange={handleFileChange} accept=".ifc" />
            <div ref={mountRef} style={{ width: '100%', height: 'calc(100% - 30px)' }}></div>
        </div>
    );
};

export default Model3D;
