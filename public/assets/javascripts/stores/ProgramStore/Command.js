import rmActions from '../../actions/rmActions'

export default class Command {
  // The basis for Increment and Decrement: perform an action and return the next comand when asked
  // both need access to rmActions
  // both are created with an id specificying a command and an id specifying a bucket and an id for the command itself

  constructor(nextCommand, bucket, id) {
    this.nextCommand = nextCommand
    this.bucketId = bucket
    this.actions = rmActions
    this.id = id
  }

  nextCommand() {
    return this.nextCommand
  }
}
