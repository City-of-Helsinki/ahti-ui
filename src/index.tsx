import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';
import App from './domain/App/App';
import * as serviceWorker from './serviceWorker';
import { initialize } from './common/translation/i18n/i18n';

initialize();

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
