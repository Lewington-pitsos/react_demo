/*

This component represents the list of all buckets.
it has direct access to the BucketsStore, and updates its state on changes to that store.

It renders an array of bucket components by:
  - passing bucket info from each bucket in state as props
  - displaying the buckets in a vertical stack, oldest to newest in the .buckets-holder column

It also statically renders ugg in the .ugg-holder column

*/


import React from 'react'

import Bucket from './Buckets/Bucket'
import Ugg from './Buckets/Ugg'
import bucketsStore from '../../stores/BucketsStore'

export default class Buckets extends React.Component {
  constructor() {
    super()
    this.state = bucketsStore.getInfo()
  }

  componentWillMount() { // triggered on each innitial render of this component
    bucketsStore.on('change', () => {
      this.setState( bucketsStore.getInfo() )
    })
  }

  render() {

    const buckets = this
      .state
      .buckets
      .map((bucket, index) =>
        <Bucke
          stoneNumber={bucket.stones}
          id={index}
          key={index}
          newBucket={bucket.justAdded}
          editMode={index == this.state.editingBucket}/> )

    return(
      <div className="col-md-7 buckets-holder">

        <div className="row justify-content-around">
          <div className="col-7 buckets d-flex flex-column">
            {buckets}
          </div>

          <div className="col-4 ugg-holder">
            <Ugg />
          </div>
        </div>

      </div>
    )
  }
}
