import { Color } from 'three';
import { IfcViewerAPI } from 'web-ifc-viewer';

const container = document.getElementById('viewer-container');
const viewer = new IfcViewerAPI({ container, backgroundColor: new Color(0xffffff) });

// Create grid and axes
viewer.grid.setGrid();
viewer.axes.setAxes();



async function loadIfc(url) {
		// Load the model
    const model = await viewer.IFC.loadIfcUrl(url);

		// Add dropped shadow and post-processing efect
    await viewer.shadowDropper.renderShadow(model.modelID);
    viewer.context.renderer.postProduction.active = true;
}

loadIfc("./02pt.ifc");

// window.onclick = () => {
//     viewer.IFC.selector.pickIfcItem();

//     window.onclick = async ()=> {
//         const found = await viewer.IFC.selector.pickIfcItem();
//         const result = await viewer.IFC.loader.ifcManager.getItemProperties(found.modelID,found.id)
//         console.log(result);

//     }

// }


// ... Tu código existente ...

window.onclick = async () => {
    viewer.IFC.selector.pickIfcItem();

    window.onclick = async () => {
        const found = await viewer.IFC.selector.pickIfcItem();
        const result = await viewer.IFC.loader.ifcManager.getItemProperties(found.modelID, found.id);
        console.log(result);

        // Obtener información específica de volumen y área
        const volumeProperty = result.properties.find(prop => prop.name === 'Volume');
        const areaProperty = result.properties.find(prop => prop.name === 'Area');

        if (volumeProperty) {
            console.log(`Volumen: ${volumeProperty.value} ${volumeProperty.units}`);
        }

        if (areaProperty) {
            console.log(`Área: ${areaProperty.value} ${areaProperty.units}`);
        }
    };
};




