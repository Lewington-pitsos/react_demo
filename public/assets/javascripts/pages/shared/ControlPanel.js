import React from 'react'
import PropTypes from 'prop-types';

export default class ControlPanel extends React.Component {
  render() {
    const fade = this.props.GOLActive ? this.props.fadeIn : this.props.fadeOut

    const classes = this.props.classes + ' '
                    + this.props.side + ' '
                    + fade
    return(
      <div className={'container-fluid interface ' + classes }>
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
