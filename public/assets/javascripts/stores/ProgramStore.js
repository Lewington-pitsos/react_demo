import {EventEmitter} from 'events'; // 'events is like, part of nodejs'

import Command from './ProgramStore/Command'
import Increment from './ProgramStore/Increment'
import Decrement from './ProgramStore/Decrement'
import dispatcher from '../dispatcher'
import executionAnimations from './ProgramStore/executionAnimations'
import programHelpers from './ProgramStore/programHelpers'
import executionStore from  './ExecutionStore'
import rmActions from '../actions/rmActions'

class ProgramStore extends EventEmitter {
  constructor() {
    super()
    this.commands = [
      new Decrement(2, 0, 1, 0),
      new Increment(3, 1, 2),
      new Increment(4, 2, 3),
      new Increment(5, 0, 4),
      new Increment(6, 1, 5),
      new Increment(0, 2, 6),

    ]
    this.nextId = 3
    this.editingCommand = 2

    this.stopped = false

    Object.assign(this, executionAnimations);
    Object.assign(this, programHelpers);
  }

  getInfo() {
    return {commands: this.commands, editingCommand: this.editingCommand}
  }

  handleActions(action) {
    switch(action.type) {
      case "ADD_COMMAND": {
        this.addCommand(action.commandProps)
        break
      } case "EXECUTE": {
        this.execute()
        break
      } case "STOP_EXECUTION": {
        this.finish()
        break
      } case "UPDATE_COMMAND": {
        this.updateCommand(action.specs)
        break
      } case "DELETE_COMMAND": {
        this.deleteCommand(action.id)
        break
      } case "SWITCH_EDITOR": {
        this.switchEditor(action.id)
        break
      }
    }
  }

  switchEditor(id) {
    this.editingCommand = id

    this.emit('change')
  }

  addCommand(props) {
    // set all currently added commands as old, and switches the editing command to be the new one
    // creates and then pushes a new command object, and emits a change event
    this.switchEditor(this.nextId)
    this.commands.forEach((command) => command.justAdded = false)
    this.commands.push(this.newCommand(props))

    this.emit('change')
  }

  execute() {
    // gets the id of the first command and feeds it to the recursive runNextCommand function
    this.stopped = false
    var commandId = this.commands[0].id
    this.runNextCommand(commandId, 1600)
  }

  finish() {
    this.stopped = true
  }

  runNextCommand(id, animationDuration) {
    // if we get stopped by a stop action, simply cease executing new commands (the execution store will also be stopped by the same actions)
    if (!this.stopped) {
      // othwesie keep executing new commands untill we hit the end exectution command (id = 0)
      if (id) {

        // otherwise we execute the current command and find its id
        var newId = this.executeCommand(id)
        // finally we recur with the new id after a animationDuration milliseconds
        setTimeout(this.runNextCommand.bind(this), animationDuration, newId, animationDuration)
      } else {
        // in which case trigger an execution stopping action
        rmActions.stopExecution()
      }
    }
  }

  executeCommand(id) {
    // moves the execution tracker over the current command runs it and returns the next command
    this.moveExecutionTracker(id)
    var currentCommand = this.findCommand(id)
    currentCommand.run()
    return currentCommand.next()
  }

  updateCommand(specs) {
    // searches the command list for a command whose id matches the id in specs
    // switches that command out for a new one created using specs
    for (var i = 0; i < this.commands.length; i++) {
      if (this.commands[i].id == specs.id) {
        // we create a new command, specify that it had already been added, and overwrite the old command with it
        var newCommand = this.newCommand(specs)
        newCommand.justAdded = false
        this.commands[i] = newCommand
      }
    }

    this.emit('change')
  }

  newCommand(props) {
    // generates an id for the new command
    // returns a new command object given an object of command properties
    var id = props.id || this.getNextId() // if an id is passed in we are updating an existing command
    if (props.increment) {
      return(new Increment(props.nextCommand, props.bucket, id))
    } else {
      return(new Decrement(props.nextCommand, props.bucket, id, props.alternateNext))
    }
  }
}

const programStore = new ProgramStore;

dispatcher.register(programStore.handleActions.bind(programStore))
export default programStore;
