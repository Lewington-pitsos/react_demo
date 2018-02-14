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

  render() {
    return(
      <div>
        <h1>Flipper Page</h1>
        <Board />
        <div className="container-fluid interface bottom">
          <button className="btn btn-primary" onClick={this.addCell.bind(this)}>Go ahead, add a cell</button>
          <button className="btn btn-primary rand-flipping" onClick={this.randFlipping.bind(this)}>Start Flipping</button>
        </div>
      </div>
    )
  }
}
