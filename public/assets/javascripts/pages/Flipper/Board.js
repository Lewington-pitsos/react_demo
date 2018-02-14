import React from 'react'
import PropTypes from 'prop-types';

import Cell from './Board/Cell'
import boardStore from '../../stores/BoardStore'

export default class Board extends React.Component {
  constructor() {
    super()
    this.state = boardStore.cellSpecs()
  }

  componentWillMount() { // triggered just before a render occurs apparently
    boardStore.on('change', () => {
      console.log('component picked up state change');
      this.setState( boardStore.cellSpecs() )
    })
  }

  render() {
    // creates a number of cell componeents and then renders them within a flexbox
    const cells = this
      .state
      .cells
      .map((id) => <Cell id={id} key={id} size={this.state.cellSize} />)

    return(
      <div className="d-flex justify-content-center p-0 board flex-wrap">
       {cells}
      </div>
    )
  }
}
