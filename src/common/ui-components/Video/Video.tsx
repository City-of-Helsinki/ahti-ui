import React from 'react';
import classNames from 'classnames/bind';
import ReactPlayer from 'react-player';

import styles from './Video.module.scss';

const cx = classNames.bind(styles);

export const Video: React.FC<any> = ({ url }) => {
  return (
    <ReactPlayer
      className={cx(styles.container)}
      url={url}
      muted
      playing
      loop
    />
  );
};
