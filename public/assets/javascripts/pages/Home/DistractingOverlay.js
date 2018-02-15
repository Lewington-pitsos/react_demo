import React from 'react'
import Distractor from './Distractor'


export default class DistractingOverlay extends React.Component {
  render() {
    return(
      <div id="distracting-overlay">
        <Distractor text="please hire me" />
      </div>
    )
  }
}
