import React from 'react'

import rmActions from '../../../actions/rmActions'
import bucketsStore from '../../../stores/BucketsStore'

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
    // first remove all editors, then execute
    rmActions.switchEditor(0)
    rmActions.switchBucketEditor(-1)
    rmActions.execute()
  }


  render() {
    // renders a number of stones according to props

    var contents = this.state.contents.join(', ')

    var hide = this.props.hidden ?
      'hidden' :
      ''

    return(
      <button className={'execute-button btn btn-primary ' + hide} onClick={this.execute.bind(this)}>
        Execute program({contents})
      </button>
    )
  }
}
