import React, { useRef, useEffect } from 'react';
import { Color } from 'three';
import { IfcViewerAPI } from "web-ifc-viewer"

const IFCViewerComponent = ({ modelUrl }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const viewer = new IfcViewerAPI({
      container: containerRef.current,
      backgroundColor: new Color(0xffffff),
    });

    async function loadIfc(url) {
      const model = await viewer.IFC.loadIfcUrl(url);
      await viewer.shadowDropper.renderShadow(model.modelID);
      viewer.context.renderer.postProduction.active = true;
    }

    loadIfc(modelUrl);

    const handlePickClick = async () => {
      const found = await viewer.IFC.selector.pickIfcItem();
      const result = await viewer.IFC.loader.ifcManager.getItemProperties(found.modelID, found.id);
      console.log(result);
    };

    window.addEventListener('click', handlePickClick);

    return () => {
      window.removeEventListener('click', handlePickClick);
    };
  }, [modelUrl]);

  return <div ref={containerRef} style={{ width: '100%', height: '100vh' }} />;
};

export default IFCViewerComponent;
