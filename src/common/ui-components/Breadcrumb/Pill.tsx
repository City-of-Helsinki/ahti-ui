import React from 'react';
import { IconClose } from 'hds-react';
import { useTranslation } from 'react-i18next';

import styles from './Pill.module.scss';
import CategoryIcon from '../CategoryIcon/CategoryIcon';

export interface PillProps {
  readonly category?: string;
  readonly name: string;
  onClose(): void;
}

const Pill: React.FC<PillProps> = ({ category, name, onClose }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.pill}>
      {category && (
        <div>
          <CategoryIcon className={styles.smallIcon} category={category} />
        </div>
      )}
      <div className={styles.text}>{name}</div>
      <button
        onClick={onClose}
        aria-label={`${t('breadcrumb.close')}: ${name}`}
        type="button"
      >
        <IconClose className={styles.smallIcon} />
      </button>
    </div>
  );
};

export default Pill;
