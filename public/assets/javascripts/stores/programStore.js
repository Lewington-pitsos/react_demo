import {EventEmitter} from 'events'; // 'events is like, part of nodejs'

import Command from './ProgramStore/Command'
import Increment from './ProgramStore/Increment'
import Decrement from './ProgramStore/Decrement'
import dispatcher from '../dispatcher'
 import executorStore from 'ExecutorStore'

class ProrgamStore extends EventEmitter {
  constructor() {
    super()
    this.commands = []
    this.nextId = 1
  }

  getInfo() {
    return {commands: this.commands}
  }

  handleActions(action) {
    switch(action.type) {
      case "ADD_COMMAND": {
        this.addCommand(action.commandProps)
        break
      }
    }
  }

  addCommand(props) {
    if (props.increment) {
      this.commands.push(new Increment(
        props.nextCommand,
        props.bucket,
        this.getNextId)
      ))
    } else {
      this.commands.push(new Decrement(
        props.nextCommand,
        props.bucket,
        this.getNextId,
        props.alternateNextCommand,
        executorStore.getBucket(props.bucket)
      ))
    }

    this.emit('change')
  }

  getNextId() {
    var id = this.nextId

    this.getNextId += 1

    return id
  }
}

const executorStore = new ExecutorStore;

dispatcher.register(executorStore.handleActions.bind(executorStore))
export default executorStore;
