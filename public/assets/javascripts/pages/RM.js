import React from 'react'

import tutorialStore from '../stores/TutorialStore'
import Tutorial from './RM/Tutorial'
import RegisterMachine from './RM/RegisterMachine'

export default class RM extends React.Component {
  constructor() {
    super()
    this.state = tutorialStore.getTutorial()
    this.tutorialAnimation = 'fadeInUp'
  }

  componentWillMount() { // triggered just before a render occurs apparently
    tutorialStore.on('change', () => {
      this.setState( tutorialStore.getTutorial() )
    })
  }

  componentDidMount() {
    // When we navigate to the RM page, the tutorial can be shown without any actions triggering, so whenever we render the whole RM component (only happens on navigation I think)
    // hide the tutorial if it's not active
    // and otherwise we set it's height and hide the RMs page after a timeout
    if (!this.state.tutorial) {
      $('.tutorial').addClass('hidden')
    } else {
      this.setupTutorialPanel()
      $('#RMs-page').addClass('hidden')
    }
  }

  setupTutorialPanel() {
    // sets the tutorial panel's height and then scrolls to the top of it
    this.setTutorialHeight()
    $('.tutorial').css({
      scrollTop: 0
    })
  }

  setTutorialHeight() {
    // IF we haven't reached the boosttrab md breakpoint yet
    // sets the height of the tutorial panel such that it takes up exactly the whole window, minus the navbar
    if ($(window).width() > 767 ) {
      var navHeight = 60
      var tutorialHeight = $(window).height() - navHeight

      $('.tutorial').height(tutorialHeight)
    }
  }

  RMMode() {
    // un-hides the RM page starts the tutorial animating out and hides tutorial after the animation has finished
    $('html, body').animate({
      scrollTop: 0
    }, 400)
    this.tutorialAnimation = 'fadeOut'
    $('#RMs-page').removeClass('hidden')
    setTimeout(function() {
      $('.tutorial').addClass('hidden')
    }, 800)
  }

  tutorialMode() {
    // sets the height of the tutorial panel, un-hides it, scrolls it to the top and fades it in
    // hides the RM panel after the animation has finished
    this.tutorialAnimation = 'fadeIn'
    this.setupTutorialPanel()
    $('.tutorial').removeClass('hidden')
    $('.tutorial').animate({
      scrollTop: 0
    }, 1)
    setTimeout(function() {
      $('#RMs-page').addClass('hidden')
    }, 800)
  }

  render() {

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
