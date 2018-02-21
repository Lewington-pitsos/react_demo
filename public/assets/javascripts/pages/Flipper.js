import React from 'react'

import Board from './Flipper/Board'
import ControlPanel from './shared/ControlPanel'
import cellActions from '../actions/cellActions'
import flipperStore from '../stores/FlipperStore'


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
    $('.GOL').addClass('hidden')
  }

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

  exit() {
    cellActions.exit()
  }

  startGOL() {
    cellActions.startGOL()
  }

  render() {

    console.log(this.state);

    return(
      <div>
        <ControlPanel classes="GOL animated" side="top" fadeIn="fadeInDown" fadeOut="fadeOutUp" GOLActive={this.state.GOLState}>
          <h2>Game of Life Simulator</h2>
        </ControlPanel>
        <h1>Flipper Page</h1>
        <div className="d-flex align-items-center flex-column GOL_wrapper">
          <Board />
        </div>
        <ControlPanel classes="animated" fadeIn="fadeInUp" fadeOut="fadeOutDown" GOLActive={!this.state.GOLState}>
          <button className="btn btn-primary" onClick={this.addCell.bind(this)}>Add Cell</button>
          <button className="btn btn-primary rand-flipping" onClick={this.randFlipping.bind(this)}>Start Random Flipping</button>
          <button className="btn btn-primary fix-board" onClick={this.fixBoard.bind(this)}>Game of Life</button>
        </ControlPanel>
        <ControlPanel classes="GOL animated" fadeIn="fadeInUp" fadeOut="fadeOutDown" GOLActive={this.state.GOLState}>
          <button className="btn btn-primary cascade-flip" onClick={this.cascadeFlip.bind(this)}>Full flip</button>
          <button className="btn btn-primary play-round" onClick={this.playRound.bind(this)}>Play Single Round</button>
          <button className="btn btn-primary play-round" onClick={this.startGOL.bind(this)}>Start Game of Life</button>
          <button className="btn btn-primary exit" onClick={this.exit.bind(this)}>Exit GOL</button>
        </ControlPanel>
      </div>
    )
  }
}
