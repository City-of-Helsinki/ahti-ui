import React from 'react';
import { MemoryRouter } from 'react-router';
import { useTranslation } from 'react-i18next';

import PromotionCard from './PromotionCard';
import styles from '../../../domain/IndexPage/IndexPage.module.scss';

export default {
  title: 'PromotionCard',
  component: PromotionCard
};

export const NewInAhti = () => {
  const { t } = useTranslation();
  return (
    <MemoryRouter>
      <PromotionCard
        imageSrc={'/images/new_in_ahti.jpg'}
        header={t('index.section5_header')}
        text={t('index.section5_paragraph')}
        link={'/new'}
        linkText={t('index.section5_link')}
        className={styles.imageWithCardSection}
      />
    </MemoryRouter>
  );
};

NewInAhti.story = {
  name: 'New in ahti'
};
