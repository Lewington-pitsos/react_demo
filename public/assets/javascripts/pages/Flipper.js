/*

High level page display, containing:
  - a board of cell components
  - the page title
  - two overapping control panels, one for the GOL, one for normal flipping and board editing
  - one header panel for the GOL

Has direct access to the flipperSTore so it can display cues to the user

Fires off board editing editing actions, and one action that activates the GOL

*/


import React from 'react'

import Board from './Flipper/Board'
import Panel from './shared/Panel'
import cellActions from '../actions/cellActions'
import flipperStore from '../stores/FlipperStore'
import GOLPanel from './Flipper/GOLPanel'
import RandFlipper from './Flipper/RandFlipper'


export default class Flipper extends React.Component {
  constructor() {
    super()
    this.state = flipperStore.getInfo()
  }

  componentWillMount() { // triggered just before a render occurs apparently
    flipperStore.on('change', () => {
      this.setState( flipperStore.getInfo() )
    })
  }

  componentDidMount() {
    // we want to hide GOL related components by default, otherwise they would start by fading out
    $('.GOL').addClass('hidden')
  }

  addCell() {
    cellActions.addCell(1)
  }

  addFiveCells() {
    cellActions.addCell(5)
  }

  fixBoard() {
    // the current width of the baord is recorded so that we can fix the grid cells the same way that they are displayed
    cellActions.fixBoard($('#board').width())
  }

  render() {

    return(
      <div className="animated fadeIn">
        <Panel classes="GOL animated" side="top" fadeIn="fadeInDown" fadeOut="fadeOutUp" GOLActive={this.state.GOLMode}>
          <h2>Game of Life Simulator</h2>
        </Panel>
        <h1>Flipper</h1>
        <div className="d-flex align-items-center flex-column GOL_wrapper p-4">
          <Board />
        </div>
        <Panel classes="animated" fadeIn="fadeInUp" fadeOut="fadeOutDown" GOLActive={!this.state.GOLMode}>
          <button className="btn btn-primary" onClick={this.addCell.bind(this)}>Add Cell</button>
          <button className="btn btn-primary" onClick={this.addFiveCells.bind(this)}>Add 5</button>
          <RandFlipper />
          <button className="btn btn-primary fix-board" onClick={this.fixBoard.bind(this)}>Game of Life</button>
        </Panel>
        <GOLPanel GOLActive={this.state.GOLMode}/>
      </div>
    )
  }
}
