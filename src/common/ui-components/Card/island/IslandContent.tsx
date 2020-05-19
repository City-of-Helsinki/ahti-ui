import React from 'react';
import { useTranslation } from 'react-i18next';

import { Tab, Tabs } from '../../Tabs/Tabs';
import CardDescription from '../common/CardDescription';
import IslandRoutes from './IslandRoutes';
import { ferriesLens, harborsLens } from '../../../utils/lenses';

export interface IslandContentProps {
  readonly island: any;
}

const IslandContent: React.FC<IslandContentProps> = ({ island }) => {
  const { t } = useTranslation();

  const ferries = ferriesLens.get(island);
  const harbors = harborsLens.get(island);

  return (
    <Tabs>
      <Tab title={t('card.island_content.description_tab')}>
        <CardDescription description={island.properties.description} />
      </Tab>
      {(ferries.length > 0 || harbors.length > 0) && (
        <Tab title={t('card.island_content.routes_tab')}>
          <IslandRoutes harbors={harbors} ferries={ferries} />
        </Tab>
      )}
    </Tabs>
  );
};

export default IslandContent;
