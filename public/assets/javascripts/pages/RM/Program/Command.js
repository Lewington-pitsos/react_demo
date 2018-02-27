/*

This component displays a single command, either in Info (normal) or Edit mode.

All command specs are passed in via props. There are 3 kinds of specs passed in:
  - the command specs (bucket, successor, command, type)
  - Whether the command was just added (for the purpose of fading in)
  - Whether the command is being edited

All of these effect how the command is displayed and so must be worked out before rendering.

Additionally this component has direct access to rmActions, and through this it can trigger updates of the ProgramStore that effect which command is being edited.

*/

import React from 'react'

import CommandInfo from './CommandInfo'
import CommandEdit from './CommandEdit'
import rmActions from '../../../actions/rmActions'

export default class Command extends React.Component {
  switchEditor() {
    rmActions.switchEditor(this.props.command.id)
  }

  noEditor() {
    rmActions.switchEditor(0)
  }

  // ====== Render Helpers ====== 

  renderMode(command) {
    // renders the info or edit component depending on whether this command is being edited
    if (this.props.editMode) {
      return <CommandEdit command={command} cancelEdit={this.noEditor.bind(this)}/>
    } else {
      return <CommandInfo command={command} />
    }
  }

  getClassList(command) {
    // returns the command's class list, depending on whether the command is newly added and/or being edited
    var classList = 'command '

    if (command.justAdded) {
      classList += 'animated fadeInUp '
    }

    if (this.props.editMode) {
      classList += 'command-edit '
    }

    return classList
  }

  render() {
    // renders out a command in either display or edit mode depending on props

    const command = this.props.command
    const classList = this.getClassList(command)
    const display = this.renderMode(command)

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
