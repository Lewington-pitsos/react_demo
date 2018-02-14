import React from 'react'

import Board from './Flipper/Board'

export default class Flipper extends React.Component {
  render() {
    return(
      <div>
        <h1>Flipper Page</h1>
        <Board cellNumber={4}/>
      </div>
    )
  }
}
