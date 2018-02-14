import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import { Route } from 'react-router-dom'

import Layout from './pages/Layout.js';
import Home from './pages/Home.js';
import Flipper from './pages/Flipper.js';
import dispatcher from './dispatcher'

const main = document.getElementById('main')

ReactDOM.render(
  <BrowserRouter>
    <Layout>
      <Route exact path="/" component={Home} />
      <Route path="/flipper" component={Flipper} />
    </Layout>
  </BrowserRouter>
  , main // i.e. main is the element that everything is being inserted into
);
