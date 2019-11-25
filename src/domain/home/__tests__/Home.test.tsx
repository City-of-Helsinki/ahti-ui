import React from 'react';
import Home from '../Home';
import Footer from '../../footer/Footer';
import { shallow } from 'enzyme';

describe('Home', () => {
  const wrapper = shallow(<Home />);

  it('has a footer', () => {
    expect(wrapper.find(Footer)).toHaveLength(1);
  });
});
