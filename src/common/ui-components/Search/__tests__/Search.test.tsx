import React from 'react';
import { mount, ReactWrapper, shallow, ShallowWrapper } from 'enzyme';
import waitForExpect from 'wait-for-expect';

import Search, { SearchData, SearchItem } from '../Search';
import mockFeatures from './mockFeatures.json';

describe('Search', () => {
  let searchWrapper: ReactWrapper;
  const mock = mockFeatures;

  beforeEach(() => {
    searchWrapper = mount(
      // @ts-ignore
      <Search featuresToSearch={mock} onSelect={jest.fn()} isMenuOpen={true} />
    );
  });

  it('matches snapshot', () => {
    expect(searchWrapper.html()).toMatchSnapshot();
  });

  it('returns items on search', async () => {
    expect(searchWrapper.find(SearchItem)).toHaveLength(0);
    searchWrapper.find('svg').simulate('click');
    searchWrapper.find('input').simulate('focus');
    searchWrapper.find('input').simulate('change', { target: { value: 'a' } });
    await waitForExpect(() => {
      expect(searchWrapper.find(SearchItem)).toHaveLength(1);
    });
  });
});

const mockData: SearchData[] = [
  {
    id: 'myhelsinki:place:1',
    name: 'Venepaikka',
    location: 'Helsinki',
    category: 'ahti:category:island',
  },
];

describe('SearchItem', () => {
  let searchItemWrapper: ShallowWrapper;
  let mockOnSelect: jest.Mock;

  beforeEach(() => {
    mockOnSelect = jest.fn();
    searchItemWrapper = shallow(
      <SearchItem
        currentSearch={'Vene'}
        onSelect={mockOnSelect}
        {...mockData[0]}
      />
    );
  });

  it('matches snapshot', () => {
    expect(searchItemWrapper.html()).toMatchSnapshot();
  });

  it('calls onSelect on item click', () => {
    expect(mockOnSelect).toHaveBeenCalledTimes(0);
    searchItemWrapper.simulate('click');
    expect(mockOnSelect).toHaveBeenCalledTimes(1);
    expect(mockOnSelect).toHaveBeenCalledWith('myhelsinki:place:1');
  });
});
