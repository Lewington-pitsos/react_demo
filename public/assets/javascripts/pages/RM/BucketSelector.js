import React from 'react'

import executorStore from '../../stores/ExecutorStore'

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
        <option value={'bucket-' + i} > Bucket {i}</option>
      )
    }

    return options
  }

  render() {
    // renders a selector with one option correspoinding to each bucket

    console.log(this.state.number);

    return(
      <select name="bucket">
        {this.generateOptions()}
      </select>
    )
  }
}
