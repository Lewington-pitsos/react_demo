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
  render() {
    var commands = this
      .state
      .commands
      .map(command => <Command
        key={command.id}
        command={command} />
      )

    return(
      <div className="col-md-4 commands">
        <div className="command-list">
          {commands}
        </div>
      </div>
    )
  }
}
