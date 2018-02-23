import React from 'react'

import rmActions from '../../actions/rmActions'

export default class Tutorial extends React.Component {

  exit() {
    rmActions.exitTutorial()
  }

  render() {
    return(
      <div className={'tutorial container-fluid animated ' + this.props.fade}>
        <div className="row justify-content-center">
          <div className="col-md-10 tutorial-content pb-3">
            <h1 className="text-center pt-4"><a href="https://en.wikipedia.org/wiki/Register_machine">Register Machine</a> simulator</h1>

            <p className="text-center font-italic pb-3">tldr: It's a lot like a <a href="https://en.wikipedia.org/wiki/Turing_machine">Turing Machine</a>, but more intuitive.</p>

            <div className="text-justify">
              <h4>The Rules:</h4>
              <ol>
                <li>You have infinite buckets with infinite volume and infinite stones to put in them.</li>
                <li>You have a caveman named Ugg who is very strong and will do whatever you tell him to.</li>
                <li>Ugg is also very stupid. He only understands commands of two different formats:
                  <ol>
                    <li>Put a rock in a given bucket and move on to some other command.</li>
                    <li>Take a rock out of a bucket and move on to some other command OR, if the bucket was empty, move on to a different command from the first one.</li>
                  </ol>
                </li>
                <li>
                  And he's deaf, so you have to write down all the commands on a sheet and number them before sending them off (we might call this sheet a 'program').
                </li>
              </ol>

              <p>
                The point of all of this is that this system is Turing complete, which is to say that for every computable function that exists, you can write a program for Ugg that will cause him to compute that function. There are a bunch of ways you could define inputs and outputs for this system, but here we just use the basic setup of considering the initial number of rocks in each bucket as a separate argument passed in or inputted to the program, and the number of rocks in the first bucket when the program terminates as it's output.
              </p>

              <p>
                For example, I've already rigged up a program that gets Ugg to calculate simple two-integer addition. If you're still a bit fuzzy go ahead and give it a whirl, hopefully it should clear things up slightly.
              </p>

              <p>
                Otherwise, go ahead and knock yourself out.
              </p>

            </div>

            <button className="btn btn-primary" onClick={this.exit.bind(this)}>OK, got it</button>
          </div>
        </div>
      </div>
    )
  }
}
