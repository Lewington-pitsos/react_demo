import React from 'react'

import Cell from './Board/Cell'

export default class Board extends React.Component {
  render() {
    const cells = Array(2)
      .fill()
      .map((_, index) => <Cell id={index} />)

    return(
      <div className="d-flex justify-content-center p-0 board">
       {cells}
      </div>
    )
  }
}
