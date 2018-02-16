import React from 'react'

import Bucket from './Executor/Bucket'
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
      <div className="col-md-6">
        <div className="row">
          <div className="col-5 buckets d-flex flex-column">
            {buckets}
          </div>
          <div className="col-5 ugg-holder">
            <p>Ugg</p>
          </div>
        </div>
      </div>
    )
  }
}
