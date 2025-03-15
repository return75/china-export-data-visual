import formatData from './formatData'
import getElapsedTime from "./elapsedTime";
import {exportCircleSize, particleAcceleration, particleColor} from "./constants";

const svg = document.querySelector('svg')

let particles = formatData()
particles = particles.filter(particle => particle.bezierCurveFunction)


function startAnimation () {
    clearParticlesFromDom()
    transferParticles()
    drawParticles()

    requestAnimationFrame(startAnimation)
}

function transferParticles () {
    particles.forEach(particle => {
        if (particle.startTransferTime < getElapsedTime()) {
            if (particle.transferTimeElapsed / particle.totalTransitionTime() <= 1) {
                transferParticle(particle)
            } else {
                particle.reachedToDestination = true
            }
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
    let {x, y} = particle.bezierCurveFunction(particle.transferTimeElapsed / particle.totalTransitionTime())
    let circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
    circle.setAttribute('cx', x)
    circle.setAttribute('cy', y)
    circle.setAttribute('r', exportCircleSize)
    circle.setAttribute('fill', particle.color || 'black')
    return circle
}

function clearParticlesFromDom () {
    document.querySelectorAll('circle').forEach(item => {
        item.remove()
    })
}


//startAnimation()
