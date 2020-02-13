import React from 'react';
import Filter, { FilterOptions } from '../Filter';
import { shallow, ShallowWrapper } from 'enzyme';

describe('Filter', () => {
  const filterOptions = [
    {
      type: 'Kulkuyhteydet saariin',
      items: [
        { name: 'Vesibussi', key: 'water_bus' },
        { name: 'Lautta', key: 'ferry' },
        { name: 'Silta', key: 'bridge' }
      ]
    },
    {
      type: 'Palvelut saarissa',
      items: [
        { name: 'Ravintola', key: 'restaurant' },
        { name: 'Kahvila', key: 'cafe' },
        { name: 'Sauna', key: 'sauna' }
      ]
    },
    {
      type: 'Retkeily',
      items: [
        { name: 'Telttailu sallittu', key: 'camping' },
        { name: 'Kaivo', key: 'well' }
      ]
    }
  ];

  const mockData = [
    ['restaurant'],
    ['restaurant', 'sauna'],
    ['camping'],
    ['cafe', 'water_bus']
  ];

  let wrapper: ShallowWrapper;
  let mockOnShow: jest.Mock;
  let mockOnClose: jest.Mock;

  beforeEach(() => {
    mockOnShow = jest.fn();
    mockOnClose = jest.fn();
    wrapper = shallow(
      <Filter
        type={'Saaret'}
        options={filterOptions}
        onShow={mockOnShow}
        onClose={mockOnClose}
        countMatches={selectedFilters =>
          mockData.filter(
            data => new Set([...data, ...selectedFilters]).size === data.length
          ).length
        }
      />
    );
  });

  it('matches snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('selected items have correct classname', () => {
    expect(wrapper.find('button.activeButton').length).toBe(0);
    wrapper
      .find('button.filterOption')
      .at(1)
      .simulate('click');
    expect(wrapper.find('button.activeButton').length).toBe(1);
  });

  it('callbacks are called with the current selection', () => {
    wrapper
      .find('button.filterOption')
      .at(0)
      .simulate('click');
    wrapper.find('button.showButton').simulate('click');

    expect(mockOnShow.mock.calls.length).toBe(1);
    expect(mockOnShow.mock.calls[0][0][0]).toBe('water_bus');
  });

  it('0 matches disables show', () => {
    expect(wrapper.find('button.showButton').prop('disabled')).toBeFalsy();
    wrapper
      .find('button.filterOption')
      .at(1)
      .simulate('click');
    expect(
      wrapper.find('button.showButtonDisabled').prop('disabled')
    ).toBeTruthy();
  });

  it('calls onClose when clicking cross icon', () => {
    expect(mockOnClose.mock.calls.length).toBe(0);
    wrapper.find('.closeButton').simulate('click');
    expect(mockOnClose.mock.calls.length).toBe(1);
  });
});
