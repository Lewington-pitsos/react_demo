/*

This component represnets a sub-panel, or sub-section deitcated to execution of the register machine. While execution is occuring, this panel should display a spinner, and a 'halt' button that allows the user to halt execution. While not executing it should display an 'execute button' that allows the user to start execution.

It has direct access to the ExecutionStore, which is uses to work out whether execution is currently occuring.

It handles halting itself by triggering flashActions with a message AND rmActions with a halt command.

Both the halt/spinner and the execution button are always rendered, but the one that isn't active is hidden using css classes.

*/

import React from 'react'

import rmActions from '../../../../actions/rmActions'
import flashActions from '../../../../actions/flashActions'
import programStore from '../../../../stores/ProgramStore'
import ExecuteButton from './ExecutePanel/ExecuteButton'

export default class ExecutePanel extends React.Component {
  constructor() {
    super()
    this.state = programStore.executionInfo()
  }

  componentWillMount() {
    programStore.on('change', () => {
      this.setState( programStore.executionInfo() )
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
