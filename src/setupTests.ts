// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { initialize } from './common/translation/i18n/i18n';

// Likely want to requier both polyfills..
require('matchmedia-polyfill');
// const require('matchmedia-polyfill/matchMedia.addListener');

initialize();
configure({ adapter: new Adapter() });

// window.matchMedia = matchMedia;
// Polyfill for react-slick from here: https://github.com/akiran/react-slick/issues/742
// window.matchMedia =
//   window.matchMedia ||
//   function() {
//     return {
//       matches: false,
//       addListener: function() {},
//       addEventListener: function() {},
//       media: function() {},
//       onchange: function() {},
//       removeEventListener: function() {},
//       removeListener: function() {},
//       dispatchEvent: function() {}
//     };
//   };
