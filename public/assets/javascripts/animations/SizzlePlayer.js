import sizzleGenerator from './sizzleGenerator'

export default class SizzlePlayer {
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
    new mojs.ShapeSwirl(this.generate(this.defaults)).play()
    this.play(this.sizzleWait(wait))
  }

  play(wait) {
    // creates and plays a new sizzle, then sets a timer to call the same function again
    console.log('wait: ' + wait);
    setTimeout(this.addSizzle.bind(this, wait), Math.floor(Math.random() * wait, wait))
  }
}
