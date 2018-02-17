import React from 'react'
import BucketSelector from '../BucketSelector'
import CommandSelector from './CommandSelector'

export default class CommandEdit extends React.Component {
  render() {
    // renders a number of stones according to props

    const command = this.props.command

    return(
      <div className="command-edit">
        <select name="type" defaultValue={command.constructor.name}>
          <option value="Increment">Increment</option>
          <option value="Decrement">Decrement</option>
        </select>
        <BucketSelector current={command.bucketId}/>
        <CommandSelector current={command.nextId} />
      </div>
    )
  }
}
