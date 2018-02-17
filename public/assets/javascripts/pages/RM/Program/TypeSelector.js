import React from 'react'

export default class TypeSelector extends React.Component {
  render() {
    // chooses which of the two options so start as selected according to the passed in name prop and renders a type selector accordingly

    const increment =
                    <option value="increment" selected>Decrement</option>
                    <option value="decrement">Decrement</option>

    const decrement =
            <option value="increment" >Decrement</option>
            <option value="decrement" selected>Decrement</option>

    const options = this.props.name = 'increment' ? increment : decrement

    return(
      <selector name="type">
        {options}
      </selector>

    )
  }
}
