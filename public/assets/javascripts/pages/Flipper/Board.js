import React from 'react'
import PropTypes from 'prop-types';

import Cell from './Board/Cell'

import boardStore from '../../stores/BoardStore'

export default class Board extends React.Component {
  constructor() {
    super()
    this.state = boardStore.cellSpecs()
  }

  componentWillMount() { // triggered just before a render occurs apparently
    boardStore.on('change', () => {
      this.state = boardStore.cellSpecs()
    })
  }

  render() {
    // creates a number of cell componeents and then renders them within a flexbox
    const cells = Array(this.state.number)
      .fill()
      .map((_, index) => <Cell id={index} size={this.state.cellSize} />)

    return(
      <div className="d-flex justify-content-center p-0 board flex-wrap">
       {cells}
      </div>
    )
  }
}
