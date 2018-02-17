import React from 'react'

import programStore from '../../../stores/ProgramStore'

export default class CommandSelector extends React.Component {
  constructor() {
    super()
    this.state = programStore.getInfo()

    this.generateOptions.bind(this)
  }

  componentWillMount() {
    programStore.on('change', () => {
      this.setState( programStore.getInfo() )
    })
  }

  generateOptions() {
    // generates command options (assigning ids to the values) and pushes them to an array
    // we're not bothered that some commands might be missing if they get deleted. on execution the Id's will get reset
    return this
      .state
      .commands
      .map((command) =>
        <option value={command.id} key={command.id} >
          Command {command.id + 1}
        </option>
      )
  }

  render() {
    // renders a selector with one option correspoinding to each bucket

    return(
      <select name="command-id" defaultValue={this.props.current}>
        {this.generateOptions()}
      </select>
    )
  }
}
