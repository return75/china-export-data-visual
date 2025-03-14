import formatData from './format-data'
import getElapsedTime from "./elapsedTime";
import {exportCircleSize, particleAcceleration} from "./constants";

const svg = document.querySelector('svg')

let particles = formatData()
particles = particles.filter(particle => particle.bezierCurveFunction).filter((p, index) => index < 4000)


function startAnimation () {
    clearParticlesFromDom()
    transferParticles()
    drawParticles()

    requestAnimationFrame(startAnimation)
}

function transferParticles () {
    particles.forEach(particle => {
        //console.log(particle.startTransferTime , getElapsedTime())
        if (particle.startTransferTime < getElapsedTime()) {
            transferParticle(particle)
        }
    })
}

function transferParticle (particle) {
    particle.velocity += particleAcceleration
    particle.transferTimeElapsed += particle.velocity
}

function drawParticles () {
    particles.forEach(particle => {
        if (particle.startTransferTime < getElapsedTime()) {
            if (particle.transferTimeElapsed / particle.totalTransitionTime() <= 1) {
                let p = createParticle(particle)
                svg.appendChild(p)
            }

        }
    })
}

function createParticle (particle) {
    //console.log(particle.transferTimeElapsed / particle.totalTransitionTime())
    let {x, y} = particle.bezierCurveFunction(particle.transferTimeElapsed / particle.totalTransitionTime())
    let circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
    circle.setAttribute('cx', x)
    circle.setAttribute('cy', y)
    circle.setAttribute('r', exportCircleSize)
    circle.setAttribute('fill', '#0062c2')
    return circle
}

function clearParticlesFromDom () {
    document.querySelectorAll('circle').forEach(item => {
        item.remove()
    })
}


startAnimation()
