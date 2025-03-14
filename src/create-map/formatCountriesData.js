import countriesDataSet from "../data/world.json";

function formatCountriesData () {
    const countries = []
    return new Promise(resolve => {
        countriesDataSet.forEach(item => {
            countries.push( {
                id: item.id,
                name: item.properties.name,
                type: item.geometry.type,
                regions: item.geometry.coordinates,
            })
        })
        resolve(countries)
    })
}
export default formatCountriesData