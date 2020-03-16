import React from 'react';
import classNames from 'classnames/bind';
import ReactPlayer from 'react-player';

// @ts-ignore
import myVideo from './ahti-hero-1.mp4';
import styles from './Video.module.scss';

const cx = classNames.bind(styles);

// interface VideoProps {
//   readonly title: string;
//   readonly children: React.ReactNode;
//   readonly disabled?: boolean;
// }

export const Video: React.FC<any> = () => {
  return (
    <ReactPlayer width="200" height="500" url={myVideo} muted playing loop />
  );
};
