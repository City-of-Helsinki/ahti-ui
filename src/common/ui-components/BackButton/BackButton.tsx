import React from 'react';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

import styles from './BackButton.module.scss';

export interface BackButtonProps {
  readonly className?: string;
  onBack(): void;
}

const BackButton: React.FC<BackButtonProps> = ({ className, onBack }) => {
  const { t } = useTranslation();
  return (
    <button
      className={classNames(styles.backButton, className)}
      onClick={() => onBack()}
    >
      {t('common.back')}
    </button>
  );
};

export default BackButton;
