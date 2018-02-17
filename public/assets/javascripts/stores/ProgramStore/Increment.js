import Command from './Command.js'

export default class Increment extends Command {
  constructor(next, index, id) {
    super(next, index, id)
  }

  run() {
    this.actions.incremenetBucket(this.bucketId)
  }
}
