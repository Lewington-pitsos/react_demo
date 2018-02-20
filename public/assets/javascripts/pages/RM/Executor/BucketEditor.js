import React from 'react'

export default class BucketEditor extends React.Component {
  execute() {
    console.log('lolololo');
  }

  render() {
    return(
      <div className="bucket-editor d-flex justify-content-between flex-wrap">
        <button className="btn btn-primary" onClick={this.execute.bind(this)}>Increment</button>
        <button className="btn btn-primary" onClick={this.execute.bind(this)}>Decrement</button>
        <button className="btn btn-primary" onClick={this.execute.bind(this)}>Empty</button>
        <button className="btn btn-primary" onClick={this.execute.bind(this)}>Done</button>
      </div>
    )
  }
}
