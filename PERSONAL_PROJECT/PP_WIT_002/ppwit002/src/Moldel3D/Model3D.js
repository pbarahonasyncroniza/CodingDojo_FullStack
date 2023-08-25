import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { IFCLoader } from "web-ifc-three/IFCLoader";

const Model3D = () => {
    const mountRef = useRef(null);
    const [ifcFile, setIfcFile] = useState(null);

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
    
        const ifcLoader = new IFCLoader();
        ifcLoader.ifcManager.setWasmPath("./wasm");
        
        ifcLoader.load(ifcFile, (ifcModel) => {
            scene.add(ifcModel);
        }, undefined, (error) => {
            // console.error('Error al cargar el archivo IFC:', error);
        });

        const resize = () => {
            renderer.setSize(currentRef.clientWidth, currentRef.clientHeight);
            camera.aspect = currentRef.clientWidth / currentRef.clientHeight;
            camera.updateProjectionMatrix();
        };
        
        window.addEventListener("resize", resize);

        const axesHelper = new THREE.AxesHelper(2);
        scene.add(axesHelper);

        const gridHelper = new THREE.GridHelper(50, 50);
        scene.add(gridHelper);

        const animate = () => {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        };

        animate();

        return () => {
            renderer.dispose();
            window.removeEventListener("resize", resize);
        };

    }, [ifcFile]);

    const handleFileChange = (e) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            setIfcFile(files[0]);
        }
    };

    return (
        <div style={{ width: '100%', height: '100vh' }}>
            <input type="file" onChange={handleFileChange} accept=".ifc" />
            <div ref={mountRef} style={{ width: '100%', height: 'calc(100% - 30px)' }}></div>
        </div>
    );
}

export default Model3D;
