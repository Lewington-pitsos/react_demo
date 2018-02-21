import {EventEmitter} from 'events'; // 'events is like, part of nodejs'

import dispatcher from '../dispatcher'
import uggAnimations from './BucketsStore/uggAnimations'
import bucketsInteractions from './BucketsStore/bucketsInteractions'
import flashActions from '../actions/flashActions'

class BucketsStore extends EventEmitter {
  constructor() {
    super()
    this.buckets = [
      {stones: 1, justAdded: true},
      {stones: 1, justAdded: true}
    ]

    this.editingBucket = -1

    Object.assign(this, uggAnimations);
    Object.assign(this, bucketsInteractions);
  }

  switchEditor(index) {
    this.editingBucket = index

    this.emit('change')
  }

  getBucketContents() {
    return {contents: this.bucketContents()}
  }

  bucketContents() {
    // iterate backwards through buckets and as soon as we find a bucket with > 0 stones in it, add it and all the other bucket's stone counts to the empty contents array
    var contents =  []
    var addAllTheRest = false

    for (var i = this.buckets.length - 1; i >= 0; i--) {
      if (addAllTheRest) {
        contents.push(this.buckets[i].stones)
      } else if (this.buckets[i].stones) {
        contents.push(this.buckets[i].stones)
        addAllTheRest = true
      }
    }

    // return a reversed version of contents
    return contents.reverse()
  }

  getInfo() {
    return {buckets: this.buckets, editingBucket: this.editingBucket}
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
      } case "SWITCH_BUCKET_EDITOR": {
        this.switchEditor(action.id)
        break
      } case "AUTO_INCREMENT_BUCKET": {
        this.addStoneTo(action.id)
        break
      } case "AUTO_DECREMENT_BUCKET": {
        this.takeStoneFrom(action.id)
        break
      } case "EMPTY_BUCKET": {
        this.empty(action.id)
        break
      } case "FINISH_EXECUTION": {
        this.flashReturnValue()
        break
      }
    }
  }

  flashReturnValue() {
    // we have to set a timeout to avoid simaltanious dispatches
    var returnVal = this.buckets[0].stones
    setTimeout(function() {
      flashActions.flash('The program has terminated successfully with a return value of ' + returnVal)
    }, 0)
    this.uggDance()
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
}

const bucketsStore = new BucketsStore;

dispatcher.register(bucketsStore.handleActions.bind(bucketsStore))
export default bucketsStore;
