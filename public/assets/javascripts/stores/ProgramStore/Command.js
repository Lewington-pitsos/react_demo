import executorStore from '../ExecutorStore'

export default class Command {
  // The basis for Increment and Decrement: perform an action and return the next comand when asked
  // both need access to rmActions
  // both are created with an id specificying a command and an id specifying a bucket and an id for the command itself

  constructor(nextCommand, bucket, id) {
    this.nextCommand = nextCommand
    this.bucketId = bucket
    this.store = executorStore
    this.id = id
    // justAdded set to true by default so every new command is indeed registered as being just added
    this.justAdded = true
  }

  next() {
    return this.nextCommand
  }
}
