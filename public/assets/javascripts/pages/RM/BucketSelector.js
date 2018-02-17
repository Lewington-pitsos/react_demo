import React from 'react'

import executorStore from '../../stores/ExecutorStore'
import rmActions from '../../actions/rmActions'

export default class BucketSelector extends React.Component {
  constructor() {
    super()
    this.state = executorStore.bucketNumber()

    this.generateOptions.bind(this)
  }

  componentWillMount() {
    executorStore.on('change', () => {
      this.setState( executorStore.bucketNumber() )
    })
  }

  generateOptions() {
    // generates bucket options (starting at one and ending ON the total number of buckets) and pushes them to an array
    var options = []

    for (var i = 1; i <= this.state.number; i++) {
      options.push(
        <option value={i} key={i} > Bucket {i}</option>
      )
    }

    return options
  }

  incremenetBucket(event) {
    // target.value is the bucket id
    rmActions.incremenetBucket(event.target.value)
  }

  decrementBucket(event) {
    // target.value is the bucket id
    rmActions.decrementBucket(event.target.value)
  }

  render() {
    // renders a selector with one option correspoinding to each bucket

    console.log(this.state.number);

    return(
      <select name="bucket" onChange={this.decrementBucket.bind(this)}>
        {this.generateOptions()}
      </select>
    )
  }
}
