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
      new Increment(0, 1, 2)
    ]
    this.nextId = 3
    this.editingCommand = 2
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

  getNextId() {
    var id = this.nextId

    this.nextId += 1

    return id
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

  execute() {
    // gets the id of the first command and feeds it to the recursive runCommand function
    var commandId = this.commands[0].id
    this.runCommand(commandId, 1200)
  }

  runCommand(id, animationDuration) {
    // animationDuration: the time it takes for ugg to move and add or take
    // if id is falsy (i.e. 0) we exit
    if (id) {

      // otherwise we find the command that matches id, run it, and find it's speciefied next command
      var currentCommand = this.findCommand(id)
      currentCommand.run()
      var newId = currentCommand.next()

      // finally we recur with the new id after a animationDuration milliseconds
      setTimeout(this.runCommand.bind(this), animationDuration, newId, animationDuration)
    }
  }

  findCommand(id) {
    // returns the command that matches the passed in id
    return $.grep(this.commands, function(command){
      return command.id == id
    })[0]
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

  getCommandIndex(id) {
    // takes the id of a command and returns its index
    for (var i = 0; i < this.commands.length; i++) {
      if (this.commands[i].id == id) {
        return i
      }
    }

    // returns false if there is no match
    return false
  }

  deleteCommand(id) {
    // finds the index of the command whose id matches the passed in int
    // conducts a single element splice at that index and triggers a change
    const index = this.getCommandIndex(id)
    this.commands.splice(index, 1)
    this.emit('change')
  }
}

const programStore = new ProgramStore;

dispatcher.register(programStore.handleActions.bind(programStore))
export default programStore;
