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

  incrementBucket(id) {
    dispatcher.dispatch({
      type: 'INCREMENT_BUCKET',
      id: id
    })
  },

  autoIncrement(id) {
    dispatcher.dispatch({
      type: 'AUTO_INCREMENT_BUCKET',
      id: id
    })
  },

  autoDecrement(id) {
    dispatcher.dispatch({
      type: 'AUTO_DECREMENT_BUCKET',
      id: id
    })
  },

  emptyBucket(id) {
    dispatcher.dispatch({
      type: 'EMPTY_BUCKET',
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
  },

  execute() {
    dispatcher.dispatch({
      type: 'EXECUTE'
    })
  },

  updateCommand(specs) {
    dispatcher.dispatch({
      type: 'UPDATE_COMMAND',
      specs: specs
    })
  },

  deleteCommand(id) {
    dispatcher.dispatch({
      type: 'DELETE_COMMAND',
      id: id
    })
  },

  switchEditor(id) {
    dispatcher.dispatch({
      type: 'SWITCH_EDITOR',
      id: id
    })
  },

  switchBucketEditor(id) {
    dispatcher.dispatch({
      type: 'SWITCH_BUCKET_EDITOR',
      id: id
    })
  },

  finishExecution() {
    dispatcher.dispatch({
      type: 'FINISH_EXECUTION'
    })
  },

 haltExecution() {
    dispatcher.dispatch({
      type: 'HALT_EXECUTION'
    })
  }
}
