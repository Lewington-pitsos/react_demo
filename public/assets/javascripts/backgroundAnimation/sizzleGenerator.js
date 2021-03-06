export default {
  // a library for the sizzleplayer class. Covers the generation of Shape specifications for sizzles
  generate(defaults) {
    // generates an object with randomized versions of some of defualt's keys
    // copies default (don't want to mess with it)
    // overwrites some of the copy's keys with the randomized keys

    const background = document.getElementById('background')

    const speed = background.offsetHeight * 60

    var xAxis = Math.random() * (background.offsetWidth / 2) * this.plusOrMinus()
    const newSpecs = {
      duration: this.randomize(speed, speed / 2),
      scale: {[defaults.scale * Math.random()]: 0},
      swirlSize: {[defaults.swirlSize * Math.random()]: [defaults.swirlSize * Math.random()]},
      direction: this.plusOrMinus(),
      strokeWidth: {[defaults.strokeWidth * Math.random() + 2]: [defaults.strokeWidth * Math.random() + 4]},
      // somewhere between 1 and two, shrinks to 0
      y: {[background.offsetHeight / 2]: -this.randomize(background.offsetHeight / 2)},
      x: {[xAxis]: this.randomize(xAxis, 50)}
    }

    const copy = Object.assign({}, defaults)
    return Object.assign(copy, newSpecs)
  },

  randomize(number, deviation=false) {
    // returns number with a random amount added or removed up to deviation
    // if no deviation is supplied we default to 25% of the passed in number (rounded down)
    deviation = deviation || number / 4
    // we add number to a randomized portion of deviation, whichc ould be positive or negative
    return Math.floor(number + ((Math.random() * deviation) * this.plusOrMinus()))
  },

  plusOrMinus() {
    // returns 1 or -1
    return Math.round(Math.random()) * 2 - 1
  }
}
