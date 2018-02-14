import Dispatcher from '../dispatcher'

export default {
  addCell() {
    dispatcher.dispatch({
      type: 'ADD_CELL'
    })
  }
}
