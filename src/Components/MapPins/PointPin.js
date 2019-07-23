import React, { PureComponent } from 'react';

import { ReactComponent as Location } from '../../assets/icons/location.svg';
import { ReactComponent as LocationFill } from '../../assets/icons/location_fill.svg';

export default class CityPin extends PureComponent {
  render() {
    const { onClick, isActive, isCurrent } = this.props;
    const size = isActive ? 48 : 24;
    return isCurrent ? (
      <LocationFill
        viewBox="0 0 48 48"
        height={size}
        style={{
          cursor: 'pointer',
          transform: `translate(${-size / 2}px,${-size}px)`,
        }}
        onClick={onClick}
      />
    ) : (
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
