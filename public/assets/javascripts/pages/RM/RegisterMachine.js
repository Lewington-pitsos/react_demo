/*

This component renders the whole non-tutorial register machine interface. This boils down to:
  - The Program (list of commands)
  - The list of buckets
  - The EditPanel (for editing the interface and executing the program)

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
