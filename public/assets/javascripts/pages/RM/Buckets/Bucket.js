import React from 'react'

import Stone from './Stone'
import BucketEditor from './BucketEditor'
import rmActions from '../../../actions/rmActions'

export default class Bucket extends React.Component {
  switchBucketEditor() {
    rmActions.switchBucketEditor(this.props.id)
  }

  noBucketEditor() {
    rmActions.switchBucketEditor(-1)
  }

  render() {
    // renders a number of stones according to props

    var editor = this.props.editMode ?
      <BucketEditor exit={this.noBucketEditor.bind(this)} index={this.props.id}/> :
      null

    var animationClasses = this.props.newBucket ? 'animated fadeInUp' : ''

    return(
      <div>
        <div className={'bucket ' + animationClasses} id={'bucket-' + this.props.id}
        onClick={this.switchBucketEditor.bind(this)}>
        <h5>{this.props.id + 1}.</h5>
        <div className='d-flex justify-content-center align-items-center'>
          <h2>{this.props.stoneNumber}x</h2>
          <Stone size={50}/>
        </div>
        </div>
        {editor}
      </div>
    )
  }
}
