import React from 'react';
import classNames from 'classnames/bind';
import ReactPlayer from 'react-player';

import myVideo from './Ahti_vertical.mp4';
import styles from './Video.module.scss';

const cx = classNames.bind(styles);

export const Video: React.FC<any> = () => {
  return (
    <ReactPlayer
      className={cx(styles.container)}
      url={myVideo}
      width="375px"
      muted
      playing
      loop
    />
  );
};
