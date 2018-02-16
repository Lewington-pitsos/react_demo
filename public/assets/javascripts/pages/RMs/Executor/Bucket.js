import React from 'react'

import Stone from './Stone'

export default class Bucket extends React.Component {

  stonesArray(number) {
    // returns an array of number Stone compoennets
    var stones = []
    for (var i = 0; i < number; i++) {
      stones.push(<Stone />)
    }

    return stones
  }

  render() {
    // renders a number of stones according to props
    var stones = this.stonesArray(this.props.stoneNumber)

    return(
      <div className="bucket d-flex justify-content-around align-items-start flex-wrap">
        {stones}
      </div>
    )
  }
}
