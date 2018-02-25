/*

Represents a single bucket in the RM.
Each bucket can trigger rmActions to switch the currently edited bucket to itself.

Throgh Props
  - displays the number of stones it holds, according to BucketsStore.
  - displays it's id as part of a css id selector
  - works out if it is being edited. If so, it displays a special edit panel though the BucketEditor component.
  - works out if it has just been added, and if so animates in accoridngly



*/

import React from 'react'

import Stone from './Stone'
import BucketEditor from './BucketEditor'
import rmActions from '../../../actions/rmActions'

export default class Bucket extends React.Component {
  switchBucketEditor() {
    rmActions.switchBucketEditor(this.props.id)
  }

  render() {
    var editor = this.props.editMode ?
      <BucketEditor index={this.props.id}/> :
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
