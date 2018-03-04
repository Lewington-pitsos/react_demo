export default {
  moveExecutionTracker(commandId) {
    // finds the index of the current command
    // shifts the command-execution-tracker down to cover it and scolls the window to follow the command-execution-tracker
    var commandHeight = 100
    var currentCommandTop = commandHeight * this.getCommandIndex(commandId)
    $('#command-execution-tracker').animate({
      top: currentCommandTop
    }, 400)

    var commandsHeight = $('.commands').height()
    $('.commands').animate({
      scrollTop: currentCommandTop - (commandsHeight - 130)
    }, 400)
  },

  prepairExecutionUi() {
    // sets up the UI for execution
    this.showExecutionTracker()
    $('#RM-overlay').removeClass('hidden')
  },

  resetUi() {
    this.resetExecutionTracker()
    $('#RM-overlay').addClass('hidden')
  },

  showExecutionTracker() {
    // makes the command-execution-tracker visible, then fades it in
    var $tracker = $('#command-execution-tracker')
    $tracker.removeClass('hidden')
    $tracker.fadeTo(300, 1)
  },

  resetExecutionTracker() {
    // fades the CET out, makes it invisible and then resets it's position to the very top again
    var $tracker = $('#command-execution-tracker')
    $tracker.fadeTo(300, 0)
    setTimeout(function() {
      $tracker.addClass('hidden')
      $tracker.css({
        top: 0
      })
    }, 301)
  }
}
