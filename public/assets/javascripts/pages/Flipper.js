import React from 'react'

import Board from './Flipper/Board'
import cellActions from '../actions/cellActions'
export default class Flipper extends React.Component {
  addCell() {
    cellActions.addCell()
  }

  render() {
    return(
      <div>
        <h1>Flipper Page</h1>
        <Board cellNumber={40}/>
        <div className="container-fluid">
          <button onClick={this.addCell.bind(this)}>Go ahead, add a cell</button>
        </div>
      </div>
    )
  }
}
