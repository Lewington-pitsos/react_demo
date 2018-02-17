import React from 'react'

import programStore from '../../stores/ProgramStore'
import Command from './Program/Command'

export default class Executor extends React.Component {
  constructor() {
    super()
    this.state = programStore.getInfo()
  }

  componentWillMount() { // triggered on each innitial render of this component
    programStore.on('change', () => {
      this.setState( programStore.getInfo() )
    })
  }
  render() {


    return(
      <div className="col-md-4 commands">
        <ol>
          <li>
            <p>Program</p>
          </li>
          <li>
            <p>Program</p>
          </li>
          <li>
            <p>Program</p>
          </li>
          <li>
            <p>Program</p>
          </li>
        </ol>
      </div>
    )
  }
}
