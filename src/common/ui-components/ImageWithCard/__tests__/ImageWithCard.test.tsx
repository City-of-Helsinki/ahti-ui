import React from 'react';
import { shallow } from 'enzyme';

import ImageWithCard from '../ImageWithCard';

describe('ImageWithCard', () => {
  it('renders the component', () => {
    const wrapper = shallow(<ImageWithCard src="" />);
    expect(wrapper.html()).toMatchSnapshot();
  });
});
