/*

This component renders a button which triggers the execution of the current program when cliked.

It has direct access to the bucketstore so that it can display the program input (which are defined as the number of rocks in each bucket when the execution begins).

It has direct access to rmActions. Execution is trigered by:
  - setting both the currently editing command and the currently editing bucket to null (whether or not they are null already), i.e. making it so that nothing is being edited
  - triggering an execute command

*/


import React from 'react'

import rmActions from '../../../../../actions/rmActions'
import bucketsStore from '../../../../../stores/BucketsStore'

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
