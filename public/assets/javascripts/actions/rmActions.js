import dispatcher from '../dispatcher'

export default {
  addBucket() {
    dispatcher.dispatch(
      {type: 'ADD_BUCKET'}
    )
  },

  removeBucket() {
    dispatcher.dispatch(
      {type: 'REMOVE_BUCKET'}
    )
  },

  incremenetBucket(id) {
    dispatcher.dispatch({
      type: 'INCREMENT_BUCKET',
      id: id
    })
  },

  decrementBucket(id) {
    dispatcher.dispatch({
      type: 'DECREMENT_BUCKET',
      id: id
    })
  },

  addDecrement() {
    dispatcher.dispatch({
      type: 'ADD_COMMAND',
      commandProps: {
        increment: false,
        nextCommand: 1,
        bucket: 1,
        alternateNext: 1
      }
    })
  },

  addIncrement() {
    dispatcher.dispatch({
      type: 'ADD_COMMAND',
      commandProps: {
        increment: true,
        nextCommand: 1,
        bucket: 1
      }
    })
  }
}
