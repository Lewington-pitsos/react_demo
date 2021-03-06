/*

A component that renders a single button
When clicked it toggles random flipping through cellActions
It has access to the Cellstore so it can display correctly depending on whether randomflipping is already occuring or not

This button has a fair bit of unique functionality, I thought I'd extract it to help de-clutter it's parent

*/

import React from 'react'

import cellActions from '../../actions/cellActions'
import boardStore from '../../stores/BoardStore'

export default class Board extends React.Component {
  constructor() {
    super()
    this.state = boardStore.isFlipping()
  }

  componentWillMount() { // triggered just before the innitial render of the whole component
    boardStore.on('change', () => {
      this.setState( boardStore.isFlipping() )
    })
  }

  randFlipping() {
    cellActions.randFlipping()
  }

  render() {

    const startOrStop = this.state.flipping ?
      'Stop' :
      'Start'

    return(
      <button className="btn btn-primary rand-flipping" onClick={this.randFlipping.bind(this)}>{startOrStop} Random Flipping</button>
    )
  }
}
