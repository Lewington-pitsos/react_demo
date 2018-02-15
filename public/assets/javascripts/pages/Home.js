import React from 'react'

import DistractingOverlay from './Home/DistractingOverlay'

export default class Home extends React.Component {
  render() {
    return(
      <div id="home-page">
        <h1>HomePage</h1>
        <div className="container home">
          <div className="row justify-content-center">
            <div className="col-md-6 text-center animated fadeIn">
              <h3>Hey Ho</h3>
              <p>The Ninja Ipsum Bot allows you to add blocks of Lorum Ipsum text of any length to your website quickly and easily. When designing a website, you often need to fill areas of the site in with dummy text to see how it will look with real content. The most common way of filling in this information is via a repeated stream of Latin text known as Lorum Ipsum. Using an online generator can be risky as they can contain hidden words or phrases, advertisements or bad language. Using a personal generator allows to be sure the text you are using is safe. The Ninja Ipsum Bot allows you to add blocks of Lorum Ipsum text of any length to your website quickly and easily. When designing a website, you often need to fill areas of the site in with dummy text to see how it will look with real content. The most common way of filling in this information is via a repeated stream of Latin text known as Lorum Ipsum. Using an online generator can be risky as they can contain hidden words or phrases, advertisements or bad language. Using a personal generator allows to be sure the text you are using is safe.</p>
            </div>
          </div>
        </div>
        <DistractingOverlay />
      </div>
    )
  }
}
