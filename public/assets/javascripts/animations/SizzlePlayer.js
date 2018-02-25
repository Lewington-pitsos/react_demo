import sizzleGenerator from './sizzleGenerator'

export default class SizzlePlayer {
  // creates and plays randomized mojs "sizzle" shapeswirls based on the passed in default ShapeSwirl specs
  // a "sizzle" should start at the bottom of the page and slowly rise upwards, becoming smaller and smaller, untill it dissapears
  constructor(defaults) {
    console.log('constructed');
    this.minWait = 700
    this.maxWait = 4000
    this.waitDeviation = 200
    this.defaults = defaults

    Object.assign(this, sizzleGenerator)
  }

  sizzleWait(oldWait) {
    // adds or subtracts waitDeviation from time and returns the result, as long as it is within the min and max waits
    // the idea here is that the number of sizzles being added to the page per second should vary over the course of, say a few minutes, but the variation should not be jarring, or attention-grabbing
    var newWait = oldWait +
      ((Math.round(Math.random()) * 2 - 1) * this.waitDeviation)

    if (newWait < this.minWait) {
      return this.minWait
    } else if (newWait > this.maxWait) {
      return this.maxWait
    } else {
      return newWait
    }
  }

  addSizzle(wait) {
    // creates and plays a sizzle, then calls play with a modifed wait time
    new mojs.ShapeSwirl(this.generate(this.defaults)).play()
    this.play(this.sizzleWait(wait))
  }

  play(wait) {
    // creates and plays a new sizzle, then sets a timer to call the same function again
    setTimeout(this.addSizzle.bind(this, wait), Math.floor(Math.random() * wait))
  }
}
