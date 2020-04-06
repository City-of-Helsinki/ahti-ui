import React from 'react';
import classNames from 'classnames/bind';

import fallbackImage from '../../../assets/images/fallback.jpg';
import styles from './Slide.module.scss';

export interface SlideProps {
  children: React.ReactNode;
  backgroundImage?: string;
}

const Slide = (props: SlideProps) => {
  return (
    <div
      className={classNames(styles.container)}
      style={{
        backgroundImage: props.backgroundImage
          ? `url(${props.backgroundImage})`
          : `url(${fallbackImage})`,
      }}
    >
      {props.children}
    </div>
  );
};

export default Slide;
