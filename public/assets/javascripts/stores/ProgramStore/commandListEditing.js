/*

Thos module contains methods for editing the command list, such as adding, deleting and updating commands, plus related helper methods.

*/

import Increment from './Increment'
import Decrement from './Decrement'

export default {
  switchEditor(id) {
    this.editingCommand = id

    this.emit('change')
  },

  addCommand(props) {
    // set all currently added commands as old, and switches the editing command to be the new one
    // creates and then pushes a new command object, and emits a change event
    this.switchEditor(this.nextId)
    this.commands.forEach((command) => command.justAdded = false)
    this.commands.push(this.newCommand(props))

    this.emit('change')
  },

  newCommand(props) {
    // generates an id for the new command
    // returns a new command object given an object of command properties
    var id = props.id || this.getNextId() // if an id is passed in we are updating an existing command
    if (props.increment) {
      return(new Increment(props.nextCommand, props.bucket, id))
    } else {
      return(new Decrement(props.nextCommand, props.bucket, id, props.alternateNext))
    }
  },

  updatedCommand(specs) {
    // creates a command object and speciefies that this command is not newly added to the list of commands
    var newCommand = this.newCommand(specs)
    newCommand.justAdded = false
    return newCommand
  },

  updateCommand(specs) {
    // searches the command list for the old command (a command whose id matches the id in specs)
    // creates a new command, specifying that that it has already been added before
    // overwrites the old command and replaces it with the new one
    for (var i = 0; i < this.commands.length; i++) {
      if (this.commands[i].id == specs.id) {
        this.commands[i] = this.updatedCommand(specs)
      }
    }

    this.emit('change')
  },

  deleteCommand(id) {
    // finds the index of the command whose id matches the passed in int
    // conducts a single element splice at that index and triggers a change
    const index = this.getCommandIndex(id)
    this.commands.splice(index, 1)
    this.emit('change')
  }
}
