import Map from 'ol/Map.js';
import View from 'ol/View.js';
import {getCenter} from 'ol/extent.js';
import ImageLayer from 'ol/layer/Image.js';
import Projection from 'ol/proj/Projection.js';
import Static from 'ol/source/ImageStatic.js';

// Map views always need a projection.  Here we just want to map image
// coordinates directly to map coordinates, so we create a projection that uses
// the image extent in pixels.
const extent = [0, 0, 5000, 2500];
const projection = new Projection({
  code: 'antaceaProjection',
  units: 'pixels',
  extent: extent,
});

const map = new Map({
  layers: [
    new ImageLayer({
      source: new Static({
        attributions: "if you see bugs report them or something idk",
        url: 'https://i.postimg.cc/MKvN3DcY/antacea-Map.png',
        projection: projection,
        imageExtent: extent,
      }),
    }),
  ],
  target: 'map',
  view: new View({
    projection: projection,
    center: getCenter(extent),
    zoom: 2,
    maxZoom: 8,
  }),
});
