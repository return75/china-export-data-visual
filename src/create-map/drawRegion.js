import {xMercator, yMercator} from "./mercator";
const svg = document.querySelector('svg')
const regionColor = '#F7EDF8'
const regionStroke = '#29307C'

function drawRegion(region, countryData) {
    let regionPoints = []
    region.forEach(point => {
        let x = xMercator(point[0])
        let y = yMercator(point[1])
        regionPoints.push([x, y])
    })
    let polylineElement = createPolylineElement(regionPoints, countryData)
    let textElement = createTextElement(countryData)
    svg.appendChild(polylineElement)
    svg.appendChild(textElement)

}

function createPolylineElement (regionPoints, countryData) {
    const polyline = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
    let points = regionPoints.map(point => `${point[0]},${point[1]}`).join(' ')
    polyline.setAttribute("points", points);
    polyline.setAttribute("stroke", regionStroke);
    polyline.setAttribute("stroke-width", ".6");
    polyline.setAttribute("fill", regionColor);
    polyline.setAttribute("data-country-id", countryData.id);
    polyline.setAttribute("data-country-name", countryData.name);
    return polyline
}

function createTextElement (countryData) {
    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("x", xMercator(countryData.centroid[0]));
    text.setAttribute("y", yMercator(countryData.centroid[1]));
    text.setAttribute("fill", '#e1c100');
    text.setAttribute("text-anchor", 'middle');
    text.setAttribute("dominant-baseline", 'middle');
    text.innerHTML = countryData.name


    let textSize = Math.sqrt(countryData.land) * 30 / Math.sqrt(16376870)
    text.setAttribute("font-size", textSize + 'px');


    return text
}


export default drawRegion
export {regionColor}

