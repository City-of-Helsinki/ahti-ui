import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './IslandRoutes.module.scss';
import { Ferry, Harbor } from '../../../../domain/api/generated/types.d';

export interface IslandRoutesProps {
  readonly harbors: Harbor[];
  readonly ferries: Ferry[];
  selectFeature(ahtiId: string): void;
}

const IslandRoutes: React.FC<IslandRoutesProps> = ({
  harbors,
  ferries,
  selectFeature
}) => {
  const { t } = useTranslation();

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
              onClick={() => selectFeature(harbor.properties.ahtiId)}
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
              onClick={() => {
                selectFeature(ferry.properties.ahtiId);
              }}
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
