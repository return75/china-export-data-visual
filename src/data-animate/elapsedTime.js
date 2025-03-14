let runTime = performance.now()

function getElapsedTime () {
    let elapsedTime = performance.now() - runTime
    return elapsedTime
}

export default getElapsedTime