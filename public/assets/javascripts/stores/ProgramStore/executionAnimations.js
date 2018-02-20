export default {
  moveExecutionTracker(commandId) {
    // finds the index of the current command
    // shifts the command-execution-tracker down to cover it and scolls the window to follow the command-execution-tracker
    var commandHeight = 100
    var currentCommandTop = commandHeight * this.getCommandIndex(commandId)
    $('#command-execution-tracker').animate({
      top: currentCommandTop
    }, 400)
    $('.commands').animate({
      scrollTop: currentCommandTop
    }, 400)
  }
}
