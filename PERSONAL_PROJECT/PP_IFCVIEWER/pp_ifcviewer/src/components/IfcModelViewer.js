

import React, { useEffect, useRef } from 'react';
import { IfcViewerAPI } from "web-ifc-viewer";

function IfcModelViewer({ modelPath }) {
    const viewerRef = useRef(null);
    const viewer = useRef(new IfcViewerAPI());

    useEffect(() => {
        if (!viewerRef.current) return;
        
        viewer.current.initializeViewer();
        viewer.current.loadIfc(modelPath, true);
    }, [modelPath]);

    return (
        <div ref={viewerRef} style={{ width: '100%', height: '500px' }}></div>
    );
}

export default IfcModelViewer;
