import dispatcher from '../dispatcher'

export default {
  addCell(number) {
    dispatcher.dispatch({
      type: 'ADD_CELL',
      number: number
    })
  },

  flipCell(id) {
    dispatcher.dispatch({
      type: 'FLIP_CELL',
      cellId: id
    })
  },

  randFlipping() {
    dispatcher.dispatch({
      type: 'RAND_FLIPPING'
    })
  },

  fixBoard(boardWidth) {
    dispatcher.dispatch({
      type: 'FIX_BOARD',
      boardWidth: boardWidth
    })
  },

  cascadeFlip() {
    dispatcher.dispatch({
      type: 'CASCADE_FLIP'
    })
  },

  playRound() {
    dispatcher.dispatch({
      type: 'PLAY_ROUND'
    })
  },

  toggleGOL() {
    dispatcher.dispatch({
      type: 'TOGGLE_GOL'
    })
  },

  exit() {
    dispatcher.dispatch({
      type: 'EXIT_GOL'
    })
  }
}
