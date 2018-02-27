import Command from './Command.js'

export default class Increment extends Command {
  // prompts BucketSTore to increment a bucket. Always returns the same commaned though next()
  constructor(next, index, id) {
    super(next, index, id)
  }

  run() {
    this.store.incrementBucket(this.bucketId)
  }

  next() {
    return this.nextCommand
  }
}
