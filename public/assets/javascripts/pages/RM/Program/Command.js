import React from 'react'

import CommandInfo from './CommandInfo'
import CommandEdit from './CommandEdit'

export default class Command extends React.Component {
  constructor() {
    super()
    this.state = {editMode: false}
  }

  editMode() {
    this.setState({editMode: true})
  }

  infoMode() {
    this.setState({editMode: false})
  }

  render() {
    // renders out a command in either display or edit mode depending on state

    const command = this.props.command

    const display = this.state.editMode || command.justAdded ?
      <CommandEdit command={command} submit={this.infoMode.bind(this)}/> :
      <CommandInfo command={command} />


    // generates a class list depending on whether the command is nwely added
    const classList = command.justAdded ? 'command animated fadeInUp' : 'command'

    return(
      <div className={classList} id={'command-' + command.id} onClick={this.editMode.bind(this)}>
        <div className="row p-0">
          <div className="col-1 p-0">
            <span className="command-id">{command.id}.</span>
          </div>
          <div className="col-11 p-0">
            {display}
          </div>
        </div>
      </div>
    )
  }
}
