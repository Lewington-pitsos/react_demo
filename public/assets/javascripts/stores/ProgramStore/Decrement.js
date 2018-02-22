import Command from './Command.js'

export default class Decrement extends Command {
  constructor(next, index, id, alternateNext, bucket) {
    super(next, index, id)
    this.actualNext = next
    this.alternateNext = alternateNext
    this.bucketObject= this.store.getBucket(index)
  }

  run() {
    // if there are any stones in the assigned bucket we decrement and switch the next command to the default command
    // otherwise simply swicth the next command to the alternate command
    if (this.bucketObject.stones) {
      this.store.decrementBucket(this.bucketId)
      this.actualNext = this.nextCommand
    } else {
      this.store.failToDecrement(this.bucketId)
      this.actualNext = this.alternateNext
    }
  }

  next() {
    return this.actualNext
  }
}
