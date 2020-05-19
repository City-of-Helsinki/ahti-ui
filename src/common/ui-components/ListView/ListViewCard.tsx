import React from 'react';
import { useTranslation } from 'react-i18next';

import { Feature } from '../../../domain/api/generated/types.d';
import CategoryIcon from '../CategoryIcon/CategoryIcon';
import { getFirstImageUrl } from '../../utils/images';
import styles from './ListViewCard.module.scss';

export interface ListViewCardProps {
  readonly feature: Feature;
  onClick(): void;
}

const ListViewCard: React.FC<ListViewCardProps> = ({ feature, onClick }) => {
  const { t } = useTranslation();
  const category = feature?.properties?.category?.id;
  const name = feature?.properties?.name;
  const shortDescription = feature?.properties?.shortDescription;
  const imageUrl = getFirstImageUrl(feature?.properties?.images, null);

  return (
    <div
      className={styles.container}
      role={'button'}
      onClick={onClick}
      tabIndex={0}
      aria-label={`${t('list_view.open')}: ${name}`}
    >
      <div className={styles.infoContainer}>
        <div>
          <CategoryIcon category={category} className={styles.largeIcon} />
        </div>
        <div className={styles.infoTextContainer}>
          <h2 className={styles.heading}>{name}</h2>
          <div className={styles.shortDescription}>{shortDescription}</div>
        </div>
      </div>
      {imageUrl && (
        <img
          src={imageUrl}
          className={styles.image}
          alt={`${t('list_view.image_alt')}: ${name}`}
          width={100}
        />
      )}
    </div>
  );
};

export default ListViewCard;
