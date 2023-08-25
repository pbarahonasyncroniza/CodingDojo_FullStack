import React, { ChangeEvent, useRef, useState } from "react";
import { IfcViewerAPI } from "web-ifc-viewer";

const IfcContainer: React.FC = () => {
  const [viewer, setViewer] = useState<IfcViewerAPI.Viewer | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const file = event.target.files[0];
    const loader = new IfcViewerAPI.Loader();
    loader.load(file, (result) => {
      setViewer(result);
    });
  };

  return (
    <div>
      <input ref={fileInputRef} type="file" id="file-input" accept=".ifc" />
      <button onClick={() => fileInputRef.current?.click()}>Cargar archivo IFC</button>
      {viewer && (
        <div
          className={"ifcContainerViewer"}
          ref={(el) => viewer.container = el}
          onDoubleClick={() => viewer.IFC.selector.pickIfcItem()}
          onContextMenu={() => viewer.IFC.selector.pickIfcItem()}
          onMouseMove={() => viewer.IFC.selector.prePickIfcItem()}
          style={{
            position: "relative",
            width: "100vw",
            height: "100vh",
            overflow: "hidden",
          }}
        />
      )}
    </div>
  );
};

export default IfcContainer;
