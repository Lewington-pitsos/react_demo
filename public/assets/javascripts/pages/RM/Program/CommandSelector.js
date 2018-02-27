/*

VERY similar to the BukcetSelector, except it;s <option>'s are based on the presently existing commands rather than buckets.

Has direct access to the prorgam store.

Has no access to rmActions, it's onChange method is passed in via props. At the moment CommandSelector's only appear inside CommandEdit components, to the onChange method ends up editing the state of the parent CommandEdit component

Unlike buckets, commands have set ids independent of their index, so the CommandSelector needs access to a full list of all commands to be able to render out the options properly.

*/

import React from 'react'

import programStore from '../../../stores/ProgramStore'

export default class CommandSelector extends React.Component {
  constructor() {
    super()
    this.state = programStore.getInfo()

    this.generateOptions.bind(this)
  }

  componentWillMount() {
    programStore.on('change', () => {
      this.setState( programStore.getInfo() )
    })
  }

  generateOptions() {
    // generates command options (assigning ids to the values) and pushes them to an array
    // we're not bothered that some commands might be missing if they get deleted. on execution the Id's will get reset

    var options = this
      .state
      .commands
      .map((command) =>
        <option value={command.id} key={command.id} >
          Command {command.id}
        </option>
      )

    options.push(
      <option value={0} key={0} >
        End Execution
      </option>
    )

    return options
  }

  render() {
    // renders a selector with one option correspoinding to each bucket

    return(
      <select name="command-id" defaultValue={this.props.current} onChange={this.props.update} className="custom-select">
        {this.generateOptions()}
      </select>
    )
  }
}
