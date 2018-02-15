import React from 'react'

export default class Distractor extends React.Component {
  render() {
    return(
      <div className="distractor">
        {this.props.text}
      </div>
    )
  }
}
