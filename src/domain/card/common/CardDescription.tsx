import React, { useRef, useState } from 'react';
import BodyText from '../../../Components/BodyText/BodyText';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames/bind';
import styles from './CardDescription.module.scss';

const cx = classNames.bind(styles);

interface CardDescriptionProps {
  readonly description: string;
  readonly maxHeight?: number;
}

const CardDescription: React.FC<CardDescriptionProps> = ({
  description,
  maxHeight = 195,
}) => {
  const { t } = useTranslation();
  const descriptionContainerRef = useRef<HTMLDivElement>(null);
  const [showMore, setShowMore] = useState<boolean>(false);

  return (
    <div className={styles.container}>
      <div
        className={cx({
          descriptionContainer: true,
          descriptionContainerOpen: showMore,
        })}
        style={{ maxHeight: maxHeight }}
        ref={descriptionContainerRef}
      >
        <BodyText>{description}</BodyText>
      </div>

      {descriptionContainerRef.current &&
        descriptionContainerRef.current.clientHeight >= maxHeight && (
          <button
            onClick={() => setShowMore(!showMore)}
            className={cx({
              showMoreButton: true,
              showMore: showMore,
            })}
          >
            {showMore ? t('card.show_less') : t('card.show_more')}
          </button>
        )}
    </div>
  );
};

export default CardDescription;
