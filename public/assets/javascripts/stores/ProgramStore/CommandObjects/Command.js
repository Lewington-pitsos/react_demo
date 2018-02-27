import bucketsStore from '../../BucketsStore'

export default class Command {
  // this is the basis for Increment and Decrmeent: both need a default next command, a bucket to interact with, access to the bucketsStore, an id and an indicator of whether the command is newly added

  constructor(nextCommand, bucket, id) {
    this.nextCommand = nextCommand
    this.bucketId = bucket
    this.store = bucketsStore
    this.id = id
    // justAdded set to true by default so every new command is indeed registered as being just added
    this.justAdded = true
  }
}
