import React from 'react'
import Stone from './Stone'


export default class Ugg extends React.Component {

  render() {
    return(
        <div className="ugg row p-0 position-relative">
          <div className="col-6 pt-2">
            <h4>Ugg</h4>
          </div>
          <div className="col-6 d-flex uggs-sack align-items-center">
            <p>Ugg's Sack</p>
          </div>
          <div className="overlay d-flex align-items-center justify-content-end">
            <div className="uggs-stone position-relative">
              <Stone />
            </div>
          </div>
        </div>
    )
  }
}
