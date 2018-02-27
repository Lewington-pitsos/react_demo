/*

This component renders out a form select box.
It has direct access to the Bucketstore, and updates it's state whenever that store changes. The only property it cares about though is the total number of buckets.

Though it could be used more broadly, we only need it to edit commands.

It uses this number to render out an <option> for every bucket.

It expects two props:
  - current: should be the index/id of the bucket that the command we're editing currently has selected
  - update: a method to be fired whenever the select value changes

*/

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
    // generates bucket options and pushes them to an array untill it hits the total number of buckets
    // option is displayed as refering to a bucket one higher than it's value
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
