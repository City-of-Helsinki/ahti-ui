import React, { PureComponent } from 'react';

interface CityPinProps {
  onClick(event: React.MouseEvent<HTMLImageElement>): void;
  readonly isActive: boolean;
  readonly type: string;
}

const CityPin: React.FC<CityPinProps> = ({ onClick, isActive, type }) => {
  const size = type === 'island' ? (isActive ? 36 : 18) : isActive ? 72 : 36;
  return (
    <img
      src={`/icons/point/${type}_point.svg`}
      alt="map pin"
      style={{
        height: size,
        width: size,
        cursor: 'pointer',
        transform: `translate(${-size / 2}px,${-size}px)`,
      }}
      onClick={onClick}
    />
  );
};

export default CityPin;
