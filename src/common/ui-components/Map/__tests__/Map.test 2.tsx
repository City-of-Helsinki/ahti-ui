import React from 'react';
import mockFeatures from './mockFeatures.json';
import { shallow } from 'enzyme';
import Map from '../Map';

describe('Map', () => {
  it('renders without crashing', () => {
    // @ts-ignore
    const wrapper = shallow(<Map features={mockFeatures} onClick={jest.fn} />);
    expect(wrapper.html()).toMatchSnapshot();
  });
});
