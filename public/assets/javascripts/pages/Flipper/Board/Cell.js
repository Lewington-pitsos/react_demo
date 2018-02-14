import React from 'react';
import PropTypes from 'prop-types';

export default class Cell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {frontTextIndex: 0, backTextIndex: -1}

    // This binding is necessary to make `this` work in the callback
    this.flip = this.flip.bind(this)
  }

  flip() {
    // triggers a flip animation by adding or removing the .hover class
    var $flippingCell = $(`#cell-${this.props.id}`)
    $flippingCell.toggleClass('hover');
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
          <div className='cell front' onClick={this.flip.bind(this)}>
            FUCK
          </div>
          <div className='cell back' onClick={this.flip.bind(this)}>
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
