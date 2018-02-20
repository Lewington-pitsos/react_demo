import React from 'react'

import rmActions from '../../actions/rmActions'
import executorStore from '../../stores/ExecutorStore'

export default class ExecuteButton extends React.Component {
  constructor() {
    super()
    this.state = executorStore.getBucketContents()
  }

  componentWillMount() {
    executorStore.on('change', () => {
      this.setState( executorStore.getBucketContents() )
    })
  }

  execute() {
    rmActions.execute()
  }


  render() {
    // renders a number of stones according to props

    var contents = this.state.contents.join(', ')

    return(
      <button className="execute-button" onClick={this.execute.bind(this)}>
        Execute program({contents})
      </button>
    )
  }
}
