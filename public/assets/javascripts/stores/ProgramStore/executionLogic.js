export default {
  execute() {
    // prepairs the UI for smooth execution (e.g. invisible overlays to prevent clicks) and emits a change to let everthing know execution has begin
    // gets the id of the first command and feeds it to the recursive runNextCommand function
    this.prepairExecutionUi()
    this.executing = true
    var commandId = this.getFirstCommandId()
    this.runCommand(commandId, 1200)

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

  runCommand(id, animationDuration) {
    // if we get stopped by a human-commanded halt, simply cease executing new commands (the execution store will also be stopped by the same actions)
    if (this.executing) {

      // In all other cases keep executing new commands untill we hit the end exectution command (id = 0)
        // in which case trigger an execution stopping action
        // otherwise run the next command

      if (id) {
        this.continueRunning(id, animationDuration)
      } else {
        this.finishExecution()
      }
    }
  },

  continueRunning(id, animationDuration) {
    // execute the current command and find its id
    // call runCommand with the new id after a animationDuration milliseconds
    var newId = this.executeCommand(id)
    setTimeout(this.runCommand.bind(this), animationDuration, newId, animationDuration)
  },

  executeCommand(id) {
    // moves the execution tracker over the current command, runs it and returns the next command
    this.moveExecutionTracker(id)
    var currentCommand = this.findCommand(id)
    currentCommand.run()
    return currentCommand.next()
  }

}
