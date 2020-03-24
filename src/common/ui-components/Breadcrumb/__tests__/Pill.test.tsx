import React from 'react';
import { shallow } from 'enzyme';

import Pill from '../Pill';

describe('Pill', () => {
  it('renders the component', () => {
    const wrapper = shallow(
      <Pill name={'first'} category={'a'} onClose={jest.fn} />
    );
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('calls onClose', () => {
    const onCloseMock = jest.fn();
    const wrapper = shallow(
      <Pill name={'first'} category={'a'} onClose={onCloseMock} />
    );
    expect(onCloseMock).toBeCalledTimes(0);
    wrapper.find('button').first().simulate('click');
    expect(onCloseMock).toBeCalledTimes(1);
  });
});
