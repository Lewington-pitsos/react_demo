import Command from './Command.js'

export default class Decrement extends Command {
  constructor(next, bucket, alternateNext) {
    super(next, bucket)
    this.defaultNext = next
    this.alternateNext = alternateNext
  }

  run() {
    
  }
}
