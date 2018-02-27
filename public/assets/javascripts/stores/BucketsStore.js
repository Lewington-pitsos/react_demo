/*

This store tracks the buckets (as an array of objects) and the bucket currently being edited.

Bucket objects consist of:
  - a 'stones' count of stones
  - a 'justAdded' boolean represneitng whether this bucket has just been added to the DOM for the first time

It also plays the ugg and bucket related animations see uggAnimations module

For our register machine the "input" for a given program is assumed to be the number of stones in each bucket passed in as a seperate integer argument. The return value is simlarly considered to be the number of stones in the first bucket when execution finishes. Regarding this, this store is responsible for:
  - tracking the input value of the program at all times while no program is runging so the user knows what their input will be
  - working out the return value of a given program so it can be explicitly displayed to the user

It also adds and removes buckets from the list. Because each bucket is id'd ding it's index all we need to do is push and pop.

Lastly it also edits the stones value of the bucket, both when the user commands it, and when ugg does it through a program. (see bucketsInteractions)

*/
import {EventEmitter} from 'events'; // 'events is like, part of nodejs'

import dispatcher from '../dispatcher'
import uggAnimations from './BucketsStore/uggAnimations'
import bucketsInteractions from './BucketsStore/bucketsInteractions'
import flashActions from '../actions/flashActions'

const defaultBuckets = [
  {stones: 2, justAdded: true},
  {stones: 3, justAdded: true},
  {stones: 0, justAdded: true},
  {stones: 0, justAdded: true}
]

class BucketsStore extends EventEmitter {
  constructor() {
    super()
    this.buckets = defaultBuckets

    // which bucket object is being edited is worked out in the Buckets component but comparing the value of editingBucket to the bucket indicies. Since none of the indicies wil be negative, a editingBucket value of -1 will lead to no buckets being identified as the editing bucket
    this.editingBucket = -1

    Object.assign(this, uggAnimations);
    Object.assign(this, bucketsInteractions);
  }

  switchEditor(index) {
    this.editingBucket = index

    this.emit('change')
  }

  // ======= component updating =========

  getBucketContents() {
    return {contents: this.bucketContents()}
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

  // ======= Dispatcher interaction =========

  handleActions(action) {
    switch(action.type) {
      case "ADD_BUCKET": {
        this.addBucket()
        break
      } case "REMOVE_BUCKET": {
        this.removeBucket()
        break
      } case "INCREMENT_BUCKET": { // through a program
        this.incrementBucket(action.id)
        break
      } case "DECREMENT_BUCKET": { // through a program
        this.decrementBucket(action.id)
        break
      } case "SWITCH_BUCKET_EDITOR": {
        this.switchEditor(action.id)
        break
      } case "AUTO_INCREMENT_BUCKET": { // user commanded
        this.addStoneTo(action.id)
        break
      } case "AUTO_DECREMENT_BUCKET": { // user commanded
        this.takeStoneFrom(action.id)
        break
      } case "EMPTY_BUCKET": { // user commanded
        this.empty(action.id)
        break
      } case "FINISH_EXECUTION": {
        this.flashReturnValue()
        break
      }
    }
  }

  // ======= input and output =========

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

    // return a reversed version of contents since we were iterating backwards before
    return contents.reverse()
  }

  flashReturnValue() {
    // flashes the value of the first bucket and gets ugg to dance
    // the flash timeout is delayed so ugg starts dancing before it  comes up
    var returnVal = this.buckets[0].stones
    this.uggDance()
    setTimeout(function() {
      flashActions.flash('The program has terminated successfully with a return value of ' + returnVal)
    }, 300)
  }

  // ======= Bucket list editing =========

  addBucket() {
    // We record that all previously added buckets have been added already
    this.buckets.forEach((bucket) => bucket.justAdded = false)

    // then we add a new bucket to the list of buckets
    this.buckets.push(
      // we store the justAdded value in each bucket, because (like on when the page loads for the first time) there might be situations where two buckets are added at the same time.
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
