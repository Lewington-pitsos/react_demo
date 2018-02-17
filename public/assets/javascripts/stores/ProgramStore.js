import {EventEmitter} from 'events'; // 'events is like, part of nodejs'

import Command from './ProgramStore/Command'
import Increment from './ProgramStore/Increment'
import Decrement from './ProgramStore/Decrement'
import dispatcher from '../dispatcher'

class ProgramStore extends EventEmitter {
  constructor() {
    super()
    this.commands = [
      new Decrement(2, 0, 1, 0),
      new Increment(3, 1, 2),
      new Increment(4, 0, 3),
      new Increment(5, 4, 4),
      new Increment(0, 0, 5)
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
        props.alternateNext
      ))
    }

    this.emit('change')
  }

  execute() {
    // gets the id of the first command and feeds it to the recursive runCommand function
    var commandId = this.commands[0].id
    this.runCommand(commandId, 1400)
  }

  runCommand(id, animationDuration) {
    // animationDuration: the time it takes for ugg to move and add or take
    // if id is falsy (i.e. 0) we just print out a message
    if (id) {

      // otherwise we find the command that matches id, run it, and find it's speciefied next command
      var currentCommand = $.grep(this.commands, function(command){
        return command.id == id
      })[0]
      currentCommand.run()
      var newId = currentCommand.next()

      // finally we recur with the new id after a animationDuration milliseconds
      setTimeout(this.runCommand.bind(this), animationDuration, newId, animationDuration)
    } else {
      console.log('finished');
    }

  }
}

const programStore = new ProgramStore;

dispatcher.register(programStore.handleActions.bind(programStore))

window.programStore = programStore
export default programStore;
