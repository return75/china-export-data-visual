import {svgHeight, svgWidth} from "./svgDimensions";

const mapWidth = window.innerWidth / 1.05
const mapHeight = mapWidth / 2.6;
const xShift = (svgWidth - mapWidth) / 2
const yShift = -50

const LON_MIN = -180, LON_MAX = 180;

function xMercator(lon) {
    return ((lon - LON_MIN) / (LON_MAX - LON_MIN)) * mapWidth + xShift;
}

function yMercator(lat) {
    const latRad = lat * Math.PI / 180;
    const mercN = Math.log(Math.tan((Math.PI / 4) + (latRad / 2)));
    const normalizedY = (1 - (mercN / Math.PI));
    return normalizedY * mapHeight + yShift;
}

export { xMercator, yMercator }
