import React from 'react';
import Filter from './Filter';
import { storiesOf } from '@storybook/react';

storiesOf('Filter', module).add('Islands', () => {
  const filterOptions = [
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

  return (
    <Filter
      options={filterOptions}
      onShow={selectedFilters => () => {}}
      countMatches={selectedFilters =>
        mockData.filter(
          data => new Set([...data, ...selectedFilters]).size === data.length
        ).length
      }
    />
  );
});
