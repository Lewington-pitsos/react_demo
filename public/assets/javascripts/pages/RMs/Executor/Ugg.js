import React from 'react'
import Stone from './Stone'


export default class Ugg extends React.Component {

  render() {
    return(
      <div className="ugg-wrapper">
        <h4>Ugg</h4>
        <div className="position-relative">
          <div className="ugg row">
            <div className="col-6">
            </div>
            <div className="col-6 d-flex uggs-sack align-items-center">
              <p className="m-0">Ugg's Sack</p>
            </div>
          </div>
          <div className="overlay d-flex align-items-center justify-content-end">
            <div className="uggs-stone position-relative">
              <Stone />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
