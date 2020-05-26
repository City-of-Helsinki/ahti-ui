import React from 'react';
import classNames from 'classnames';

import styles from './Slide.module.scss';

export interface SlideProps {
  readonly imageUrl: string;
  readonly className?: string;
  onClick?(): void;
}

const Slide: React.FC<SlideProps> = ({
  imageUrl,
  className,
  children,
  onClick,
}) => {
  return (
    <div
      className={classNames(className, styles.slide)}
      style={{ backgroundImage: `url(${imageUrl})`, backgroundSize: 'cover' }}
      onClick={() => onClick && onClick()}
      role={'button'}
    >
      {children}
    </div>
  );
};

export default Slide;
