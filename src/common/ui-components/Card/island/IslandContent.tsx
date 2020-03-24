import React from 'react';
import { useTranslation } from 'react-i18next';

import { Tab, Tabs } from '../../Tabs/Tabs';
import CardDescription from '../common/CardDescription';
import IslandRoutes from './IslandRoutes';

export interface IslandContentProps {
  readonly island: any;
}

const IslandContent: React.FC<IslandContentProps> = ({ island }) => {
  const { t } = useTranslation();
  return (
    <Tabs>
      <Tab title={t('card.island_content.description_tab')}>
        <CardDescription description={island.properties.description} />
      </Tab>
      <Tab
        title={t('card.island_content.routes_tab')}
        disabled={
          island.properties.ferries.length === 0 &&
          island.properties.harbors.length === 0
        }
      >
        <IslandRoutes
          harbors={island.properties.harbors}
          ferries={island.properties.ferries}
        />
      </Tab>
      <Tab title={t('card.island_content.services_tab')} disabled>
        <div></div>
      </Tab>
    </Tabs>
  );
};

export default IslandContent;
