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

    const content = this.state.tutorial ?
      <Tutorial /> :
      <RegisterMachine />

    return(content)
  }
}
