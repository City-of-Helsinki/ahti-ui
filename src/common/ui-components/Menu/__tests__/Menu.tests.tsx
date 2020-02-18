import React from 'react';
import { mount } from 'enzyme';
import Menu, { MenuItem } from '../Menu';
import { IconLocation, IconFood } from 'hds-react';
import { MemoryRouter } from 'react-router';
import NavDropdown from '../NavDropdown/NavDropdown';

describe('Menu', () => {
  const menuItems: MenuItem[] = [
    {
      title: 'islands',
      icon: <IconLocation />,
      links: [{ name: 'all_islands', url: '/map?type=myhelsinki' }]
    },
    {
      title: 'restaurants',
      icon: <IconFood />,
      links: [
        { name: 'restaurants', url: '/', disabled: true },
        { name: 'cafes', url: '/', disabled: true },
        { name: 'beer_and_wine_bars', url: '/', disabled: true }
      ]
    }
  ];
  const wrapper = mount(
    <MemoryRouter>
      <Menu menuItems={menuItems} />
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
