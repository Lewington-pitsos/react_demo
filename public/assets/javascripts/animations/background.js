import mojs from 'mo-js'

import sizzleGenerator from './sizzleGenerator'

// default paramaters for a sizzle animation
const sizzleDefaults = {
  parent: document.getElementById('background'),
  duration: 15000,
  scale: 2,
  y: {200: -200}, // the start and end x and y axies for the motion
  x: {400: 400},
  fill: '#908089',
  fillOpacity: 0.6,
  strokeWidth: 4,
  stroke: '#908089',
  strokeOpacity: 0.2,
  zIndex: -1 // super conveniant
}

// shapes take on the specifications of passed in objects on instantiation
const sizzle = new mojs.ShapeSwirl(sizzleGenerator.generate(sizzleDefaults))
const sizzle2 = new mojs.ShapeSwirl(sizzleGenerator.generate(sizzleDefaults))
const sizzle3 = new mojs.ShapeSwirl(sizzleGenerator.generate(sizzleDefaults))
const sizzle4 = new mojs.ShapeSwirl(sizzleGenerator.generate(sizzleDefaults))
const sizzle5 = new mojs.ShapeSwirl(sizzleGenerator.generate(sizzleDefaults))
const sizzle6 = new mojs.ShapeSwirl(sizzleGenerator.generate(sizzleDefaults))
const sizzle7 = new mojs.ShapeSwirl(sizzleGenerator.generate(sizzleDefaults))
const sizzle8 = new mojs.ShapeSwirl(sizzleGenerator.generate(sizzleDefaults))
const sizzle9 = new mojs.ShapeSwirl(sizzleGenerator.generate(sizzleDefaults))
const sizzle10 = new mojs.ShapeSwirl(sizzleGenerator.generate(sizzleDefaults))


const timeline = new mojs.Timeline({
  repeat: 999
})
  .add(sizzle, sizzle2, sizzle3, sizzle4, sizzle5, sizzle6, sizzle7, sizzle8, sizzle9, sizzle10)
  .play()
