import React from 'react'

export default class CommandInfo extends React.Component {
  renderCommandId(id) {
    // returns a formatted string depending on the passed in id for nicer command displaying
    if (id) {
      return 'to go ' + id
    } else {
      return 'End Execution'
    }
  }

  render() {
    // renders out the substantive info of a command

    const command = this.props.command

    // works out if the command is increment or decrement and displays renders a display accordingly
    if (command.constructor.name == "Decrement") {
      var nextCommand = <span> {this.renderCommandId(command.nextCommand)}. <br/> Otherwise {this.renderCommandId(command.alternateNext)}</span>
    } else {
      var nextCommand = this.renderCommandId(command.nextCommand)
    }

    return(
      <p>{command.constructor.name} bucket {command.bucketId + 1} and {nextCommand}.</p>
    )
  }
}
