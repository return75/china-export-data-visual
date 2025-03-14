import {svgWidth, svgHeight} from "./svgDimensions";

function setSvgDimensions () {
    let svg = document.querySelector('svg')
    svg.setAttribute('width', svgWidth + 'px')
    svg.setAttribute('height', svgHeight + 'px')
    svg.setAttribute('viewBox', `0 0 ${svgWidth} ${svgHeight}`)

}

export default setSvgDimensions