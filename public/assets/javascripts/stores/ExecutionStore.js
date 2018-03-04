/*

The only data in this store tracks is whether or not the RM program is currently executing. It also changes the UI depending on whether or not execution is occuring.

This could all be done in the ProgramStore, but I felt that tasks like prepairing the execution IU weren't really it's perogative.

*/

import {EventEmitter} from 'events'; // 'events is like, part of nodejs'

import dispatcher from '../dispatcher'

class ExecutionStore extends EventEmitter {
  constructor() {
    super()
    this.executing = false
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

}
