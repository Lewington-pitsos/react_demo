/*

A board that displays all the cells in BoardStore
Has direct access to BoardStore and updates state on Cellstore changes
Has access to and renders out Cell components according to its state

*/

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
      .map((cell, index) =>
        <Cell id={index}
          key={index}
          size={this.state.cellSize}
          backSide={cell.backSide}/>)

    // if a fixed width exists in state, we want to fix the board do that width and change the alignment of its cells slightly
    var boardStyle = null
    if (this.state.fixedWidth) {
      boardStyle =   {
          width: this.state.fixedWidth + 'px',
          flexShrink: 0,
          justifyContent: 'flex-start'
        }
    }

    // we activate an invisible overlay to stop the user from triggering clicks while the GOL is playing
    const isHidden = this.state.playing ?
      '' :
      'hidden'

    return(
      <div className="d-flex board flex-wrap position-relative" id="board" style={boardStyle}>
       {cells}
       <div className={'overlay ' + isHidden}>
       </div>
      </div>
    )
  }
}
