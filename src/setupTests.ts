// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import './common/translation/i18n/i18n';
// require('matchmedia-polyfill');
// const require('matchmedia-polyfill/matchMedia.addListener');

// initialize();

// import { initialize } from './common/translation/i18n/i18n';

// Likely want to requier both polyfills..

configure({ adapter: new Adapter() });
