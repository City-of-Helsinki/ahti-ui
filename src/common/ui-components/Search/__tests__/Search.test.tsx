import React from 'react';
import Search, { SearchData, SearchItem } from '../Search';
import { mount, ReactWrapper, shallow, ShallowWrapper } from 'enzyme';
import { MockedProvider } from '@apollo/react-testing';
import { act } from 'react-dom/test-utils';
import waitForExpect from 'wait-for-expect';
import FEATURES_SEARCH_QUERY from '../../../../domain/api/queries/featuresSearchQuery';

describe('Search', () => {
  let searchWrapper: ReactWrapper;
  const mocks = [
    {
      request: { query: FEATURES_SEARCH_QUERY },
      result: {
        features: {
          edges: [
            {
              node: {
                properties: {
                  ahtiId: 'myhelsinki:place:364',
                  category: {
                    id: 'ahti:category:island'
                  },
                  name: 'Harakan luontokeskus',
                  contactInfo: {
                    address: {
                      municipality: 'Helsinki'
                    }
                  }
                }
              }
            }
          ]
        }
      }
    }
  ];

  beforeEach(() => {
    searchWrapper = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Search onSelect={jest.fn()} />
      </MockedProvider>
    );
  });

  it('matches snapshot', () => {
    expect(searchWrapper.html()).toMatchSnapshot();
  });

  it('returns items on search', async () => {
    expect(searchWrapper.find(SearchItem)).toHaveLength(0);
    searchWrapper.find('input').simulate('change', { target: { value: 'a' } });
    await act(async () => {
      waitForExpect(() => {
        expect(searchWrapper.find(SearchItem)).toHaveLength(1);
      });
    });
  });

  it('clicking cross clears current search', () => {
    searchWrapper.find('input').simulate('change', { target: { value: 'a' } });
    searchWrapper.find('button[aria-label="close"]').simulate('click');
    expect(searchWrapper.find('input').prop('value')).toEqual('');
  });
});

const mockData: SearchData[] = [
  {
    id: 'myhelsinki:place:1',
    name: 'Venepaikka',
    location: 'Helsinki',
    category: 'ahti:category:island'
  }
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
