import React from 'react'

import Executor from './RM/Executor'
import Program from './RM/Program'
import ControlPanel from './shared/ControlPanel'
import rmActions from '../actions/rmActions'
import BucketSelector from './RM/BucketSelector'

export default class RM extends React.Component {
  addBucket() {
    rmActions.addBucket()
  }

  removeBucket() {
    rmActions.removeBucket()
  }

  addDecrement() {
    rmActions.addDecrement()
  }

  addIncrement() {
    rmActions.addIncrement()
  }

  execute() {
    rmActions.execute()
  }

  render() {
    return(
      <div id="RMs-page">
        <div className="row justify-content-around register-machine m-0">
          <Program />
          <Executor />
        </div>
        <ControlPanel classes="animated" fadeIn="fadeInUp" fadeOut="fadeOutDown" GOLActive={true}>
          <button className="btn btn-primary" onClick={this.addBucket.bind(this)}>Add Bucket</button>
          <button className="btn btn-primary" onClick={this.removeBucket.bind(this)}>Remove Bucket</button>
          <button className="btn btn-primary" onClick={this.addIncrement.bind(this)}>Add Command</button>
          <button className="btn btn-primary" onClick={this.execute.bind(this)}>Execute Progam</button>
        </ControlPanel>
      </div>
    )
  }
}
