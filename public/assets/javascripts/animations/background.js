import mojs from 'mo-js'

const sizzle = new mojs.ShapeSwirl({
  duration: 5000,
    y: {200: -200}, // the start and end x and y axies for the motion
    x: {400: 400},
    easing: 'sin.out',
    zIndex: -1 // super conveniant
}).play()
