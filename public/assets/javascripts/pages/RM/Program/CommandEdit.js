import React from 'react'
import BucketSelector from '../BucketSelector'
import CommandSelector from './CommandSelector'
import rmActions from '../../../actions/rmActions'

export default class CommandEdit extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      type: props.command.constructor.name,
      bucket: props.command.bucketId,
      next: props.command.nextId,
      alternateNext: props.command.alternateNext
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  changeType(event) {
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

  handleSubmit(event) {
    event.preventDefault()
    rmActions.updateCommand(this.state)
    this.props.submit()
  }

  render() {
    // renders a number of stones according to props

    var alternateNext = this.state.type == 'Decrement' ?
      <CommandSelector current={this.state.alternateNext} update={this.changeNext.bind(this)}/> :
      null

    return(
      <div className="command-edit">
      <form onSubmit={this.handleSubmit.bind(this)} >
          <select name="type" defaultValue={this.state.type} onChange={this.changeType.bind(this)}>
            <option value="Increment">Increment</option>
            <option value="Decrement">Decrement</option>
          </select>
          <BucketSelector current={this.state.bucket} update={this.changeBucket.bind(this)}/>
          <CommandSelector current={this.state.next} update={this.changeNext.bind(this)}/>
          {alternateNext}
          <input type="submit" value="submit" />
        </form>
      </div>
    )
  }
}
