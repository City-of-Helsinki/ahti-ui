import React from 'react';
import { shallow } from 'enzyme';
import Breadcrumb, { BreadcrumbItem } from '../Breadcrumb';
import Pill from '../Pill';

const staticBreadcrumbItems: BreadcrumbItem[] = [
  {
    category: 'a',
    name: 'First',
    id: '1'
  },
  {
    category: 'a',
    name: 'Second',
    id: '2'
  },
  {
    category: 'a',
    name: 'Third',
    id: '3'
  }
];

describe('Breadcrumb', () => {
  it('renders the component', () => {
    const wrapper = shallow(
      <Breadcrumb items={staticBreadcrumbItems} onClose={jest.fn} />
    );
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders correct number of pills', () => {
    const wrapper = shallow(
      <Breadcrumb items={staticBreadcrumbItems} onClose={jest.fn} />
    );
    expect(wrapper.find(Pill)).toHaveLength(3);
  });
});
