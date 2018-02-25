export default {
  generate(defaults) {
    // generates and returns a slightly randomized version of the passed in object

    return {
      duration: this.randomize(defaults.duration),
      y: {200: this.randomize(defaults.y[200])}, // the start and end x and y axies for the motion
      x: {400: this.randomize(defaults.x[400])},
      easing: defaults.easing,
      zIndex: defaults.zIndex // super conveniant
    }
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
