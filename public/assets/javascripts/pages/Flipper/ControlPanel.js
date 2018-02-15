import React from 'react'
import PropTypes from 'prop-types';

export default class ControlPanel extends React.Component {
  render() {
    return(
      <div className={'container-fluid interface ' + this.props.side + ' ' + this.props.classes }>
        {this.props.children}
      </div>
    )
  }
}

ControlPanel.propTypes = {
  side: PropTypes.string.isRequired
}

ControlPanel.defaultProps = {
  // sets default prop values
  side: 'bottom',
  classes: ''
}
