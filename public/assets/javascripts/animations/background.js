import mojs from 'mo-js'

import sizzleGenerator from './sizzleGenerator'

// default paramaters for a sizzle animation
const sizzleDefaults = {
  duration: 5000,
  y: {200: -200}, // the start and end x and y axies for the motion
  x: {400: 400},
  easing: 'sin.out',
  zIndex: -1 // super conveniant
}

const copy = Object.assign({}, sizzleDefaults)

// a mojs Shapewirl created by passing in the copy of the sizzle animation parameters.
const sizzle = new mojs.ShapeSwirl(copy)

const sizzle2 = new mojs.ShapeSwirl(sizzleGenerator.generate(sizzleDefaults))

const timeline = new mojs.Timeline({
  repeat: 999
})
  .add(sizzle, sizzle2)
  .play()
