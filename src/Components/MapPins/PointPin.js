import React, { PureComponent } from 'react';

export default class CityPin extends PureComponent {
  render() {
    const { onClick, isActive, type } = this.props;
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
  }
}
