import mojs from 'mo-js'

import sizzleGenerator from './sizzleGenerator'

// default paramaters for a sizzle animation
const sizzleDefaults = {
  parent: document.getElementById('background'),
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

new mojs.ShapeSwirl(sizzleGenerator.generate(sizzleDefaults)).play()

class SizzlePlayer {
  constructor() {
    console.log('constructed');
    this.minWait = 900
    this.maxWait = 3000
    this.waitDeviation = 200
  }

  sizzleWait(oldWait) {
    // adds or subtracts waitDeviation from time and returns the result, as long as it is within the min and max waits
    var newWait = oldWait +
      ((Math.round(Math.random()) * 2 - 1) * this.waitDeviation)

    console.log(newWait);
    console.log(this.waitDeviation);
    console.log(oldWait);

    if (newWait < this.minWait) {
      return this.minWait
    } else if (newWait > this.maxWait) {
      return this.maxWait
    } else {
      return newWait
    }
  }

  addSizzle(wait) {
    new mojs.ShapeSwirl(sizzleGenerator.generate(sizzleDefaults)).play()
    this.play(this.sizzleWait(wait))
  }

  play(wait) {
    // creates and plays a new sizzle, then sets a timer to call the same function again
    console.log('wait: ' + wait);
    setTimeout(this.addSizzle.bind(this, wait), Math.floor(Math.random() * wait, wait))
  }
}

const sizzlePlayer = new SizzlePlayer

sizzlePlayer.play(900)
