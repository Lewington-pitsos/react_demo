import React from 'react'

import programStore from '../../stores/ProgramStore'
import Command from './Program/Command'

export default class Program extends React.Component {
  constructor() {
    super()
    this.state = programStore.getInfo()
  }

  componentWillMount() { // triggered on each innitial render of this component
    programStore.on('change', () => {
      this.setState( programStore.getInfo() )
    })
  }

  renderCommands() {
    return this
      .state
      .commands
      .map(command => <Command
        key={command.id}
        command={command}
        editMode={this.state.editingCommand == command.id} />)
  }

  render() {

    var commands = this.renderCommands()

    return(
      <div className="col-md-4 commands">
        <div className="command-list">
          {commands}
          <div id="command-execution-tracker" className="hidden">
          </div>
        </div>
      </div>
    )
  }
}
