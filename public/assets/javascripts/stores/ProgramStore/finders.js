/*

This module contains methods pertaining to finding specific commands and then interacting with them or returning some of their information.

*/

export default {
  findCommand(id) {
    // returns the command object that matches the passed in id
    return $.grep(this.commands, function(command){
      return command.id == id
    })[0]
  },

  getCommandIndex(id) {
    // takes the id of a command and returns its index
    for (var i = 0; i < this.commands.length; i++) {
      if (this.commands[i].id == id) {
        return i
      }
    }

    // returns false if there is no match
    return false
  },

  deleteCommand(id) {
    // finds the index of the command whose id matches the passed in int
    // conducts a single element splice at that index and triggers a change
    const index = this.getCommandIndex(id)
    this.commands.splice(index, 1)
    this.emit('change')
  }
}
