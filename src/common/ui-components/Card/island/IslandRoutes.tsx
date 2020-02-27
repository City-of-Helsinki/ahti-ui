import React from 'react';
import { useTranslation } from 'react-i18next';

import styles from './IslandRoutes.module.scss';
import { Ferry, Harbor } from '../../../../domain/api/generated/types.d';
import { useOvermind } from '../../../../domain/overmind';

export interface IslandRoutesProps {
  readonly harbors: Harbor[];
  readonly ferries: Ferry[];
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
          {harbors.map((harbor: Harbor, id: number) => (
            <button
              className={styles.item}
              key={id}
              onClick={() => actions.selectHarbor(harbor.properties.ahtiId)}
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
          {ferries.map((ferry: Ferry, id: number) => (
            <button
              className={styles.item}
              key={id}
              onClick={() => actions.selectFerry(ferry.properties.ahtiId)}
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
