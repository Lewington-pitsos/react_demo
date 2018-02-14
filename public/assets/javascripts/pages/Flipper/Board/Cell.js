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

  componentDidMount() {
    // this method is auto-called after each render
    // the transform-origin of each cell's flipper is offset along the y access to the vale of half it's height. This way the cell will appear to pivot over a central axis
    var $cell = $(`#cell-${this.props.id}`)
    var $flipPanel = $cell.find('.flipper')
    $flipPanel.css({
      'transform-origin': '100% ' + $cell.height() / 2 + 'px'
    })
  }

  render() {
    // renders a (vertically) flippable cell using David Walsh's css flip https://davidwalsh.name/css-flip
    var dimensions = {
      height: this.props.size + 'px',
      width: this.props.size + 'px'
    }

    return(
      <div style={dimensions} className="vertical flip-container" id={'cell-' + this.props.id} >
        <div className='flipper'>
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
