import React from 'react';
import Filter from './Filter';
import { storiesOf } from '@storybook/react';
import { useTranslation } from 'react-i18next';

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

  const { t } = useTranslation();
  return (
    <Filter
      type={t('types.island')}
      options={filterOptions}
      onShow={selectedFilters => () => {}}
      onClose={() => {}}
      countMatches={selectedFilters =>
        mockData.filter(
          data => new Set([...data, ...selectedFilters]).size === data.length
        ).length
      }
    />
  );
});
