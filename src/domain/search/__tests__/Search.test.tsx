import React from 'react';
import Search, { SearchData, SearchItem } from '../Search';
import { shallow, ShallowWrapper } from 'enzyme';

const mockData: SearchData[] = [
  { name: 'Venepaikka', location: 'Helsinki', type: 'boat' },
];

describe('Search', () => {
  let searchWrapper: ShallowWrapper;
  let mockOnClose: jest.Mock;

  beforeEach(() => {
    mockOnClose = jest.fn();
    searchWrapper = shallow(
      <Search data={mockData} onClose={mockOnClose} onSelect={jest.fn()} />
    );
  });

  it('matches snapshot', () => {
    expect(searchWrapper.html()).toMatchSnapshot();
  });

  it('returns items on search', () => {
    expect(searchWrapper.find(SearchItem)).toHaveLength(0);
    searchWrapper.find('input').simulate('change', { target: { value: 'a' } });
    expect(searchWrapper.find(SearchItem)).toHaveLength(1);
  });

  it('calls close function on click', () => {
    expect(mockOnClose.mock.calls.length).toBe(0);
    searchWrapper.find('img[alt="close"]').simulate('click');
    expect(mockOnClose.mock.calls.length).toBe(1);
  });
});

describe('SearchItem', () => {
  let searchItemWrapper: ShallowWrapper;
  let mockOnSelect: jest.Mock;

  beforeEach(() => {
    mockOnSelect = jest.fn();
    searchItemWrapper = shallow(
      <SearchItem
        matchedPart={'Vene'}
        onSelect={mockOnSelect}
        {...mockData[0]}
      />
    );
  });

  it('matches snapshot', () => {
    expect(searchItemWrapper.html()).toMatchSnapshot();
  });

  it('calls onSelect on item click', () => {
    expect(mockOnSelect.mock.calls.length).toBe(0);
    searchItemWrapper.simulate('click');
    expect(mockOnSelect.mock.calls.length).toBe(1);
  });
});
