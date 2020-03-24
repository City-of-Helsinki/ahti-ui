import React from 'react';
import { shallow } from 'enzyme';

import ListView from '../ListView';
import mockFeature from './mockFeature';

describe('ListView', () => {
  const wrapper = shallow(<ListView features={Array(10).fill(mockFeature)} />);

  it('renders the component', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});
