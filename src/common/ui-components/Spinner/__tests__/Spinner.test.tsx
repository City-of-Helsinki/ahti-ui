import React from 'react';
import { shallow } from 'enzyme';

import Spinner from '../Spinner';
import * as animation from '../animations/spinner_all.json';

describe('Spinner', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<Spinner animation={animation} />);
    expect(wrapper.html()).toMatchSnapshot();
  });
});
