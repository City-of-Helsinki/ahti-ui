import React from 'react';
import { shallow } from 'enzyme';

import TermsOfService from '../TermsOfService';

describe('TermsOfService', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<TermsOfService />);
    expect(wrapper.html()).toMatchSnapshot();
  });
});
