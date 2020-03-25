import React from 'react';
import Lottie, { Options } from 'react-lottie';

let options: Options;

export interface SpinnerProps {
  readonly animation: typeof options.animationData;
  readonly width?: number | string;
  readonly height?: number | string;
  readonly className?: string;
}

const Spinner: React.FC<SpinnerProps> = ({
  animation,
  width = '100%',
  height = '100%',
  className,
}) => {
  const lottieOptions = {
    loop: true,
    autoplay: true,
    prerender: true,
    animationData: animation,
  };

  return (
    <div className={className}>
      <Lottie options={lottieOptions} width={width} height={height} />
    </div>
  );
};

export default Spinner;
