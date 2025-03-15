import exportData from './../data/data.json'
import countriesData from "../data/world.json";
import {xMercator, yMercator} from "../create-map/mercator";
import countriesColor from "../data/countryColor.json";


let maxExportValue = Math.max(...exportData.map(item => item.value))
const maxCurveThickness = 50

let finalData = []
function createBezierCurve () {
    exportData.forEach(exportObject => {
        finalData.push({
            source: exportObject.reporter,
            destination: exportObject.countries,
            bezierCurvePath: createBezierCurvePath(exportObject.reporter, exportObject.countries),
            bezierCurveThickness: exportObject.value / maxExportValue * maxCurveThickness,
            color: getCountryColor(exportObject.countries),
        })
    })
    return finalData
}

function createBezierCurvePath (source, destination) {
    let sourceCentroid = countriesData.find(item => item.properties.name === source)?.properties.centroid
    let destinationCentroid = countriesData.find(item => item.properties.name === destination)?.properties.centroid

    let sourceXY = sourceCentroid ? {x: xMercator(sourceCentroid[0]), y: yMercator(sourceCentroid[1])} : undefined
    let destinationXY = destinationCentroid ? {x: xMercator(destinationCentroid[0]), y: yMercator(destinationCentroid[1])}: undefined

    if (sourceXY && destinationXY) {
        let p0 = sourceXY
        let p2 = destinationXY
        let p1 = {x: .2 * sourceXY.x + .8 * destinationXY.x  , y: destinationXY.y - 100}

        let bezierCurvePath = `M${p0.x},${p0.y} Q${p1.x},${p1.y} ${p2.x},${p2.y}`
        return bezierCurvePath
    } else {
        return null
    }
}

function getCountryColor (country) {
    let c = countriesColor.find(item => item.name === country)?.color
    return c
}

export default createBezierCurve