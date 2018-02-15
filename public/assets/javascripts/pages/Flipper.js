import React from 'react'

import Board from './Flipper/Board'
import cellActions from '../actions/cellActions'
export default class Flipper extends React.Component {
  addCell() {
    cellActions.addCell()
  }

  randFlipping() {
    cellActions.randFlipping()
  }

  fixBoard() {
    // the current width of the baord is recorded so that we can fix the grid cells the same way that they are displayed
    cellActions.fixBoard($('#board').width())
  }

  cascadeFlip() {
    cellActions.cascadeFlip()
  }

  playRound() {
    cellActions.playRound()
  }

  render() {
    return(
      <div>
        <h1>Flipper Page</h1>
        <div className="d-flex justify-content-center">
          <Board />
        </div>
        <div className="container-fluid interface bottom">
          <button className="btn btn-primary" onClick={this.addCell.bind(this)}>Go ahead, add a cell</button>
          <button className="btn btn-primary rand-flipping" onClick={this.randFlipping.bind(this)}>Start Flipping</button>
          <button className="btn btn-primary fix-board" onClick={this.fixBoard.bind(this)}>Fix Board Dimensions</button>
          <button className="btn btn-primary cascade-flip" onClick={this.cascadeFlip.bind(this)}>Cascade Flip</button>
          <button className="btn btn-primary play-round" onClick={this.playRound.bind(this)}>Play Round</button>
        </div>
      </div>
    )
  }
}
