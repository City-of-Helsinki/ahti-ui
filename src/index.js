import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ReactGA from 'react-ga';
import * as i18n from './i18n';
import './globalStyles/index.scss';

// Initialize Internationalization globals
i18n.initialize();

// Initialize analytics
ReactGA.initialize(process.env.REACT_APP_ANALYTICS_ID, {
  debug: process.env.REACT_APP_DEBUG_ANALYTICS === 'true',
  // Let ReactGA know that we initialised the analytics with
  // the default script in <head>. This allows us to send
  // the initial pageView earlier, before downloading this
  // whole script.
  standardImplementation: true,
});

// Finally, render the app
ReactDOM.render(<App />, document.getElementById('root'));
