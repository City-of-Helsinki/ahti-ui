import React from 'react';
import classNames from 'classnames/bind';

import styles from './Slide.module.scss';

export interface SlideProps {
  children: React.ReactNode;
}

const Slide = (props: SlideProps) => {
  return <div className={classNames(styles.container)}>{props.children}</div>;
};

export default Slide;
