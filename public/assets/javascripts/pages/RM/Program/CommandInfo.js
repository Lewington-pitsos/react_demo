import React from 'react'

export default class CommandInfo extends React.Component {
  render() {
    // renders out the substantive info of a command

    const command = this.props.command

    // works out if the command is increment or decrement
    if (command.constructor.name == "Decrement") {
      var nextCommand = command.nextCommand +
                        ', otherwise go to ' +
                        command.alternateNext
    } else {
      var nextCommand = command.nextCommand
    }

    return(
      <p>{command.constructor.name} bucket {command.bucketId + 1} and go to  {nextCommand}</p>
    )
  }
}
