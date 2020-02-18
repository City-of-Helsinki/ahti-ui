import { Tab, Tabs } from '../../Tabs/Tabs';
import CardDescription from '../common/CardDescription';
import CommonCardInfo from '../common/CommonCardInfo';
import IslandRoutes from './IslandRoutes';
import React from 'react';
import { useTranslation } from 'react-i18next';

export interface IslandContentProps {
  readonly island: any;
  selectFeature(ahtiId: string): void;
}

const IslandContent: React.FC<IslandContentProps> = ({ island, selectFeature }) => {
  const { t } = useTranslation();
  return (
    <Tabs>
      <Tab title={t('card.island_content.description_tab')}>
        <CardDescription description={island.properties.description} />
        <CommonCardInfo feature={island} />
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
          selectFeature={selectFeature}
        />
      </Tab>
      <Tab title={t('card.island_content.services_tab')} disabled>
        <div></div>
      </Tab>
    </Tabs>
  );
};

export default IslandContent;
