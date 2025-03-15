import drawRegion from "./drawRegion";

function addCountryToMap (country) {
    if(country.type === 'Polygon') {
        country.regions.forEach(region => {
            drawRegion(region, {id: country.id, name: country.name, centroid: country.centroid, land: country.land})
        })
    } else if (country.type === 'MultiPolygon') {
        country.regions.forEach(region => {
            drawRegion(region[0], {id: country.id, name: country.name, centroid: country.centroid, land: country.land})
        })
    }
}

export default addCountryToMap