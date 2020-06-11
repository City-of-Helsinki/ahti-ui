import React from 'react';
import { useTranslation } from 'react-i18next';
import { IconClose } from 'hds-react';
import classNames from 'classnames';

import styles from './CloseButton.module.scss';

export interface CloseButtonProps {
  readonly className?: string;
  onClose(): void;
}

const CloseButton: React.FC<CloseButtonProps> = ({ className, onClose }) => {
  const { t } = useTranslation();
  return (
    <button
      className={classNames(styles.backButton, className)}
      onClick={onClose}
    >
      <IconClose className={classNames(styles.smallIcon, styles.marginRight)} />
      {t('common.close')}
    </button>
  );
};

export default CloseButton;
