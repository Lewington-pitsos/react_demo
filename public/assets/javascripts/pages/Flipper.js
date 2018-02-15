import React from 'react'

import Board from './Flipper/Board'
import ControlPanel from './Flipper/ControlPanel'
import cellActions from '../actions/cellActions'
import flipperStore from '../stores/FlipperStore'


export default class Flipper extends React.Component {
  constructor() {
    super()
    this.state = flipperStore.getInfo()
  }

  componentWillMount() { // triggered just before a render occurs apparently
    flipperStore.on('change', () => {
      console.log('picked up at flipper');
      this.setState( flipperStore.getInfo() )
      if (this.state.GOLState) {
      }
    })
  }

  addCell() {
    cellActions.addCell()
  }

  randFlipping() {
    cellActions.randFlipping()
  }

  fixBoard() {
    // the current width of the baord is recorded so that we can fix the grid cells the same way that they are displayed
    var $golElements = $('.hidden')
    $golElements.removeClass('hidden')
    $golElements.addClass('animated')
    cellActions.fixBoard($('#board').width())
  }

  cascadeFlip() {
    cellActions.cascadeFlip()
  }

  playRound() {
    cellActions.playRound()
  }

  componentDidMount() {

  }

  render() {

    return(
      <div>
        <ControlPanel classes="hidden fadeInDown" side="top">
          <h2>Game of Life Simulator</h2>
        </ControlPanel>
        <h1>Flipper Page</h1>
        <div className="d-flex align-items-center flex-column GOL_wrapper">
          <Board />
        </div>
        <ControlPanel>
          <button className="btn btn-primary" onClick={this.addCell.bind(this)}>Go ahead, add a cell</button>
          <button className="btn btn-primary rand-flipping" onClick={this.randFlipping.bind(this)}>Start Flipping</button>
          <button className="btn btn-primary fix-board" onClick={this.fixBoard.bind(this)}>Fix Board Dimensions</button>
        </ControlPanel>
        <ControlPanel classes="hidden fadeInUp">
          <button className="btn btn-primary cascade-flip" onClick={this.cascadeFlip.bind(this)}>Cascade Flip</button>
          <button className="btn btn-primary play-round" onClick={this.playRound.bind(this)}>Play Round</button>
        </ControlPanel>
      </div>
    )
  }
}
