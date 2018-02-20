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
    // renders a number of stones according to props

    if (this.state.executing) {
      var contents =
      <div className="d-flex justify-content-end flex-wrap">
        <div className="execution-spinner button-looking">
          <p>Executing</p>
          <div className="loader"></div>
        </div>
        <button className="btn btn-primary stop" onClick={this.stop.bind(this)}>Halt</button>
      </div>
    } else {
      var contents = <ExecuteButton />
    }

    return(
      <div className="execution-panel d-flex justify-content-end flex-wrap">
        {contents}
      </div>
    )
  }
}
