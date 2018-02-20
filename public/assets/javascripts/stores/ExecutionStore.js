import {EventEmitter} from 'events'; // 'events is like, part of nodejs'

import dispatcher from '../dispatcher'

class ExecutionStore extends EventEmitter {
  constructor() {
    super()
    this.executing = false
    this.tutorial = true
  }

  getTutorial() {
    return {tutorial: this.tutorial}
  }

  exitTutorial() {
    setTimeout(function() {
      $('.tutorial').addClass('hidden')
    }, 801)

    this.tutorial = false

    this.emit('change')
  }

  setTutorialHeight() {
    var navHeight = 60
    var tutorialHeight = $(window).height() - navHeight

    $('.tutorial').height(tutorialHeight)
  }

  enterTutorial() {
    this.setTutorialHeight()
    $('.tutorial').removeClass('hidden')
    this.tutorial = true

    this.emit('change')
  }

  getInfo() {
    return {executing: this.executing}
  }

  execute() {
    this.prepairExecutionUi()
    this.executing = true

    this.emit('change')
  }

  prepairExecutionUi() {
    // sets up the UI for execution
    this.showExecutionTracker()
    $('#RM-overlay').removeClass('hidden')
  }

  showExecutionTracker() {
    // makes the command-execution-tracker visible, then fades it in
    var $tracker = $('#command-execution-tracker')
    $tracker.removeClass('hidden')
    $tracker.fadeTo(300, 1)
  }

  finish() {
    this.resetExecutionTracker()
    $('#RM-overlay').addClass('hidden')
    this.executing = false

    this.emit('change')
  }

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

  handleActions(action) {
    switch(action.type) {
      case "EXECUTE": {
        this.execute()
        break
      } case "HALT_EXECUTION": {
        this.finish()
        break
      } case "FINISH_EXECUTION": {
        this.finish()
        break
      } case "EXIT_TUTORIAL": {
        this.exitTutorial()
        break
      } case "ENTER_TUTORIAL": {
        this.enterTutorial()
        break
      }
    }
  }

}

const executionStore = new ExecutionStore;

dispatcher.register(executionStore.handleActions.bind(executionStore))
export default executionStore;
