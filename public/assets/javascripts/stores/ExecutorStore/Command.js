import rmActions from '../../actions/rmActions'

export default class Command {
  // The basis for Increment and Decrement.
  // both need access to rmActions
  // both are created with an id specificying a command and an id specifying a bucket

  constructor(nextCommand, bucket) {
    this.nextCommand = nextCommand
    this.bucket = bucket
    this.actions = rmActions
  }

  nextCommand() {
    return this.nextCommand
  }
}
