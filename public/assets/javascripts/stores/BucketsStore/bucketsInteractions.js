/*

This module helps animate bucket interactions, and also updates the BucketsStore to match the animations.It works by having three levels of function calls:

  - level 1: This function will execute a move animation instantly, and then execute a level 2 function after a timeout
    * this way ugg gets to finish moving BEFORE the interaction animation starts

  - level 2: this will instantly call an interaction animation, and after a timeout execute a level 3 function
    * This way the intercation animation gets to run for a bit before we (potentially) update BucketsStore and re-render the bucket numbers

  -level 3: This function will instantly update BucketsStore, and trigger a re-render if a change has occured


Level 3 functions can also be called on their own (e.g. when the user manually edits a bucket)

*/


export default {

  // ======= Level 1 =========

  failToDecrement(id) {
    this.moveUgg(id)
    setTimeout(this.uggWaver.bind(this), 700)
  },

  decrementBucket(id) {
    this.moveUgg(id)
    setTimeout(this.animateOutStone.bind(this), 800, id)
  },

  incrementBucket(id) {
    this.moveUgg(id)
    setTimeout(this.animateInStone.bind(this), 600, id)
  },

  // ======= Level 2 =========

  animateInStone(id) {
    this.uggAddStone()
    setTimeout(this.addStoneTo.bind(this), 350, id)
  },

  animateOutStone(id) {
    this.uggTakeStone()
    setTimeout(this.takeStoneFrom.bind(this), 100, id)
  },

  // ======= Level 3 =========

  takeStoneFrom(id) {
    // no decrementing to negative integers
    if (this.buckets[id].stones > 0) {
      this.buckets[id].stones -= 1
    }
    this.emit('change');
  },

  addStoneTo(id) {
    this.buckets[id].stones += 1
    this.emit('change');
  },

  empty(id) {
    this.buckets[id].stones = 0
    this.emit('change')
  }
}
