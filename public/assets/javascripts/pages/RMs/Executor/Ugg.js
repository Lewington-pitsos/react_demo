import React from 'react'
import Stone from './Stone'


export default class Ugg extends React.Component {

  moveUgg() {
    var bucketId = 'bucket-3'
    var bucketHeight = ($('#' + bucketId).height() * 3 ) + 50
    $('.ugg-wrapper').animate({
      top: bucketHeight
    }, 1000)
  }

  render() {
    return(
      <div className="ugg-wrapper">
        <h4>Ugg</h4>
        <div className="ugg row">
          <div className="col-6">
          </div>
          <div className="col-6 uggs-stones d-flex align-items-center">
            <p className="m-0">Ugg's Sack</p>
          </div>
        </div>
      </div>
    )
  }
}
