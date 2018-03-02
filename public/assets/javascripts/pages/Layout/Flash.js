/*

This component just renders a very high z-index bar at the page top which displays a message.

The message is determined through direct access to the flashStore.

The page-top bar is also set to fade itself in and out depending on the state of flashStore.

*/

import React from 'react'
import flashStore from '../../stores/FlashStore'

export default class Layout extends React.Component {
  constructor() {
    super()
    this.state = flashStore.getInfo()
  }

  componentWillMount() {
    flashStore.on('change', () => {
      this.setState( flashStore.getInfo() )
    })
  }

  componentDidMount() {
    // only when the whole flash component is mounted for the first time, we make it hidden. Afterwards we rely on animations
    $('#flash').addClass('hidden')
  }

  render() {

    var animation = this.state.recede ?
      'fadeOutUp' :
      'fadeInDown'

    return(
      <div id="flash" className={'animated text-center ' + animation}>
        <h5>{this.state.message}</h5>
      </div>
    )
  }
}
