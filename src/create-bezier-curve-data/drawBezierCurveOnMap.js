import createBezierCurve from "./createBezierCurve";


let bezierCurveData = createBezierCurve()
const svg = document.querySelector('svg')


function drawBezierCurveOnMap () {
    bezierCurveData.forEach(item => {
        let bezierCurveElement = createBezierCurveElement(item)
        svg.appendChild(bezierCurveElement)
    })

}



function createBezierCurveElement (item) {
    const bezierCurve = document.createElementNS("http://www.w3.org/2000/svg", "path");
    bezierCurve.setAttribute("d", item.bezierCurvePath);
    bezierCurve.setAttribute("stroke-width", item.bezierCurveThickness);
    bezierCurve.setAttribute("stroke", item.color);
    bezierCurve.setAttribute("fill", 'none');

    return bezierCurve
}

export default drawBezierCurveOnMap