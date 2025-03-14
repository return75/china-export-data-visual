import addCountryToMap from "./addCountryToMap";
import formatCountriesData from './formatCountriesData'

function addCountriesToMap () {
    formatCountriesData().then(countries => {
        countries.forEach(country => {
            addCountryToMap(country)
        })
    })

}

export default addCountriesToMap