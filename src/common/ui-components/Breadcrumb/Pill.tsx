import React from 'react';
import { IconClose } from 'hds-react';
import styles from './Pill.module.scss';
import CategoryIcon from '../CategoryIcon/CategoryIcon';

export interface PillProps {
  readonly category: string;
  readonly name: string;
  onClose(): void;
}

const Pill: React.FC<PillProps> = ({ category, name, onClose }) => {
  return (
    <div className={styles.pill}>
      <div>
        <CategoryIcon className={styles.smallIcon} category={category} />
      </div>
      <div className={styles.text}>{name}</div>
      <button onClick={onClose}>
        <IconClose className={styles.smallIcon} />
      </button>
    </div>
  );
};

export default Pill;
