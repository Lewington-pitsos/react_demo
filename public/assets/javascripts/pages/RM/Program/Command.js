import React from 'react'

import CommandInfo from './CommandInfo'

export default class Command extends React.Component {
  editCommand() {
    rmActions.editCommand()
  }

  render() {
    // renders a number of stones according to props

    const command = this.props.command

    const classList = command.justAdded ? 'command animated fadeInUp' : 'command'

    return(
      <div className={classList} id={'command-' + command.id} onClick={this.editCommand.bind(this)}>
        <CommandInfo command={command} />
      </div>
    )
  }
}
