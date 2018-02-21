import React from 'react'
import Stone from './Stone'

import flashActions from '../../../actions/flashActions'

export default class Ugg extends React.Component {

  grunt() {
    var grunts = [
      '*Rrrrr*',
      '*hugrrg*',
      '*Hrumff*',
      '*RrrGgh!*',
      '*Agrooo?*',
      '*Rogen?*',
      '*oork*'
    ]

    flashActions.flash(grunts[Math.floor(Math.random() * grunts.length)])
  }

  render() {
    return(
        <div className="ugg row p-0 position-relative animated" onClick={this.grunt.bind(this)}>
          <div className="col-6 pt-2">
            <h4>Ugg</h4>
          </div>
          <div className="col-6 d-flex uggs-sack align-items-center">
            <p>Ugg's Sack</p>
          </div>
          <div className="overlay d-flex align-items-center justify-content-end stone-overlay">
            <div className="uggs-stone position-relative">
              <Stone />
            </div>
          </div>
        </div>
    )
  }
}
