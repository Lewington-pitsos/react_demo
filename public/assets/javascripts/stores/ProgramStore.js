import {EventEmitter} from 'events'; // 'events is like, part of nodejs'

import Command from './ProgramStore/Command'
import Increment from './ProgramStore/Increment'
import Decrement from './ProgramStore/Decrement'
import dispatcher from '../dispatcher'
import executorStore from './ExecutorStore'

class ProgramStore extends EventEmitter {
  constructor() {
    super()
    this.commands = [
      new Increment(2, 0, 1),
      new Decrement(0, 1, 2, 1, executorStore.getBucket(1))
    ]
    this.nextId = 2
  }

  getInfo() {
    return {commands: this.commands}
  }

  handleActions(action) {
    switch(action.type) {
      case "ADD_COMMAND": {
        this.addCommand(action.commandProps)
        break
      } case "EXECUTE": {
        this.execute()
        break
      }
    }
  }

  getNextId() {
    var id = this.nextId

    this.getId += 1

    return id
  }

  addCommand(props) {
    // set all currently added commands as old
    this.commands.forEach((command) => command.justAdded = false)
    // checkes for the type of command to add
    // creates and pushes the appripriate command to commands
    var id = this.getNextId()

    if (props.increment) {
      this.commands.push(new Increment(
        props.nextCommand,
        props.bucket,
        id)
      )
    } else {
      this.commands.push(new Decrement(
        props.nextCommand,
        props.bucket,
        id,
        props.alternateNext,
        executorStore.getBucket(props.bucket)
      ))
    }

    this.emit('change')
  }

  execute() {
    var nextCommand = this.commands[0].id

    while (nextCommand) {
      // locates the command who'se id matches nextCommand
      var currentCommand = $.grep(this.commands, function(command){
        return command.id == nextCommand
      })[0]
      currentCommand.run()
      nextCommand = currentCommand.next()
    }
  }
}

const programStore = new ProgramStore;

dispatcher.register(programStore.handleActions.bind(programStore))

window.programStore = programStore
export default programStore;
