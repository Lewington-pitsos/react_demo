/*

This component

*/
import React from 'react'

import Buckets from './Buckets'
import Program from './Program'
import EditPanel from './RegisterMachine/EditPanel'

export default class RegisterMachine extends React.Component {

  render() {

    return(
      <div id="RMs-page">
        <div className="row justify-content-around register-machine m-0">
          <Program />
          <Buckets />
          <div className="overlay hidden" id="RM-overlay">
          </div>
        </div>
        <EditPanel />
      </div>
    )
  }
}
