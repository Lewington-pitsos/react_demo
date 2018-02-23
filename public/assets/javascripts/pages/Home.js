import React from 'react'

export default class Home extends React.Component {
  render() {
    return(
      <div id="home-page">
        <h1>HomePage</h1>
        <div className="container home">
          <div className="row justify-content-center">
            <div className="col-lg-6 col-md-8 text-center animated fadeIn">
              <h3>Hey Ho</h3>
              <p>So because every employer and his dog seems to want you to know React.js inside-out these days I thought I'd try to make a middlingly difficult react app as a kind of learning exercise. I ended up using FLUX for the backend. Basically what we've got here are two basic user interfaces. Firstly a dynamic array of flippable cells which can be rigged up to play  J. H. Conway's <a href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life" target="_blank"> Game of Life</a> (should one be so inclined). That was a lot more straightforward. And secondly a simple *rubs blearily at sleep-deprived eyes* Register Machine interface. It's probably realistically about as useful as an umbrella in a hurricane, but I felt like I needed to do something with all that logic I studied at University so here we are. If you want to ask me something you can email me at lewington@student.unimelb.edu.au. The code itself is sitting right <a
              href="https://github.com/Lewington-pitsos/react_demo" target="_blank">here</a>. Happy hunting.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
