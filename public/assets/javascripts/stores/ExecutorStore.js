import {EventEmitter} from 'events'; // 'events is like, part of nodejs'

import dispatcher from '../dispatcher'

class ExecutorStore extends EventEmitter {
  constructor() {
    super()
    this.nextId = 2
    this.buckets = [
      {stones: 1, id: 1, justAdded: true}
    ]
  }

  getInfo() {
    return {buckets: this.buckets}
  }

  bucketNumber() {
    return {number: this.buckets.length}
  }

  handleActions(action) {
    switch(action.type) {
      case "ADD_BUCKET": {
        this.addBucket()
        break
      } case "REMOVE_BUCKET": {
        this.removeBucket()
        break
      }
    }
  }

  addBucket() {
    // We record that all previously added buckets have been added already
    this.buckets.forEach((bucket) => bucket.justAdded = false)

    // then we add a new bucket to the list of buckets
    this.buckets.push(
      {stones: 0, id: this.nextId, justAdded: true}
    )

    // update the next Id
    this.nextId += 1

    this.emit('change')
  }

  removeBucket() {
    this.buckets.splice(-1,1)

    this.nextId -= 1

    this.emit('change')
  }
}

const executorStore = new ExecutorStore;

dispatcher.register(executorStore.handleActions.bind(executorStore))
export default executorStore;
