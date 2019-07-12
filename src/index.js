import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import i18n from './i18n';
import App from './App';
import 'normalize.css'; // Note this
import 'semantic-ui-css/semantic.min.css';
import './index.css';

ReactDOM.render(
  <Suspense fallback="loading">
    <App />
  </Suspense>,
  document.getElementById('root')
);
