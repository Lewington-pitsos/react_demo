import {EventEmitter} from 'events'; // 'events is like, part of nodejs'

import dispatcher from '../dispatcher'
import executorAnimations from './ExecutorStore/executorAnimations'

class ExecutorStore extends EventEmitter {
  constructor() {
    super()
    this.buckets = [
      {stones: 1, justAdded: true},
      {stones: 1, justAdded: true}
    ]

    Object.assign(this, executorAnimations);
  }

  getInfo() {
    return {buckets: this.buckets}
  }

  bucketNumber() {
    return {number: this.buckets.length}
  }

  getBucket(index) {
    return this.buckets[index]
  }

  handleActions(action) {
    switch(action.type) {
      case "ADD_BUCKET": {
        this.addBucket()
        break
      } case "REMOVE_BUCKET": {
        this.removeBucket()
        break
      } case "INCREMENT_BUCKET": {
        this.incrementBucket(action.id)
        break
      } case "DECREMENT_BUCKET": {
        this.decrementBucket(action.id)
        break
      }
    }
  }

  addBucket() {
    // We record that all previously added buckets have been added already
    this.buckets.forEach((bucket) => bucket.justAdded = false)

    // then we add a new bucket to the list of buckets
    this.buckets.push(
      {stones: 0, justAdded: true}
    )

    this.emit('change')
  }

  removeBucket() {
    this.buckets.splice(-1,1)

    this.emit('change')
  }

  decrementBucket(id) {
    this.moveUgg(id)
    setTimeout(this.animateOutStone.bind(this), 600, id)
  }

  incrementBucket(id) {
    this.moveUgg(id)
    setTimeout(this.animateInStone.bind(this), 600, id)
  }

  addStoneTo(id) {
    this.buckets[id].stones += 1
    this.emit('change');
  }

  animateInStone(id) {
    this.uggAddStone()
    setTimeout(this.addStoneTo.bind(this), 500, id)
  }

  takeStoneFrom(id) {
    this.buckets[id].stones -= 1
    this.emit('change');
  }

  animateOutStone(id) {
    this.uggTakeStone()
    setTimeout(this.takeStoneFrom.bind(this), 500, id)
  }
}

const executorStore = new ExecutorStore;

dispatcher.register(executorStore.handleActions.bind(executorStore))
export default executorStore;
