/*

This component renders a panel for interacting with the register machine interface. It consists of two sub-panels: One for editing the register machine state, and one (ExecutionPanel) for exeuting the command list and displaying machine inputs.

EditPanel tracks the contents of the executionStore, and uses these to disable execution-inappropriate panel buttons during execitution.

It also has direct access to rmActions and can trigger a wide variety of actions.

*/

import React from 'react'

import Panel from '../../shared/Panel'
import rmActions from '../../../actions/rmActions'
import programStore from '../../../stores/ProgramStore'
import ExecutePanel from './EditPanel/ExecutePanel'

export default class EditPanel extends React.Component {
  constructor() {
    super()
    this.state = programStore.executionInfo()
  }

  componentWillMount() { // triggered just before a render occurs apparently
    programStore.on('change', () => {
      this.setState( programStore.executionInfo() )
    })
  }

  clearCommands() {
    if (window.confirm('Are you sure you want to clear all commands?')) {
      rmActions.clearCommands()
    }
  }

  addBucket() {
    rmActions.addBucket()
  }

  removeBucket() {
    rmActions.removeBucket()
  }

  addIncrement() {
    rmActions.addIncrement()
  }

  enterTutorial() {
    rmActions.enterTutorial()
  }

  render() {
    return(
      <Panel classes="animated row rm-panel" fadeIn="fadeInUp" fadeOut="fadeOutDown" GOLActive={true}>
          <div className="col-md-8 p-0 edit d-flex state-panel flex-wrap position-relative">
            <button className="btn btn-primary" onClick={this.addBucket.bind(this)} disabled={this.state.executing} >Add Bucket</button>
            <button className="btn btn-primary" onClick={this.removeBucket.bind(this)} disabled={this.state.executing} >Remove Bucket</button>
            <button className="btn btn-primary" onClick={this.addIncrement.bind(this)} disabled={this.state.executing} >Add Command</button>
            <button className="btn btn-primary" onClick={this.clearCommands.bind(this)} disabled={this.state.executing} >Clear Commands</button>
            <button className="btn btn-primary" onClick={this.enterTutorial.bind(this)} disabled={this.state.executing} >Tutorial</button>
          </div>
          <div className="col-md-4 p-0 execute">
            <ExecutePanel />
          </div>
      </Panel>
    )
  }
}
