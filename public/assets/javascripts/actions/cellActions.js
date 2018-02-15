import dispatcher from '../dispatcher'

export default {
  addCell() {
    dispatcher.dispatch({
      type: 'ADD_CELL'
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
}
