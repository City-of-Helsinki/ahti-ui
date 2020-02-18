import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames/bind';
import styles from './CardDescription.module.scss';
import commonStyles from './commonStyles.module.scss';

const cx = classNames.bind(styles);

interface CardDescriptionProps {
  readonly description: string;
}

const CardDescription: React.FC<CardDescriptionProps> = ({ description }) => {
  const { t } = useTranslation();
  const [showMoreToggled, setShowMoreToggled] = useState<boolean>(false);

  return (
    <div className={styles.container}>
      <div
        className={cx(commonStyles.bodyText, {
          descriptionContainer: true,
          descriptionContainerOpen: showMoreToggled
        })}
      >
        {description}
      </div>

      <button
        onClick={() => setShowMoreToggled(!showMoreToggled)}
        className={cx({
          showMoreButton: true,
          showLess: showMoreToggled
        })}
      >
        {showMoreToggled ? t('card.show_less') : t('card.show_more')}
      </button>
    </div>
  );
};

export default CardDescription;
