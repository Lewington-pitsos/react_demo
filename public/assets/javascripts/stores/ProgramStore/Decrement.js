import Command from './Command.js'

export default class Decrement extends Command {
  constructor(next, index, id, alternateNext, bucket) {
    super(next, index, id)
    this.defaultNext = next
    this.alternateNext = alternateNext
    this.bucketObject= bucket
  }

  run() {
    // if there are any stones in the assigned bucket we decrement and switch the next command to the default command
    // otherwise simply swicth the next command to the alternate command
    if (this.bucketObject.stones) {
      this.actions.decrementBucket(this.bucketId)
      this.nextCommand = this.defaultNext
    } else {
      this.nextCommand = this.alternateNext
    }
  }
}
