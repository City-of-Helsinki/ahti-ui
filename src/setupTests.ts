import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { initialize } from './i18n/i18n';

initialize();
configure({ adapter: new Adapter() });

jest.mock('react', () => {
  const React = jest.requireActual('react');
  React.Suspense = ({ children }: { children: React.ReactChildren }) =>
    children;
  return React;
});

// Polyfill for react-slick
window.matchMedia =
  window.matchMedia ||
  function() {
    return {
      matches: false,
      addListener: function() {},
      removeListener: function() {},
    };
  };
