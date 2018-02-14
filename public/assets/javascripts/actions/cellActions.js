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
  }
}
