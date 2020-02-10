import React from 'react';
import Filter from './Filter';

export default {
  title: 'Filter',
  component: Filter
};

export const IslandFiltering = () => {
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

  return (
    <Filter
      title="Suodattimet"
      show="Näytä"
      noMatches="Ei hakutuloksia"
      clear="Tyhjennä"
      type="Saaret"
      options={filterOptions}
      onShow={selectedFilters =>
        alert(`Selekoidut filtterit: ${selectedFilters}`)
      }
      onClose={() => {}}
      countMatches={selectedFilters =>
        mockData.filter(
          data => new Set([...data, ...selectedFilters]).size === data.length
        ).length
      }
    />
  );
};

IslandFiltering.story = {
  name: 'Islands'
};
