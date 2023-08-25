import React, { useRef, useEffect } from 'react';
import { Color } from 'three';
import { IfcViewerAPI } from "web-ifc-viewer"

const IFCViewerComponent = ({ modelUrl }) => {
  const containerRef = useRef(null);

  const container = document.getElementById("viewer-container");
  const viewer = new IfcViewerAPI({
  container,
  backgroundColor: new Color(0xffffff),
});
viewer.axes.setAxes();
viewer.grid.setGrid();

const input = document.getElementById("file-input");

window.ondblclick = () => viewer.IFC.selector.pickIfcItem(true);
window.onmousemove = () => viewer.IFC.selector.prePickIfcItem();
viewer.clipper.active = true;

window.onkeydown = (event) => {
  if (event.code === "KeyP") {
    viewer.clipper.createPlane();
  } else if (event.code === "KeyO") {
    viewer.clipper.deletePlane();
  }
};










  

  return <div ref={containerRef} style={{ width: '100%', height: '100vh' }} />;
};

export default IFCViewerComponent;
