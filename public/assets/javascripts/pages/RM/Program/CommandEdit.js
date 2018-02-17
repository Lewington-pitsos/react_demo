import React from 'react'
import BucketSelector from '../BucketSelector'
import TypeSelector from './TypeSelector'
import CommandSelector from './CommandSelector'

export default class CommandEdit extends React.Component {
  render() {
    // renders a number of stones according to props

    const command = this.props.command

    return(
      <div className={classList} id={'command-' + command.id}>
        <TypeSelector name={command.constructor.name} />
        <BucketSelector />
        <CommandSelector />
      </div>
    )
  }
}
