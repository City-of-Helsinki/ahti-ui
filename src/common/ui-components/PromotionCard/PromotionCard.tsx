import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import styles from './PromotionCard.module.scss';
import ImageWithCard from '../ImageWithCard/ImageWithCard';

export interface PromotionCardProps {
  readonly imageSrc: string;
  readonly header: string;
  readonly text: string;
  readonly link: string;
  readonly linkText: string;
  readonly className?: string;
}

const PromotionCard: React.FC<PromotionCardProps> = ({
  imageSrc,
  header,
  text,
  link,
  linkText,
  className
}) => {
  return (
    <ImageWithCard
      src={imageSrc}
      className={classNames(styles.imageWithCard, className)}
    >
      <section className={styles.promotionSection}>
        <h2>{header}</h2>
        <p>{text}</p>
        <Link to={link} className={styles.link}>
          {linkText}
        </Link>
      </section>
    </ImageWithCard>
  );
};

export default PromotionCard;
