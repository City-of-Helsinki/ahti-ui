import React from 'react';
import {
  FEATURES_features_edges_node_properties_ferries,
  FEATURES_features_edges_node_properties_harbors,
} from '../../api/generatedTypes/FEATURES';
import { useTranslation } from 'react-i18next';
import { useOvermind } from '../../overmind';
import styles from './IslandRoutes.module.scss';

export interface IslandRoutesProps {
  readonly harbors: FEATURES_features_edges_node_properties_harbors[];
  readonly ferries: FEATURES_features_edges_node_properties_ferries[];
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
          {harbors.map(
            (
              harbor: FEATURES_features_edges_node_properties_harbors,
              id: number
            ) => (
              <button
                className={styles.item}
                key={id}
                onClick={() =>
                  actions.displayHarborCard(harbor.properties.ahtiId)
                }
              >
                {harbor.properties.name}
              </button>
            )
          )}
        </>
      )}
      {ferries.length > 0 && (
        <>
          <h2 className={styles.heading}>
            {t('card.island_content.routes.ferries')}
          </h2>
          {ferries.map(
            (
              ferry: FEATURES_features_edges_node_properties_ferries,
              id: number
            ) => (
              <button
                className={styles.item}
                key={id}
                onClick={() => {
                  actions.displayFerryCard(ferry.properties.ahtiId);
                }}
              >
                {ferry.properties.name}
              </button>
            )
          )}
        </>
      )}
    </div>
  );
};

export default IslandRoutes;
