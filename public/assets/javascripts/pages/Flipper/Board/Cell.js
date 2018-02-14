import React from 'react';
import PropTypes from 'prop-types';

import cellActions from '../../../actions/cellActions'

export default class Cell extends React.Component {
  constructor(props) {
    super(props);

    // This binding is necessary to make `this` work in the callback
    this.flipCell = this.flipCell.bind(this)
  }

  flipCell() {
    $('#cell-' + this.props.id).toggleClass('backside');
    cellActions.flipCell(this.props.id)
  }

  render() {
    // renders a (vertically) flippable cell using David Walsh's css flip https://davidwalsh.name/css-flip

    // cell dimensions and size reflect what's going on in the store
    var dimensions = {
      height: this.props.size + 'px',
      width: this.props.size + 'px'
    }

    var originTransform = {
      transformOrigin: '100% ' + this.props.size / 2 + 'px'
    }

    return(
      <div style={dimensions} className="vertical flip-container" id={'cell-' + this.props.id} >
        <div className='flipper' style={originTransform}>
          <div className='cell front' onClick={this.flipCell.bind(this)}>
            FUCK
          </div>
          <div className='cell back' onClick={this.flipCell.bind(this)}>
            AIDS
          </div>
        </div>
      </div>
    );
  }
}

Cell.propTypes = {
  id: PropTypes.number.isRequired,
  size: PropTypes.number.isRequired
}

Cell.defaultProps = {
  // sets default prop values
  size: 600,
}
