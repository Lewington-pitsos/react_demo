import React from 'react'
import PropTypes from 'prop-types';

import Cell from './Board/Cell'
import boardStore from '../../stores/BoardStore'

export default class Board extends React.Component {
  constructor() {
    super()
    this.state = boardStore.cellSpecs()
  }

  componentWillMount() { // triggered just before the innitial render of the whole component
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

    // if a fixed width exists in state, we want to fix the board do that width
    var boardStyle = null
    if (this.state.fixedWidth) {
      boardStyle =   {
          width: this.state.fixedWidth + 'px',
          flexShrink: 0,
          justifyContent: 'flex-start'
        }
    }

    return(
      <div className="d-flex board flex-wrap" id="board" style={boardStyle}>
       {cells}
      </div>
    )
  }
}
