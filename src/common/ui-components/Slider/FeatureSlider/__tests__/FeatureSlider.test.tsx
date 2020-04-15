import React from 'react';
import { shallow } from 'enzyme';

import FeatureSlider from '../FeatureSlider';

describe('FeatureSlider', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<FeatureSlider features={[]} />);
    expect(wrapper.html()).toMatchSnapshot();
  });
});
