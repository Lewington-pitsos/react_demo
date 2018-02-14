import React from 'react'

import Cell from './Flipper/Cell'

export default class Flipper extends React.Component {
  render() {
    return(
      <div>
        <h1>Flipper Page</h1>
        <Cell id={1} />
      </div>
    )
  }
}
