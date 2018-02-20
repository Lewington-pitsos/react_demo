export default {
  decrementBucket(id) {
    this.moveUgg(id)
    setTimeout(this.animateOutStone.bind(this), 900, id)
  },

  incrementBucket(id) {
    this.moveUgg(id)
    setTimeout(this.animateInStone.bind(this), 600, id)
  },

  animateInStone(id) {
    this.uggAddStone()
    setTimeout(this.addStoneTo.bind(this), 500, id)
  },

  animateOutStone(id) {
    this.uggTakeStone()
    setTimeout(this.takeStoneFrom.bind(this), 200, id)
  },

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
