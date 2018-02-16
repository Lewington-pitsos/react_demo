import React from 'react'

import Executor from './RMs/Executor'
import Program from './RMs/Program'
import ControlPanel from './shared/ControlPanel'

export default class RMs extends React.Component {
  render() {
    return(
      <div id="RMs-page">
        <h1>Register Machines</h1>
        <div className="row">
          <Program />
          <Executor />
        </div>
        <ControlPanel classes="animated" fadeIn="fadeInUp" fadeOut="fadeOutDown" GOLActive={true}>
          <button className="btn btn-primary fix-board" >Game of Life</button>
        </ControlPanel>
      </div>
    )
  }
}
