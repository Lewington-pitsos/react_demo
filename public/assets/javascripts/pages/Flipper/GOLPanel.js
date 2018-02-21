import React from 'react'
import PropTypes from 'prop-types';

import cellActions from '../../actions/cellActions'
import boardStore from '../../stores/BoardStore'
import ControlPanel from '../shared/ControlPanel'

export default class Board extends React.Component {
  constructor() {
    super()
    this.state = boardStore.isPlaying()
  }

  componentWillMount() { // triggered just before the innitial render of the whole component
    boardStore.on('change', () => {
      this.setState( boardStore.isPlaying() )
    })
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

    const GOLPlayMessage = this.state.playing ?
      'Stop Game of life' :
      'Start Game of life'

    return(
      <ControlPanel classes="GOL animated" fadeIn="fadeInUp" fadeOut="fadeOutDown" GOLActive={this.props.GOLActive}>
        <button className="btn btn-primary cascade-flip" onClick={this.cascadeFlip.bind(this)}>Full flip</button>
        <button className="btn btn-primary play-round" onClick={this.playRound.bind(this)}>Play Single Round</button>
        <button className="btn btn-primary play-round" onClick={this.startGOL.bind(this)}>{GOLPlayMessage}</button>
        <button className="btn btn-primary exit" onClick={this.exit.bind(this)}>Exit GOL</button>
      </ControlPanel>
    )
  }
}
