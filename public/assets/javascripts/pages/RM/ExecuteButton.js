import React from 'react'

import rmActions from '../../actions/rmActions'
import bucketsStore from '../../stores/BucketsStore'

export default class ExecuteButton extends React.Component {
  constructor() {
    super()
    this.state = bucketsStore.getBucketContents()
  }

  componentWillMount() {
    bucketsStore.on('change', () => {
      this.setState( bucketsStore.getBucketContents() )
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
