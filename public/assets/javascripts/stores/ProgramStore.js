/*

This Store is responsible for storing data about commands and exeuting them in sequence when asked.

Commands are stored as an array of Increment and Decrement objects (see ProgramStore). Broadly each of these objecst stores a bucket to interact with, and a command to run after finishing. They can run their own interactions.

It also manages the adding of new commands and the editing of existing commands by:
  - updateing the commands array with new commands
  - keeping track of the command being edited


*/


import {EventEmitter} from 'events'; // 'events is like, part of nodejs'

// other FLUX things
import dispatcher from '../dispatcher'
import rmActions from '../actions/rmActions'
import flashActions from '../actions/flashActions'

// Helper Libraries
import Increment from './ProgramStore/Increment'
import Decrement from './ProgramStore/Decrement'
import executionAnimations from './ProgramStore/executionAnimations'
import commandListEditing from './ProgramStore/commandListEditing'
import finders from './ProgramStore/finders'
import executionStore from  './ExecutionStore'
import validation from './ProgramStore/validation'

class ProgramStore extends EventEmitter {
  constructor() {
    super()
    this.commands = [
      new Decrement(2, 1, 1, 0),
      new Increment(1, 0, 2)

    ]
    this.nextId = 3
    this.editingCommand = 0

    this.stopped = false

    Object.assign(this, executionAnimations)
    Object.assign(this, finders)
    Object.assign(this, validation)
    Object.assign(this, commandListEditing)
  }

  // ======= component updating =========

  getInfo() {
    return {commands: this.commands, editingCommand: this.editingCommand}
  }

  // ======= Dispatcher stuff =========

  handleActions(action) {
    switch(action.type) {
      case "ADD_COMMAND": {
        this.addCommand(action.commandProps)
        break
      } case "EXECUTE": {
        this.execute()
        break
      } case "HALT_EXECUTION": {
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

  // ======= Program Execution =========

  execute() {
    // first validates the command list
    // if the list validates, gets the id of the first command and feeds it to the recursive runNextCommand function
    // otherwise triggers a halt execution action
    if (this.validateCommands()) {
      this.stopped = false
      var commandId = this.commands[0].id
      this.runNextCommand(commandId, 1600)
    } else {
      setTimeout(function() {
        // timeout to stop simaltanious dispatch errors
        rmActions.haltExecution()
        flashActions.flash('Hang on, some of the commands aren\'t valid (they refer to non existant commands or buckets or something). Please fix.')
      }, 0)
    }

  }

  finish() {
    this.stopped = true
  }

  runNextCommand(id, animationDuration) {
    // if we get stopped by a stop dispatch, simply cease executing new commands (the execution store will also be stopped by the same actions)
    if (!this.stopped) {

      // In all other cases keep executing new commands untill we hit the end exectution command (id = 0)
        // in which case trigger an execution stopping action

        // otherwise we execute the current command and find its id
        // then recur with the new id after a animationDuration milliseconds

      if (id) {
        var newId = this.executeCommand(id)
        setTimeout(this.runNextCommand.bind(this), animationDuration, newId, animationDuration)
      } else {
        rmActions.finishExecution()
      }
    }
  }

  executeCommand(id) {
    // moves the execution tracker over the current command, runs it and returns the next command
    this.moveExecutionTracker(id)
    var currentCommand = this.findCommand(id)
    currentCommand.run()
    return currentCommand.next()
  }
}

const programStore = new ProgramStore;

dispatcher.register(programStore.handleActions.bind(programStore))
export default programStore;
