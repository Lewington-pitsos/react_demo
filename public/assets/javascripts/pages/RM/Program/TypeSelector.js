import React from 'react'

export default class TypeSelector extends React.Component {
  render() {
    // chooses which of the two options so start as selected according to the passed in name prop and renders a type selector accordingly

    const increment =
      <select name="type">
        <option value="increment" selected>Increment</option>
        <option value="decrement">Decrement</option>
      </select>


    const decrement =
      <select name="type">
        <option value="increment">Increment</option>
        <option value="decrement" selected>Decrement</option>
      </select>

    const options = this.props.name == 'increment' ? increment : decrement

    return(options)
  }
}
