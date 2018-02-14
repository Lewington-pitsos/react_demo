import React from 'react'
import PropTypes from 'prop-types';

import Cell from './Board/Cell'

export default class Board extends React.Component {
  render() {
    // creates a number of cell componeents and then renders them within a flexbox
    const cells = Array(this.props.cellNumber)
      .fill()
      .map((_, index) => <Cell id={index} size={100} />)

    return(
      <div className="d-flex justify-content-center p-0 board flex-wrap">
       {cells}
      </div>
    )
  }
}

Board.propTypes = {
  cellNumber: PropTypes.number.isRequired,
  cellSize: PropTypes.number.isRequired
}

Board.defaultProps = {
  cellNumber: 1,
  cellSize: 600
}
