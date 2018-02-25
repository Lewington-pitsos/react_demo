import mojs from 'mo-js'

// default paramaters for a sizzle animation
const sizzleDefaults = {
  duration: 5000,
    y: {200: -200}, // the start and end x and y axies for the motion
    x: {400: 400},
    easing: 'sin.out',
    zIndex: -1 // super conveniant
}


// a duplucate object of the default paramaters object
const copy = Object.assign({}, sizzleDefaults)

// a mojs Shapewirl created by passing in the copy of the sizzle animation parameters.
const sizzle = new mojs.ShapeSwirl(copy)

sizzle.play()
