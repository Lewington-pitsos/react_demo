/*

A panel component that houses a bunch of buttons that fire off various events to cellActions when clicked.
Has direcet access to the BoardStore so it can tell whather the GOL is playing and disable/display buttons accordingly

*/

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

  toggleGOL() {
    cellActions.toggleGOL()
  }

  render() {

    const GOLPlayMessage = this.state.playing ?
      'Stop' :
      'Start'

    return(
      <ControlPanel classes="GOL animated" fadeIn="fadeInUp" fadeOut="fadeOutDown" GOLActive={this.props.GOLActive}>
        <button className="btn btn-primary cascade-flip" onClick={this.cascadeFlip.bind(this)} disabled={this.state.playing}>Invert</button>
        <button className="btn btn-primary play-round" onClick={this.playRound.bind(this)} disabled={this.state.playing}>Play Single Round</button>
        <button className="btn btn-primary play-round" onClick={this.toggleGOL.bind(this)}>{GOLPlayMessage} Game of life</button>
        <button className="btn btn-primary exit" onClick={this.exit.bind(this)}>Exit GOL</button>
      </ControlPanel>
    )
  }
}
