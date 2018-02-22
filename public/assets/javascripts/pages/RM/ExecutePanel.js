import React from 'react'

import rmActions from '../../actions/rmActions'
import flashActions from '../../actions/flashActions'
import executionStore from '../../stores/ExecutionStore'
import ExecuteButton from './ExecutePanel/ExecuteButton'

export default class ExecutePanel extends React.Component {
  constructor() {
    super()
    this.state = executionStore.getInfo()
  }

  componentWillMount() {
    executionStore.on('change', () => {
      this.setState( executionStore.getInfo() )
    })
  }

  stop() {
    rmActions.haltExecution()
    flashActions.flash('Execution halted.')
  }


  render() {
    // hides the execution button or the execution elements depending on state

    const hide = this.state.executing ?
      '' :
      'hidden'

    return(
      <div className="execute-panel d-flex flex-wrap">
        <div className={'execution-spinner button-looking ' + hide} >
          <p>Executing</p>
          <div className="loader"></div>
        </div>
        <button className={'btn btn-primary stop ' + hide} onClick={this.stop.bind(this)}>Halt</button>
        <ExecuteButton hidden={this.state.executing}/>
      </div>
    )
  }
}
