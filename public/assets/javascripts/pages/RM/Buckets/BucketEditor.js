/*

This component just houses a list of buttons that directly trigger rmActions:
  - to switch it's parent bucket component out of edit mode
  - increment, decrment and empty the stones in it's parent bucket

The only thing it gets through props is an index/id, which isn't displayed but used to target it's particular parent with stone-altering actions.

*/

import React from 'react'
import rmActions from '../../../actions/rmActions'

export default class BucketEditor extends React.Component {
  noBucketEditor() {
    rmActions.switchBucketEditor(-1)
  }

  increment() {
    rmActions.autoIncrement(this.props.index)
  }

  decrement() {
    rmActions.autoDecrement(this.props.index)
  }

  empty() {
    rmActions.emptyBucket(this.props.index)
  }

  render() {
    return(
      <div className="bucket-editor d-flex justify-content-between flex-wrap animated fadeIn">
        <button className="btn btn-primary" onClick={this.increment.bind(this)}>Increment</button>
        <button className="btn btn-primary" onClick={this.decrement.bind(this)}>Decrement</button>
        <button className="btn btn-primary" onClick={this.empty.bind(this)}>Empty</button>
        <button className="btn btn-primary" onClick={this.noBucketEditor.bind(this)}>Done</button>
      </div>
    )
  }
}
