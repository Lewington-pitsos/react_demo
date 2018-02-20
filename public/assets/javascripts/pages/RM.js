import React from 'react'

import Buckets from './RM/Buckets'
import Program from './RM/Program'
import ControlPanel from './shared/ControlPanel'
import rmActions from '../actions/rmActions'
import BucketSelector from './RM/BucketSelector'
import ExecutePanel from './RM/ExecutePanel'
import executionStore from '../stores/ExecutionStore'

export default class RM extends React.Component {
  constructor() {
    super()
    this.state = executionStore.getInfo()
  }

  componentWillMount() { // triggered just before a render occurs apparently
    executionStore.on('change', () => {
      this.setState( executionStore.getInfo() )
    })
  }

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

    const animation = this.state.executing ? 'fadeIn' : 'fadeOut'

    return(
      <div id="RMs-page">
        <div className="row justify-content-around register-machine m-0">
          <Program />
          <Buckets />
          <div  className="overlay hidden" id="RM-overlay">
          </div>
        </div>
        <ControlPanel classes="animated row" fadeIn="fadeInUp" fadeOut="fadeOutDown" GOLActive={true}>
            <div className="col-md-6 p-0 edit d-flex justify-content-around flex-wrap position-relative">
              <button className="btn btn-primary" onClick={this.addBucket.bind(this)}>Add Bucket</button>
              <button className="btn btn-primary" onClick={this.removeBucket.bind(this)}>Remove Bucket</button>
              <button className="btn btn-primary" onClick={this.addIncrement.bind(this)}>Add Command</button>
              <div className={'overlay dark animated ' + animation}>
              </div>
            </div>
            <div className="col-md-6 p-0 execute">
              <ExecutePanel />
            </div>
        </ControlPanel>
      </div>
    )
  }
}
