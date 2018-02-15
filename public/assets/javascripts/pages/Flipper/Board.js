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
      this.setState( boardStore.cellSpecs() )
    })
  }

  render() {
    // creates a number of cell componeents and then renders them within a flexbox
    // the overarching cell size is passed in to each cell as a prop
    const cells = this
      .state
      .cells
      .map((cell) => <Cell id={cell.id}
                          key={cell.id}
                          size={this.state.cellSize}
                          backSide={cell.backSide}/>)

    return(
      <div className="d-flex justify-content-start p-0 board flex-wrap">
       {cells}
      </div>
    )
  }
}
