import setSvgDimensions from "./src/create-map/setSVGDimension";
import addCountriesToMap from "./src/create-map/addCountriesToMap";
import './src/data-animate/startAnimation'

import drawBezierCurveOnMap from "./src/create-bezier-curve-data/drawBezierCurveOnMap";

setSvgDimensions()
addCountriesToMap()

setTimeout(() => {
    drawBezierCurveOnMap()
}, 3000)








