import React from 'react';
import { Home } from '../Home';
import Footer from '../../footer/Footer';
import { shallow } from 'enzyme';
import { PROMOTIONS_features_edges_node_properties } from '../../api/generatedTypes/PROMOTIONS';

describe('Home', () => {
  const mockPromotions: PROMOTIONS_features_edges_node_properties[] = [
    {
      name: 'Vallisaari',
      header: 'Vallisaari header',
      imageId: 14,
    },
    {
      name: 'Isosaari',
      header: 'Isosaari header',
      imageId: 17,
    },
  ];

  it('has a footer', () => {
    const wrapper = shallow(
      <Home promotion={mockPromotions[0]} promotions={mockPromotions} />
    );
    expect(wrapper.find(Footer)).toHaveLength(1);
  });
});
