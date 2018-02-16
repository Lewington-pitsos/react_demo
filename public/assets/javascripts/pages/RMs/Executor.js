import React from 'react'

import Bucket from './Executor/Bucket'

export default class Executor extends React.Component {
  render() {
    return(
      <div className="col-md-6">
        <div className="row">
          <div className="col-6 buckets d-flex flex-column">
            <Bucket stoneNumber={29} />
          </div>
          <div className="col-6 ugg-holder">
            <p>Ugg</p>
          </div>
        </div>
      </div>
    )
  }
}
