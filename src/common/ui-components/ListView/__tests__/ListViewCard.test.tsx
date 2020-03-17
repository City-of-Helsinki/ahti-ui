import React from 'react';
import { shallow } from 'enzyme';
import '../ListView';
import ListViewCard from '../ListViewCard';
import mockFeature from './mockFeature';

describe('ListViewCard', () => {
  // @ts-ignore
  const wrapper = shallow(<ListViewCard feature={mockFeature} />);

  it('renders the component', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});
