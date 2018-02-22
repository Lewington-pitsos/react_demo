import React from 'react'

import bucketsStore from '../../stores/BucketsStore'

export default class BucketSelector extends React.Component {
  constructor() {
    super()
    this.state = bucketsStore.bucketNumber()

    this.generateOptions.bind(this)
  }

  componentWillMount() {
    bucketsStore.on('change', () => {
      this.setState( bucketsStore.bucketNumber() )
    })
  }

  generateOptions() {
    // generates bucket options (starting at one and ending ON the total number of buckets) and pushes them to an array
    var options = []

    for (var i = 0; i < this.state.number; i++) {
      options.push(
        <option value={i} key={i} > Bucket {i + 1}</option>
      )
    }

    return options
  }

  render() {
    // renders a selector with one option correspoinding to each bucket

    return(
      <select name="bucket" defaultValue={this.props.current} onChange={this.props.update} className="custom-select">
        {this.generateOptions()}
      </select>
    )
  }
}
