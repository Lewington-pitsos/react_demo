import React from 'react'

import executionStore from '../stores/ExecutionStore'
import Tutorial from './RM/Tutorial'
import RegisterMachine from './RM/RegisterMachine'

export default class RM extends React.Component {
  constructor() {
    super()
    this.state = executionStore.getTutorial()
  }

  componentWillMount() { // triggered just before a render occurs apparently
    executionStore.on('change', () => {
      this.setState( executionStore.getTutorial() )
    })
  }

  render() {

    const tutorialFade = this.state.tutorial ? 'fadeInUp' : 'fadeOutDown'


    return(
      <div className="RM position-relative">
        <RegisterMachine />
        <Tutorial fade={tutorialFade}/>
      </div>

    )
  }
}
