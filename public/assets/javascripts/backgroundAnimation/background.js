/*
THE IDEA: small circles should start popping in at the bottom of the page and drift slowly upwards untill they reach the top or dissapear. They should be added at a random x axis and at seemingly random intervals. Should kind of look the screen is sitting over a wide vent which is slowly releasing small bubbles.

*/


import mojs from 'mo-js'
import SizzlePlayer from './SizzlePlayer'

// default paramaters for a sizzle animation
const sizzleDefaults = {
  parent: document.getElementById('background'),
  scale: 2,
  y: {200: -200}, // the start and end x and y axies for the motion
  x: {400: 400},
  fill: '#908089',
  swirlSize: 25,
  fillOpacity: 0.6,
  strokeWidth: 3,
  stroke: '#908089',
  strokeOpacity: 0.2,
  zIndex: -1 // super conveniant
}

const sizzlePlayer = new SizzlePlayer(sizzleDefaults)

// shapes take on the specifications of passed in objects on instantiation
new mojs.ShapeSwirl(sizzlePlayer.generate(sizzleDefaults)).play()
sizzlePlayer.play(2000)
