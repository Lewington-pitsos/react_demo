/*

a vertically flippable cell
relies on props to determine it's size and it's current facing
dispatches flip events through callActions on clicks

*/

import React from 'react';
import PropTypes from 'prop-types';

import cellActions from '../../../actions/cellActions'

export default class Cell extends React.Component {
  flipCell() {
    cellActions.flipCell(this.props.id)
  }

  render() {
    // renders a (vertically) flippable cell using David Walsh's css flip https://davidwalsh.name/css-flip

    // cell dimensions reflect the store
    var dimensions = {
      height: this.props.size + 'px',
      width: this.props.size + 'px'
    }

    var originTransform = {
      transformOrigin: '100% ' + this.props.size / 2 + 'px'
    }

    var side = this.props.backSide ? 'backside' : ''

    return(
      <div style={dimensions} className={'vertical flip-container ' + side } id={'cell-' + this.props.id} >
        <div className='flipper' style={originTransform}>
          <div className='cell front' onClick={this.flipCell.bind(this)}>
            DEAD
          </div>
          <div className='cell back' onClick={this.flipCell.bind(this)}>
            ALIVE
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
