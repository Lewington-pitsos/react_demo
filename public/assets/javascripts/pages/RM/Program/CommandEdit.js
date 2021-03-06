/*

This command handles thje command eding display, as well as managing a form input that the user can use to edit commands.

The form works by updating this component's state whenever there is a change to one of it's inputs, and then triggering and update to ProgramStore on submission (through direct access to rmActions).

The default values for the form's state are set through props, based on the specs of the relevent command before editing began. However it is the state values, not props that determine what actually gets displayed on the form, so as the user updates the form, it's display changes without effecting the ProgramStore.

In addition, through rmActions the editor can update the ProgramStore to record a null id for the editing command, causing editing to terminate without changes (i.e. cancel).

The form can also delete the present command through a similar process.

*/

import React from 'react'
import BucketSelector from '../BucketSelector'
import CommandSelector from './CommandSelector'
import rmActions from '../../../actions/rmActions'

export default class CommandEdit extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      id: props.command.id,
      increment: props.command.constructor.name == "Increment",
      bucket: props.command.bucketId,
      nextCommand: props.command.nextCommand,
      alternateNext: props.command.alternateNext
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  // ===== Updating State =====

  changeType(event) {
    this.setState({increment: !this.state.increment})
  }

  changeBucket(event) {
    this.setState({bucket: parseInt(event.target.value)})
  }

  changeNext(event) {
    this.setState({nextCommand: parseInt(event.target.value)})
  }

  changeAlternateNext(event) {
    this.setState({alternateNext: parseInt(event.target.value)})
  }

  // ===== Updating Store =====

  noEditor() {
    rmActions.switchEditor(0)
  }

  handleSubmit(event) {
    event.preventDefault()
    rmActions.updateCommand(this.state)
    this.noEditor()
  }

  deleteCommand(event) {
    event.preventDefault()
    if (window.confirm('Are you sure you want to delete this command?')) {
      rmActions.deleteCommand(this.state.id)
    }
  }

  render() {
    // renders a number of stones according to props

    const hideAlternativeNext = this.state.increment ?
      'hidden' :
      ''

    return(
      <form onSubmit={this.handleSubmit.bind(this)} className="animated fadeIn" >
        <div className="form-group">
          <label htmlFor="command-type">Command Type</label>
          <select name="type" className="custom-select" defaultValue={this.state.increment} onChange={this.changeType.bind(this)} id="command-type">
            <option value={true}>Increment</option>
            <option value={false}>Decrement</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="command-bucket">Bucket to interact with</label>
          <BucketSelector current={this.state.bucket} update={this.changeBucket.bind(this)} id="command-bucket"/>
        </div>

        <div className="form-group">
          <label htmlFor="default-next-command">Default next command</label>
          <CommandSelector current={this.state.nextCommand} update={this.changeNext.bind(this)} id="default-next-command"/>
        </div>

        <div className={'form-group ' + hideAlternativeNext}>
          <label htmlFor="alternate-next-command">Alternate next command</label>
          <CommandSelector current={this.state.alternateNext || 0} update={this.changeAlternateNext.bind(this)} id="alternate-next-command"/>
        </div>

        <button className="btn btn-primary cancel" onClick={this.noEditor.bind(this)} > Cancel </button>
        <button className="btn btn-primary delete" onClick={this.deleteCommand.bind(this)} > Delete </button>
        <input type="submit" className="btn btn-primary" value="Save" />
      </form>
    )
  }
}
