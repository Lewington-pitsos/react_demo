import React from 'react'
import PropTypes from 'prop-types';

export default class Stone extends React.Component {
  render() {

    var size = {
      height: this.props.size,
      width: this.props.size
    }

    return(
      <div className="stone" style={size}>
      </div>
    )
  }
}

Stone.propTypes = {
  size: PropTypes.number.isRequired
}

Stone.defaultProps = {
  // sets default prop values
  size: 30,
}
