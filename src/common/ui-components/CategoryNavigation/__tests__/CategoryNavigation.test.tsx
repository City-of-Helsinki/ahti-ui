import React from 'react';
import { mount, shallow } from 'enzyme';

import CategoryNavigation from '../CategoryNavigation';

describe('CategoryNavigation', () => {
  const mockCategory = {
    id: 'ahti:category:island',
    name: 'Islands'
  };

  it('renders without crashing', () => {
    const wrapper = shallow(
      <CategoryNavigation categories={[mockCategory]} onClick={jest.fn} />
    );
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders slick-next when number of categories > maxDisplayedCategories"', () => {
    const wrapper = mount(
      <CategoryNavigation
        categories={Array(10).fill(mockCategory)}
        maxDisplayedCategories={5}
        onClick={jest.fn}
      />
    );
    expect(wrapper.find('.slick-next').exists()).toBeTruthy();
  });

  it("doesn't render slick-next when number of categories <= maxDisplayedCategories", () => {
    const wrapper = mount(
      <CategoryNavigation
        categories={Array(3).fill(mockCategory)}
        maxDisplayedCategories={5}
        onClick={jest.fn}
      />
    );
    expect(wrapper.find('.slick-next').exists()).toBeFalsy();
  });

  it('calls onClick with id of clicked category', () => {
    const mockOnClick = jest.fn();
    const wrapper = shallow(
      <CategoryNavigation categories={[mockCategory]} onClick={mockOnClick} />
    );
    wrapper.find('.categoryContainer').simulate('click');
    expect(mockOnClick).toBeCalledWith(mockCategory.id);
  });
});
