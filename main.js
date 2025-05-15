import Map from 'ol/Map.js';
import View from 'ol/View.js';
import Draw from 'ol/interaction/Draw.js';
import {getCenter} from 'ol/extent.js';
import ImageLayer from 'ol/layer/Image.js';
import VectorLayer from 'ol/layer/Vector.js';
import VectorSource from 'ol/source/Vector.js';
import Projection from 'ol/proj/Projection.js';
import Static from 'ol/source/ImageStatic.js';

// Map views always need a projection.  Here we just want to map image
// coordinates directly to map coordinates, so we create a projection that uses
// the image extent in pixels.
const extent = [0, 0, 5000, 2500];
const antaceaProjection = new Projection({
  code: 'antacea-projection',
  units: 'pixels',
  extent: extent,
});

// this is needed because we are referring to the vector source later,
// ,when we do the type selector thing and draw the shapes
// this will be added to countryLayer
const drawnShapes = new VectorSource({wrapX: false})

// all the layers!
const drawingLayer = new VectorLayer({source: drawnShapes})
const satelliteLayer = new ImageLayer({
  source: new Static({
    attributions: "if you see bugs report them or something idk",
    url: 'assets/satelliteMap.png',
    projection: antaceaProjection,
    imageExtent: extent,
  }),
})

// the map with vector and image layer
const antaceaMap = new Map({
  target: 'antacea-map',
  layers: [
    satelliteLayer,
    drawingLayer
  ],
  view: new View({
    projection: antaceaProjection,
    center: getCenter(extent),
    zoom: 3,
    maxZoom: 8,
  }),
});

// getting the selected type from the html selector.
// like the shape Type selector and it gets it from the selector you get it dude
const shapeTypeSelect = document.getElementById('shape-type');

let shapeDraw; // global so we can remove it later
function addInteraction() {
  if (shapeTypeSelect.value !== "None") {
    shapeDraw = new Draw({
      source: drawnShapes,
      type: shapeTypeSelect.value,
    });
    antaceaMap.addInteraction(shapeDraw);
  }
}
// Handle change event (idk this either)
shapeTypeSelect.onchange = function () {
  antaceaMap.removeInteraction(shapeDraw);
  addInteraction();
};
document.getElementById('drawUndo').addEventListener('click', function () {
  shapeDraw.removeLastPoint();
});

addInteraction();