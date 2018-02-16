import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import { Route } from 'react-router-dom'

import Layout from './pages/Layout';
import Home from './pages/Home';
import Flipper from './pages/Flipper';
import dispatcher from './dispatcher'
import RMs from './pages/RMs'

const main = document.getElementById('main')

ReactDOM.render(
  <BrowserRouter>
    <Layout>
      <Route exact path="/" component={Home} />
      <Route path="/flipper" component={Flipper} />
      <Route path="/register_machines" component={RMs} />
    </Layout>
  </BrowserRouter>
  , main // i.e. main is the element that everything is being inserted into
);
