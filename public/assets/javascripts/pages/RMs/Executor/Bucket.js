import React from 'react'

import Stone from './Stone'

export default class Bucket extends React.Component {
  render() {
    // renders a number of stones according to props

    var animationClasses = this.props.newBucket ? 'animated fadeInUp' : ''

    return(
      <div className={'bucket d-flex justify-content-center align-items-center ' + animationClasses} id={'bucket-' + this.props.id}>
        <h2>{this.props.stoneNumber}x</h2>
        <Stone size={50}/>
      </div>
    )
  }
}
