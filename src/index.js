import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './globalStyles/index.scss';

import i18n from './i18n'; // this needs to be here for i18n to work

ReactDOM.render(<App />, document.getElementById('root'));
