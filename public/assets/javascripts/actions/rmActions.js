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
  }
}
