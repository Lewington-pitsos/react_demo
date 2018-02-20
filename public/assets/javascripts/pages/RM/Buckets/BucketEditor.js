import React from 'react'
import rmActions from '../../../actions/rmActions'

export default class BucketEditor extends React.Component {
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
      <div className="bucket-editor d-flex justify-content-between flex-wrap animated fadeInDown">
        <button className="btn btn-primary" onClick={this.increment.bind(this)}>Increment</button>
        <button className="btn btn-primary" onClick={this.decrement.bind(this)}>Decrement</button>
        <button className="btn btn-primary" onClick={this.empty.bind(this)}>Empty</button>
        <button className="btn btn-primary" onClick={this.props.exit}>Done</button>
      </div>
    )
  }
}
