import React from 'react';
import { Koros } from 'hds-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

import styles from './Footer.module.scss';

export interface FooterProps {
  readonly className?: string;
}

const Footer: React.FC<FooterProps> = ({ className }) => {
  const { t } = useTranslation();

  return (
    <footer className={classNames(styles.container, className)}>
      <Koros flipHorizontal={true} className={styles.koros} />
      <div className={styles.logo} />
      <div className={styles.divider} />
      <div
        className={styles.copyright}
      >{`© Copyright ${new Date().getFullYear()} • ${t(
        'common.all_rights_reserved'
      )}`}</div>
      <div className={styles.tos}>
        <Link to={'/terms'}>{t('common.terms_of_service')}</Link>
      </div>
    </footer>
  );
};

export default Footer;