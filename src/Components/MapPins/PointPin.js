import React, { PureComponent } from 'react';

import { ReactComponent as Location } from '../../assets/icons/location.svg';

export default class CityPin extends PureComponent {
  render() {
    const { onClick, isActive } = this.props;
    const size = isActive ? 50 : 24;
    return (
      <Location
        viewBox="0 0 48 48"
        height={size}
        style={{
          cursor: 'pointer',
          transform: `translate(${-size / 2}px,${-size}px)`,
        }}
        onClick={onClick}
      />
    );
  }
}
