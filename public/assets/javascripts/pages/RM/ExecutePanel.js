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
      <div className="d-flex justify-content-around flex-wrap">
        <div className="execution-spinner button-looking">
          <p>Executing</p>
          <div class="loader"></div>
        </div>
        <button className="btn btn-primary" onClick={this.stop.bind(this)}>Stop </button>
      </div>
    } else {
      var contents = <ExecuteButton />
    }

    return(
      <div className="execution-panel">
        {contents}
      </div>
    )
  }
}
