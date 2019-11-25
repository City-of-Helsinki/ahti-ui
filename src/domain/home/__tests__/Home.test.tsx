import React from 'react';
import App from '../../app/App';
import Home from '../Home';
import Footer from '../../footer/Footer';
import { shallow } from 'enzyme';

describe('App', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<Home />);
    expect(wrapper.find(Footer)).toHaveLength(1);
  });
});
