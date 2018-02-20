import React from 'react'

import Bucket from './Executor/Bucket'
import Ugg from './Executor/Ugg'
import executorStore from '../../stores/ExecutorStore'

export default class Executor extends React.Component {
  constructor() {
    super()
    this.state = executorStore.getInfo()
  }

  componentWillMount() { // triggered on each innitial render of this component
    executorStore.on('change', () => {
      this.setState( executorStore.getInfo() )
    })
  }

  render() {

    const buckets = this
      .state
      .buckets
      .map((bucket, index) =>
        <Bucket stoneNumber={bucket.stones}
          id={index}
          key={index}
          newBucket={bucket.justAdded}
          editMode={index == this.state.editingBucket}/> )

    return(
      <div className="col-md-7 executor">
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
