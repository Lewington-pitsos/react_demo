export default {
  moveExecutionTracker(commandId) {
    var commandSelector = '#command-' + commandId
    var commandHeight = 100
    var currentCommandTop = commandHeight * (commandId - 1)
    $('#command-execution-tracker').animate({
      top: currentCommandTop
    }, 400)
    $('.commands').animate({
      scrollTop: currentCommandTop
    }, 400)
  },

  showExecutionTracker() {
    var $tracker = $('#command-execution-tracker')
    $tracker.removeClass('hidden')
    $tracker.fadeTo(300, 1)
  },

  resetExecutionTracker() {
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
