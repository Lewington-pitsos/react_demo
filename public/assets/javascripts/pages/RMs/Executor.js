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
                  .map((bucket) => <Bucket stoneNumber={bucket.stones} id={bucket.id}
                  key={bucket.id} /> )

    return(
      <div className="col-md-7">
        <div className="row justify-content-between">
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
