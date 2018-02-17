import React from 'react'

import CommandInfo from './CommandInfo'
import CommandEdit from './CommandEdit'

export default class Command extends React.Component {
  constructor() {
    super()
    this.state = {display: 'info'}
  }

  editMode() {
    this.setState({display: 'edit'})
  }

  render() {
    // renders out a command in either display or edit mode depending on state

    const command = this.props.command

    const display = this.state.display == 'info' ?
      <CommandInfo command={command} /> :
      <CommandEdit command={command} />

    // generates a class list depending on whether the command is nwely added
    const classList = command.justAdded ? 'command animated fadeInUp' : 'command'

    return(
      <div className={classList} id={'command-' + command.id} onClick={this.editMode.bind(this)}>
        {display}
      </div>
    )
  }
}
