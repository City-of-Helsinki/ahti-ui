import React from 'react';
import classNames from 'classnames/bind';

import styles from './Slide.module.scss';

export interface SlideProps {
  children: React.ReactNode;
  backgroundImage: any;
}

const Slide = (props: SlideProps) => {
  return (
    <div
      className={classNames(styles.container)}
      style={{
        backgroundImage: props.backgroundImage
          ? `url(${props.backgroundImage})`
          : 'url("https://images.unsplash.com/photo-1557261651-f893a96f357e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80")',
      }}
    >
      {props.children}
    </div>
  );
};

export default Slide;
