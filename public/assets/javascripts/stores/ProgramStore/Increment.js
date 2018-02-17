import Command from './Command.js'

export default class Decrement extends Command {
  constructor(next, index) {
    super(next, index)
  }

  run() {
    this.actions.incremenetBucket(this.bucketId)
  }
}
