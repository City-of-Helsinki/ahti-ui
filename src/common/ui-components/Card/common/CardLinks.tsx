import React from 'react';
import { useTranslation } from 'react-i18next';

import { ExternalLink } from '../../../../domain/api/generated/types.d';
import commonStyles from '../common/commonStyles.module.scss';
import styles from './CardLinks.module.scss';

export interface CardLinkProps {
  readonly links: ExternalLink[];
}

const CardLinks: React.FC<CardLinkProps> = ({ links }) => {
  const { t } = useTranslation();
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>{t('external_links.services')}</h2>
      {links.map((link: ExternalLink, id: number) => {
        return (
          <a
            key={id}
            target={'_blank'}
            href={link.url}
            className={commonStyles.bookingUrl}
          >
            {t(`external_links.${link.type}`)}
          </a>
        );
      })}
    </div>
  );
};

export default CardLinks;
