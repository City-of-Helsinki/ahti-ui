import React from 'react';
import { shallow } from 'enzyme';

import ContentSlider from '../ContentSlider';

describe('ContentSlider', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<ContentSlider items={[]} />);
    expect(wrapper.html()).toMatchSnapshot();
  });
});
