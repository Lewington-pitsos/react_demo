import React from 'react'
import { Link } from 'react-router-dom'

export default class Layout extends React.Component {
  render() {
    return(
      <div id="background">
        <nav className="container-fluid">
          <ul className="d-flex justify-content-end">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/flipper">Flippers</Link>
            </li>
          </ul>
        </nav>

        <div className="container-fluid content">
          {this.props.children}
        </div>
      </div>

    )
  }
}
