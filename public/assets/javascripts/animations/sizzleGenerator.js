export default {
  generate(defaults) {
    // generates an object with randomized versions of some of defualt's keys
    // copies default (don't want to mess with it)
    // overwrites some of the copy's keys with the randomized keys
    const newSpecs = {
      duration: this.randomize(defaults.duration),
      y: {200: this.randomize(defaults.y[200])}, 
      x: {400: this.randomize(defaults.x[400])},
    }

    const copy = Object.assign({}, defaults)

    return Object.assign(copy, newSpecs)
  },

  randomize(number, deviation=false) {
    // returns number with a random amount added or removed up to deviation
    // if no deviation is supplied we default to 25% of the passed in number (rounded down)
    deviation = deviation || number / 4
    // we add number to a randomized portion of deviation, whichc ould be positive or negative
    return number + ((Math.random() * deviation) * this.plusOrMinus())
  },

  plusOrMinus() {
    // returns 1 or -1
    return Math.round(Math.random()) * 2 - 1
  }
}
