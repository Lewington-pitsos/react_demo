import React from 'react'
import { Link } from 'react-router-dom'
import Flash from './Layout/Flash'

export default class Layout extends React.Component {
  render() {
    return(
      <div id="main-content-wrapper" className="position-relative">
        <Flash />
        <nav className="container-fluid">
          <ul className="d-flex justify-content-end">
            <li>
              <Link to="/register_machines">Register Machine</Link>
            </li>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/flipper">Flippers</Link>
            </li>
          </ul>
        </nav>

        <div className="container-fluid content p-0">
          {this.props.children}
        </div>
        <div id="background" className="overlay behind">
        </div>
      </div>

    )
  }
}
