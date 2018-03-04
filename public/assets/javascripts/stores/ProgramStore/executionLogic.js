export default {
  execute() {
    // prepairs the UI for smooth execution (e.g. invisible overlays to prevent clicks) and emits a change to let everthing know execution has begin
    // gets the id of the first command and feeds it to the recursive runNextCommand function
    this.prepairExecutionUi()
    this.stopped = false
    var commandId = this.getFirstCommandId()
    this.runNextCommand(commandId, 1200)

    this.emit('change')
  },

  getFirstCommandId() {
    // returns the id of the first command, or the null id, if there are no commands
    if (this.commands.length) {
      return this.commands[0].id
    } else {
      return 0
    }
  },

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
        setTimeout(this.finishExecution.bind(this), 0)
      }
    }
  },

  executeCommand(id) {
    // moves the execution tracker over the current command, runs it and returns the next command
    this.moveExecutionTracker(id)
    var currentCommand = this.findCommand(id)
    currentCommand.run()
    return currentCommand.next()
  }

}
