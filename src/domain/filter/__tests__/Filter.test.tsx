import React from 'react';
import Filter, { FilterOptions } from '../Filter';
import { shallow, ShallowWrapper } from 'enzyme';

describe('Filter', () => {
  const filterOptions: FilterOptions<string>[] = [
    { type: 'Kulkuyhteydet saariin', items: ['Vesibussi', 'Lautta', 'Silta'] },
    { type: 'Palvelut saarissa', items: ['Ravintola', 'Kahvila', 'Sauna'] },
    { type: 'Retkeily', items: ['Telttailu sallittu', 'Kaivo'] },
  ];

  const mockData = [
    ['Retkeily', 'Ravintola'],
    ['Retkeily', 'Ravintola', 'Sauna'],
    ['Retkeily', 'Telttailu sallittu'],
    ['Kahvila', 'Vesibussi'],
  ];

  let wrapper: ShallowWrapper;
  let mockOnShow: jest.Mock;

  beforeEach(() => {
    mockOnShow = jest.fn();
    wrapper = shallow(
      <Filter
        options={filterOptions}
        onShow={mockOnShow}
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
    expect(mockOnShow.mock.calls[0][0][0]).toBe('Vesibussi');
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
});
