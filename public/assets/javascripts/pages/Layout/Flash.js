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

  render() {
    return(
      <div id="flash animated fadeInDown">
        <h3>{this.state.message}</h3>
      </div>
    )
  }
}
