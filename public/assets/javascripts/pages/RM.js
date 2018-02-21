import React from 'react'

import executionStore from '../stores/ExecutionStore'
import Tutorial from './RM/Tutorial'
import RegisterMachine from './RM/RegisterMachine'

export default class RM extends React.Component {
  constructor() {
    super()
    this.state = executionStore.getTutorial()
    this.tutorialAnimation = 'fadeInUp'
  }

  componentWillMount() { // triggered just before a render occurs apparently
    executionStore.on('change', () => {
      this.setState( executionStore.getTutorial() )
    })
  }

  componentDidMount() {
    // When we navigate to the RM page, the tutorial can be shown without any actions triggering, so whenever we render the whole RM component (only happens on navigation I think)
    // hide the tutorial if it's not active
    // and otherwise we set it's height and hide the RMs page after a timeout
    if (!this.state.tutorial) {
      $('.tutorial').addClass('hidden')
    } else {
      this.setTutorialHeight()
      setTimeout(function() {
        $('#RMs-page').addClass('hidden')
      }, 801)
    }
  }

  setTutorialHeight() {
    var navHeight = 60
    var tutorialHeight = $(window).height() - navHeight

    $('.tutorial').height(tutorialHeight)
  }

  RMMode() {
    // un-hides the RM page starts the tutorial animating out and hides tutorial after the animation has finished
    this.tutorialAnimation = 'fadeOutDown'
    $('#RMs-page').removeClass('hidden')
    setTimeout(function() {
      $('.tutorial').addClass('hidden')
    }, 801)
  }

  tutorialMode() {
    // sets the height of the tutorial panel, un-hides it and animates it up
    // hides the RM panel after the animation has finished
    this.tutorialAnimation = 'fadeInUp'
    this.setTutorialHeight()
    $('.tutorial').removeClass('hidden')
    setTimeout(function() {
      $('#RMs-page').addClass('hidden')
    }, 801)
  }

  render() {

    var tutorialFade
    if (this.state.tutorial) {
      this.tutorialMode()
    } else {
      this.RMMode()
    }

    return(
      <div className="RM position-relative">
        <RegisterMachine />
        <Tutorial fade={this.tutorialAnimation}/>
      </div>

    )
  }
}
