import {xMercator, yMercator} from "./mercator";
const svg = document.querySelector('svg')
const regionColor = '#5a2ce3'
const regionStroke = '#eeeeee'

function drawRegion(region, countryData) {
    let regionPoints = []
    region.forEach(point => {
        let x = xMercator(point[0])
        let y = yMercator(point[1])
        regionPoints.push([x, y])
    })
    let polylineElement = createPolylineElement(regionPoints, countryData)
    svg.appendChild(polylineElement)
}

function createPolylineElement (regionPoints, countryData) {
    const polyline = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
    let points = regionPoints.map(point => `${point[0]},${point[1]}`).join(' ')
    polyline.setAttribute("points", points);
    polyline.setAttribute("stroke", regionStroke);
    polyline.setAttribute("stroke-width", ".5");
    polyline.setAttribute("fill", regionColor);
    polyline.setAttribute("data-country-id", countryData.id);
    polyline.setAttribute("data-country-name", countryData.name);
    return polyline
}


export default drawRegion
export {regionColor}

