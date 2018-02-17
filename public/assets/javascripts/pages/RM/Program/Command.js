import React from 'react'
import PropTypes from 'prop-types';

export default class Command extends React.Component {
  render() {
    // renders a number of stones according to props

    var nextCommand = this.props.alternateNext ? this.props.nextCommand + ', otherwise go to ' + this.props.alternateNext : this.props.nextCommand

    return(
      <div className="command" id={'command-' + this.props.id}>
        <span className="id">{this.props.id}</span>
        <p>{this.props.type} Bucket {this.props.bucketNumber} and go to  {nextCommand};</p>
      </div>
    )
  }
}

Command.propTypes = {
  id: PropTypes.number.isRequired,
  nextCommand: PropTypes.number.isRequired,
  bucketNumber: PropTypes.number.isRequired
  // also posible alternateNext
}
