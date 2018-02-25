import React from 'react'

export default class Home extends React.Component {
  render() {
    return(
      <div id="home-page" className="animated fadeIn">
        <h1 className="m-0">HomePage</h1>
        <div className="container home">
          <div className="row justify-content-center">
            <div className="col-lg-7 col-md-9 text-center home-content">
              <h3>Hey Ho</h3>
              <p>So because it's apparently all the rave these days, I thought I'd try to make a middlingly difficult <a href="https://reactjs.org/" target="_blank">react.js</a> app as a kind of learning exercise. I ended up using <a href="https://facebook.github.io/flux/docs/overview.html" target="_blank">FLUX</a> for the backend. Basically what we've got here are two basic user interfaces. Firstly a dynamic array of flippable cells which can be rigged up to play  J. H. Conway's <a href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life" target="_blank"> Game of Life</a> (should one be so inclined). That was a lot more straightforward. And secondly a simple *rubs blearily at sleep-deprived eyes* Register Machine interface. It's probably realistically about as useful as an umbrella in a hurricane, but I felt like I needed to do something with all that logic I studied at University so here we are. The fancy background stuff is rigged up using <a href="http://mojs.io/" target="_blank">mo.js</a>, which is an immensly satisfying library to work with. If you'd like to ask me something you can email me at <a href="mailto:lewington@student.unlb.edu.au"> lewington@student.unimelb.edu.au.</a> The code itself is sitting right
              <a href="https://github.com/Lewington-pitsos/react_demo" target="_blank"> here</a>. Happy hunting.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
