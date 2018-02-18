import React from 'react'
import BucketSelector from '../BucketSelector'
import CommandSelector from './CommandSelector'

export default class CommandEdit extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      type: props.command.constructor.name,
      bucket: props.command.bucketId,
      next: props.command.nextId,
      alternateNext: props.command.alternateNext
    }
  }

  changeType(event) {
    console.log(event);
    this.setState({type: event.target.value})
  }

  changeBucket(event) {
    this.setState({bucket: event.target.value})
  }

  changeNext(event) {
    this.setState({next: event.target.value})
  }

  changeAlternateNext(event) {
    this.setState({alternateNext: event.target.value})
  }

  render() {
    // renders a number of stones according to props

    const command = this.props.command

    return(
      <div className="command-edit">
        <select name="type" defaultValue={command.constructor.name} onChange={this.changeType.bind(this)}>
          <option value="Increment">Increment</option>
          <option value="Decrement">Decrement</option>
        </select>
        <BucketSelector current={command.bucketId}/>
        <CommandSelector current={command.nextId} />
      </div>
    )
  }
}
