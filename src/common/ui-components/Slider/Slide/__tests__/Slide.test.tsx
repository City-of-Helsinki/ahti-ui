import React from 'react';
import { shallow } from 'enzyme';

import Slide from '../Slide';

describe('Slide', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<Slide imageUrl={''} />);
    expect(wrapper.html()).toMatchSnapshot();
  });
});
