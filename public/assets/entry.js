// this is currently the only Webpack entry point so all JS that we could ever need must be requireed here

// css
import './stylesheets/main.sass';
import './stylesheets/animate.css';
import './stylesheets/flip.css';

// js
import 'bootstrap'; // yeah, this is just bootstrap js
import './javascripts/basic.js';

// this is our mojs animation file
import sizzle from './javascripts/animations/background'
