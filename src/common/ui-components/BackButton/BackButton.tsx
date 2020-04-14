import React from 'react';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

import { ReactComponent as ArrowLeft } from '../../../assets/icons/arrow_left.svg';
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
      <ArrowLeft />
      {t('common.back')}
    </button>
  );
};

export default BackButton;
