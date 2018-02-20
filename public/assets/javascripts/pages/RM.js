import React from 'react'

import Buckets from './RM/Buckets'
import Program from './RM/Program'
import ControlPanel from './shared/ControlPanel'
import rmActions from '../actions/rmActions'
import BucketSelector from './RM/BucketSelector'
import ExecuteButton from './RM/ExecuteButton'

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

  render() {
    return(
      <div id="RMs-page">
        <div className="row justify-content-around register-machine m-0">
          <Program />
          <Buckets />
          <div  className="overlay hidden" id="RM-overlay">
          </div>
        </div>
        <ControlPanel classes="animated" fadeIn="fadeInUp" fadeOut="fadeOutDown" GOLActive={true}>
          <button className="btn btn-primary" onClick={this.addBucket.bind(this)}>Add Bucket</button>
          <button className="btn btn-primary" onClick={this.addIncrement.bind(this)}>Add Command</button>
          <ExecuteButton />
        </ControlPanel>
      </div>
    )
  }
}
