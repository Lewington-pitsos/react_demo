import React from 'react'
import BucketSelector from '../BucketSelector'
import CommandSelector from './CommandSelector'
import rmActions from '../../../actions/rmActions'

export default class CommandEdit extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      id: props.command.id,
      increment: props.command.constructor.name == "Increment",
      bucket: props.command.bucketId,
      nextCommand: props.command.nextCommand,
      alternateNext: props.command.alternateNext
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  changeType(event) {
    this.setState({increment: !this.state.increment})
  }

  changeBucket(event) {
    this.setState({bucket: parseInt(event.target.value)})
  }

  changeNext(event) {
    this.setState({nextCommand: parseInt(event.target.value)})
  }

  changeAlternateNext(event) {
    this.setState({alternateNext: parseInt(event.target.value)})
  }

  handleSubmit(event) {
    event.preventDefault()
    rmActions.updateCommand(this.state)
    this.props.submit()
  }

  render() {
    // renders a number of stones according to props

    var alternateNext = this.state.increment ?
      null :
      <CommandSelector current={this.state.alternateNext || 0} update={this.changeAlternateNext.bind(this)}/>

    return(
      <div className="command-edit">
      <form onSubmit={this.handleSubmit.bind(this)} >
          <select name="type" defaultValue={this.state.increment} onChange={this.changeType.bind(this)}>
            <option value={true}>Increment</option>
            <option value={false}>Decrement</option>
          </select>
          <BucketSelector current={this.state.bucket} update={this.changeBucket.bind(this)}/>
          <CommandSelector current={this.state.nextCommand} update={this.changeNext.bind(this)}/>
          {alternateNext}
          <input type="submit" value="submit" />
        </form>
      </div>
    )
  }
}
