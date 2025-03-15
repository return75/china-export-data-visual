import exportData from './../data/data.json'
import countriesData from './../data/world.json'
import countriesColor from './../data/countryColor.json'
import {xMercator, yMercator} from "../create-map/mercator";
import {exportCircleValue, totalAnimationTime, particleVelocity} from "./constants";

function formatData () {
    let exportParticles = []
    exportData.filter(item => item.value > 10000000000).forEach(exportObject => {
        let particlesCount = Math.floor(exportObject.value / exportCircleValue)
        let remainedValue = exportObject.value - particlesCount * exportCircleValue

        for (let i = 0; i < particlesCount; i++ ) {
            exportParticles.push({
                source: exportObject.reporter,
                destination: exportObject.countries,
                exportValue: exportCircleValue,
                startTransferTime: Math.random() * totalAnimationTime,
                transferTimeElapsed: 0,
                velocity: particleVelocity,
                reachedToDestination: false,
                color: getCountryColor(exportObject.countries),
                totalTransitionTime() {
                  return particleVelocity * this.bezierLength
                },
                bezierCurveFunction: createBezierCurveFunction(exportObject.reporter, exportObject.countries),
                bezierLength: calculateBezierLength(exportObject.reporter, exportObject.countries),
            })
        }
        if (remainedValue) {
            exportParticles.push({
                source: exportObject.reporter,
                destination: exportObject.countries,
                exportValue: remainedValue,
                transferTimeElapsed: 0,
                velocity: particleVelocity,
                reachedToDestination: false,
                color: getCountryColor(exportObject.countries),
                startTransferTime: Math.random() * totalAnimationTime,
                bezierCurveFunction: createBezierCurveFunction(exportObject.reporter, exportObject.countries),
                bezierLength: calculateBezierLength(exportObject.reporter, exportObject.countries),
                totalTransitionTime() {
                    return particleVelocity * this.bezierLength
                },
            })
        }
    })

    return exportParticles
}


function createBezierCurveFunction(source, destination) {
    let sourceCentroid = countriesData.find(item => item.properties.name === source)?.properties.centroid
    let destinationCentroid = countriesData.find(item => item.properties.name === destination)?.properties.centroid

    let sourceXY = sourceCentroid ? {x: xMercator(sourceCentroid[0]), y: yMercator(sourceCentroid[1])} : undefined
    let destinationXY = destinationCentroid ? {x: xMercator(destinationCentroid[0]), y: yMercator(destinationCentroid[1])}: undefined

    if (sourceXY && destinationXY) {
        let p0 = sourceXY
        let p2 = destinationXY
        let p1 = {x: .2 * sourceXY.x + .8 * destinationXY.x  , y: destinationXY.y - 100}

        let bezierCurveFunction =  t => {
            const x = (1 - t) * (1 - t) * p0.x + 2 * (1 - t) * t * p1.x + t * t * p2.x;
            const y = (1 - t) * (1 - t) * p0.y + 2 * (1 - t) * t * p1.y + t * t * p2.y;
            return { x, y };
        }
        return bezierCurveFunction
    } else {
        return null
    }
}

function calculateBezierLength (source, destination) {
    let sourceCentroid = countriesData.find(item => item.properties.name === source)?.properties.centroid
    let destinationCentroid = countriesData.find(item => item.properties.name === destination)?.properties.centroid

    let sourceXY = sourceCentroid ? {x: xMercator(sourceCentroid[0]), y: yMercator(sourceCentroid[1])} : undefined
    let destinationXY = destinationCentroid ? {x: xMercator(destinationCentroid[0]), y: yMercator(destinationCentroid[1])}: undefined

    if (sourceXY && destinationXY) {
        let p0 = sourceXY
        let p2 = destinationXY
        let p1 = {x: (sourceXY.x + destinationXY.x) / 2 , y: (sourceXY.y + destinationXY.y) / 2}
        let segments = 100

        let length = 0;
        let prevPoint = p0;

        for (let i = 1; i <= segments; i++) {
            const t = i / segments;
            const currentPoint = getBezierPoint(t, p0, p1, p2);

            // محاسبه فاصله بین نقاط مجاور
            const dx = currentPoint.x - prevPoint.x;
            const dy = currentPoint.y - prevPoint.y;
            length += Math.sqrt(dx * dx + dy * dy);

            prevPoint = currentPoint;
        }

        return length;
    } else {
        return null
    }
}

function getBezierPoint(t, p0, p1, p2) {
    const x = (1 - t) * (1 - t) * p0.x + 2 * (1 - t) * t * p1.x + t * t * p2.x;
    const y = (1 - t) * (1 - t) * p0.y + 2 * (1 - t) * t * p1.y + t * t * p2.y;
    return { x, y };
}

function getCountryColor (country) {
    let c = countriesColor.find(item => item.name === country)?.color
    return c
}

export default formatData
