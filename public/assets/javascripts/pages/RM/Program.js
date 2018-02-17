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

    console.log(this.state);

    var commands = this
      .state
      .commands
      .map(command => <Command
        key={command.id}
        id={command.id}
        type={command.constructor.name}
        bucketId={command.bucketId}
        nextCommand={command.nextCommand}
        alternateNext={command.alternateNext} />
      )

    return(
      <div className="col-md-4 commands">
        {commands}
      </div>
    )
  }
}
