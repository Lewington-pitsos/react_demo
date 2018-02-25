import mojs from 'mo-js'

// default paramaters for a sizzle animation
const sizzleDefaults = {
  duration: 5000,
  y: {200: -200}, // the start and end x and y axies for the motion
  x: {400: 400},
  easing: 'sin.out',
  zIndex: -1 // super conveniant
}


function generateSizzle(defaults) {
  // generates and returns a slightly randomized version of the passed in object

  return {
    duration: randomize(defaults.duration),
    y: {200: -200}, // the start and end x and y axies for the motion
    x: {400: 400},
    easing: 'sin.out',
    zIndex: -1 // super conveniant
  }
}

function randomize(number, deviation=false) {
  // returns number with a random amount added or removed up to deviation
  // if no deviation is supplied we default to 20% of the passed in number (rounded down)
  deviation = deviation || number / 5
  // we add number to a randomized portion of deviation, whichc ould be positive or negative
  return number + ((Math.random() * deviation) * plusOrMinus())
}

function plusOrMinus() {
  // returns 1 or -1
  return Math.round(Math.random()) * 2 - 1
}

const copy = Object.assign({}, sizzleDefaults)

// a mojs Shapewirl created by passing in the copy of the sizzle animation parameters.
const sizzle = new mojs.ShapeSwirl(copy)

const sizzle2 = new mojs.ShapeSwirl(generateSizzle(sizzleDefaults))

const timeline = new mojs.Timeline({
  repeat: 999
})
  .add(sizzle, sizzle2)
  .play()
