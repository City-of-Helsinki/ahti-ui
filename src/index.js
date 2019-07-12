import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'normalize.css'; // Note this
import 'semantic-ui-css/semantic.min.css';
import './index.css';

import i18n from './i18n'; // this needs to be here for i18n to work

ReactDOM.render(
  <Suspense fallback="loading">
    <App />
  </Suspense>,
  document.getElementById('root')
);
