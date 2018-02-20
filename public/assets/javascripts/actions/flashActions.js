import dispatcher from '../dispatcher'

export default {
  flash(message) {
    dispatcher.dispatch({
      type: 'FLASH',
      message: message
    })
  }
}
