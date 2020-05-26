import React from 'react';
import { shallow } from 'enzyme';

import Select from './Select';

const mockProps = {
  labelText: 'Selector',
  value: 'first',
  options: [
    { value: 1, label: 'First' },
    { value: 2, label: 'Second' },
  ],
  onChange: jest.fn(),
};

describe('Select', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  const getWrapper = (props = {}) => shallow(<Select {...mockProps} {...props} />);

  it('renders normally', () => {
    const wrapper = getWrapper();

    expect(wrapper.html()).toMatchSnapshot();
  });
});
