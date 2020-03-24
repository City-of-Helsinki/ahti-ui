import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames/bind';

import styles from './CardDescription.module.scss';
import commonStyles from './commonStyles.module.scss';

const cx = classNames.bind(styles);

interface CardDescriptionProps {
  readonly description: string;
  readonly shortDescriptionLength?: number;
}

const CardDescription: React.FC<CardDescriptionProps> = ({
  description,
  shortDescriptionLength = 500
}) => {
  const { t } = useTranslation();
  const [showMoreToggled, setShowMoreToggled] = useState<boolean>(false);

  return (
    <div className={styles.container}>
      <div className={cx(commonStyles.bodyText)}>
        {showMoreToggled || description.length <= shortDescriptionLength
          ? description
          : description.substr(0, 500) + '...'}
      </div>

      {description.length > shortDescriptionLength && (
        <button
          onClick={() => setShowMoreToggled(!showMoreToggled)}
          className={cx({
            showMoreButton: true,
            showLess: showMoreToggled
          })}
        >
          {showMoreToggled ? t('card.show_less') : t('card.show_more')}
        </button>
      )}
    </div>
  );
};

export default CardDescription;
