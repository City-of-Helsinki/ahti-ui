import React from 'react';
import { useTranslation } from 'react-i18next';

import styles from './IslandRoutes.module.scss';
import {
  Feature,
  Ferry,
  Harbor,
} from '../../../../domain/api/generated/types.d';
import { useOvermind } from '../../../../domain/overmind';

export interface IslandRoutesProps {
  readonly harbors: Feature[];
  readonly ferries: Feature[];
}

const IslandRoutes: React.FC<IslandRoutesProps> = ({ harbors, ferries }) => {
  const { t } = useTranslation();
  const { actions } = useOvermind();

  return (
    <div>
      {harbors.length > 0 && (
        <>
          <h2 className={styles.heading}>
            {t('card.island_content.routes.harbors')}
          </h2>
          {harbors.map((harbor: Feature, id: number) => (
            <button
              className={styles.item}
              key={id}
              onClick={() =>
                actions.selectFeatureById(harbor.properties.ahtiId)
              }
            >
              {harbor.properties.name}
            </button>
          ))}
        </>
      )}
      {ferries.length > 0 && (
        <>
          <h2 className={styles.heading}>
            {t('card.island_content.routes.ferries')}
          </h2>
          {ferries.map((ferry: Feature, id: number) => (
            <button
              className={styles.item}
              key={id}
              onClick={() => actions.selectFeatureById(ferry.properties.ahtiId)}
            >
              {ferry.properties.name}
            </button>
          ))}
        </>
      )}
    </div>
  );
};

export default IslandRoutes;
