/*

This Store is responsible for storing data about commands and exeuting them in sequence when asked.

Commands are stored as an array of Increment and Decrement objects (see ProgramStore/CommandObjects). Broadly each of these objecst stores a bucket to interact with, and a command to run after finishing. They can run their own interactions.

== Command ids ==

  Each command has it's own unique Id generated using an always incrementing count. As commands are added and deleted these Id's do not change. Consiquently commands will always reference each other correctly, regardless of how the list is edited.


This Store also manages the adding of new commands and the editing of existing commands by:
  - updateing the commands array with new commands
  - keeping track of the command being edited
  - adding and deleting commands

  see commandListEditing

Lastly, it manages and tracks program execution and execution animations for the program list. The basic executuin procedure works like this:

  - Upon receiving an execute command, this store first validates the command list (see ProgramStore/validation).
  - if validation passes, the store locates the first command on the list and:
    - runs that command (triggering animations, bth directly and through the BucketStore)
    - finds the command scheudaled to be run next, and after a timeout (so that animations have a chance to run their course)
    - runs that new command
  - eventually we hit the null command, at which point execution is terminated and the bucketStore flashes a return value

All the while, the ProgramStore listens for a halt action, and immiidately terminates



*/


import {EventEmitter} from 'events'; // 'events is like, part of nodejs'

// other FLUX things
import dispatcher from '../dispatcher'
import rmActions from '../actions/rmActions'
import flashActions from '../actions/flashActions'

// Helper Libraries
import Increment from './ProgramStore/CommandObjects/Increment'
import Decrement from './ProgramStore/CommandObjects/Decrement'
import executionAnimations from './ProgramStore/executionAnimations'
import commandListEditing from './ProgramStore/commandListEditing'
import finders from './ProgramStore/finders'
import executionLogic from  './ProgramStore/executionLogic'
import validation from './ProgramStore/validation'

class ProgramStore extends EventEmitter {
  constructor() {
    super()
    this.commands = [
      // defaultNext, bucket, id, alternateNext
      new Decrement(2, 0, 1, 7),
      new Decrement(3, 1, 2, 5),
      new Increment(4, 2, 3),
      new Increment(2, 3, 4),
      new Decrement(6, 2, 5, 1),
      new Increment(5, 1, 6),
      new Decrement(8, 3, 7, 0),
      new Increment(7, 0, 8),

    ]
    this.nextId = 3
    this.editingCommand = 0

    this.stopped = true

    Object.assign(this, executionAnimations)
    Object.assign(this, finders)
    Object.assign(this, validation)
    Object.assign(this, commandListEditing)
    Object.assign(this, executionLogic)
  }

  // ======= component updating =========

  getInfo() {
    return {commands: this.commands, editingCommand: this.editingCommand}
  }

  executionInfo() {
    return {executing: !this.stopped}
  }

  // ======= Dispatcher stuff =========

  handleActions(action) {
    switch(action.type) {
      case "ADD_COMMAND": {
        this.addCommand(action.commandProps)
        break
      } case "HALT_EXECUTION": {
        this.finishExecution()
        break
      } case "EXECUTE": {
        this.executeIfValid()
        break
      } case "UPDATE_COMMAND": {
        this.updateCommand(action.specs)
        break
      } case "DELETE_COMMAND": {
        this.deleteCommand(action.id)
        break
      } case "CLEAR_COMMANDS": {
        this.clearCommands()
        break
      } case "SWITCH_EDITOR": {
        this.switchEditor(action.id)
        break
      }
    }
  }

  // ======= Program Execution =========

  executeIfValid() {
    // first validates the command list and executes the commands if they pass
    // otherwise triggers a halt execution action
    if (this.validateCommands()) {
      this.execute()
    } else {
      setTimeout(function() {
        // timeout to stop simaltanious dispatch errors
        rmActions.haltExecution()
        flashActions.flash('Hang on, some of the commands aren\'t valid (they refer to non existant commands or buckets or something). Please fix.')
      }, 0)
    }
  }

  haltExecution() {
    // resets the internal state and Ui for non-execution mode then emits a change
    this.stopped = true
    this.resetUi()

    this.emit('change')
  }

  finishExecution() {
    // same as halt but also triggers an action so that BucketStore can flash a  return value
    this.haltExecution()
    rmActions.finishExecution()
  }
}

const programStore = new ProgramStore;

dispatcher.register(programStore.handleActions.bind(programStore))
export default programStore;
