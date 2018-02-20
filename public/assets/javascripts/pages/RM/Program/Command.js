import React from 'react'

import CommandInfo from './CommandInfo'
import CommandEdit from './CommandEdit'
import rmActions from '../../../actions/rmActions'

export default class Command extends React.Component {
  constructor() {
    super()
    this.state = {editMode: true}
  }

  switchEditor() {
    rmActions.switchEditor(this.props.command.id)
  }

  noEditor() {
    rmActions.switchEditor(0)
  }

  render() {
    // renders out a command in either display or edit mode depending on state

    const command = this.props.command

    console.log(command);

    var display = <CommandInfo command={command} />

    var classList = 'command '

    if (command.justAdded) {
      classList += 'animated fadeInUp '
    }

    if (this.props.editMode) {
      classList += ' command-edit '
      display =  <CommandEdit command={command} cancelEdit={this.noEditor.bind(this)}/>
    }

    return(
      <div className={classList} id={'command-' + command.id} onClick={this.switchEditor.bind(this)}>
        <div className="row p-0">
          <div className="col-1 p-0 d-flex justify-content-center">
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
