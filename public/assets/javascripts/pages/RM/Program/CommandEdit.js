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
    console.log(this.state.type);
  }

  changeBucket(event) {
    console.log(event);
    this.setState({bucket: event.target.value})
  }

  changeNext(event) {
        console.log(event);
    this.setState({next: event.target.value})
  }

  changeAlternateNext(event) {
        console.log(event);
    this.setState({alternateNext: event.target.value})
  }

  render() {
    // renders a number of stones according to props

    var alternateNext = this.state.type == 'Decrement' ?
      <CommandSelector current={this.state.alternateNext} update={this.changeNext.bind(this)}/> :
      null

    return(
      <div className="command-edit">
        <select name="type" defaultValue={this.state.type} onChange={this.changeType.bind(this)}>
          <option value="Increment">Increment</option>
          <option value="Decrement">Decrement</option>
        </select>
        <BucketSelector current={this.state.bucket} update={this.changeBucket.bind(this)}/>
        <CommandSelector current={this.state.next} update={this.changeNext.bind(this)}/>
        {alternateNext}
      </div>
    )
  }
}
