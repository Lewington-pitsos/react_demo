import React from 'react'
import PropTypes from 'prop-types';

export default class Command extends React.Component {
  render() {
    // renders a number of stones according to props

    const command = this.props.command

    const classList = command.justAdded ? 'command animated fadeInUp' : 'command'

    var nextCommand = command.alternateNext ? command.nextCommand + ', otherwise go to ' + command.alternateNext : command.nextCommand

    return(
      <div className={classList} id={'command-' + command.id}>
        <p><span className="command-id">{command.id}.</span>{command.type} bucket {command.bucketId} and go to  {nextCommand}</p>
      </div>
    )
  }
}

Command.propTypes = {
  id: PropTypes.number.isRequired,
  nextCommand: PropTypes.number.isRequired,
  bucketId: PropTypes.number.isRequired
}

Command.defaultProps = {
  alternateNext: false
}
