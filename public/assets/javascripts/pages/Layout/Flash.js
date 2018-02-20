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
      <div id="flash" className={'animated text-align-center ' + animation}>
        <h5>{this.state.message}</h5>
      </div>
    )
  }
}
