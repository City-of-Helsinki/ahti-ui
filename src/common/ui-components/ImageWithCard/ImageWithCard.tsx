import React from 'react';

export type ImageWithCardProps = React.PropsWithChildren<{
  src: string;
  className?: string;
}>;

const ImageWithCard: React.FC<ImageWithCardProps> = ({
  src,
  children,
  className
}) => {
  return (
    <div style={{ backgroundImage: `url(${src})` }} className={className}>
      {children}
    </div>
  );
};

export default ImageWithCard;
