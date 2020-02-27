import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router';

import Menu, { MenuCategory } from '../Menu';
import NavDropdown from '../NavDropdown/NavDropdown';

describe('Menu', () => {
  const menuItems: MenuCategory[] = [
    {
      title: 'islands',
      category: 'ahti:category:island',
      menuItems: [{ id: '', name: 'all_islands', url: '/map?type=myhelsinki' }]
    },
    {
      title: 'restaurants',
      category: 'ahti:category:island',
      menuItems: [
        { id: '', name: 'restaurants', url: '/', disabled: true },
        { id: '', name: 'cafes', url: '/', disabled: true },
        { id: '', name: 'beer_and_wine_bars', url: '/', disabled: true }
      ]
    }
  ];
  const wrapper = mount(
    <MemoryRouter>
      <Menu menuCategories={menuItems} />
    </MemoryRouter>
  );

  it('renders the component', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('opens menu on click', () => {
    wrapper.find('.toggleMenuButton').simulate('click');
    expect(wrapper.find(NavDropdown)).toHaveLength(2);
    expect(wrapper.html()).toMatchSnapshot();
  });
});
