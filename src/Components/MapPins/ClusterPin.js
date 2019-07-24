import React, { PureComponent } from 'react';

const pinStyle = {
  cursor: 'pointer',
  stroke: 'none',
};

export default class CityPin extends PureComponent {
  render() {
    const { cluster, flyToPoint } = this.props;
    const size = 36;
    return (
      <svg
        height={size}
        viewBox="0 0 48 48"
        fill="#1A1A1A"
        style={{
          ...pinStyle,
          //transform applied at Cluster.js
        }}
        onClick={() => flyToPoint(cluster.geometry, 700, false, 2)}
      >
        <g>
          <path d="M35.32 6.67C32.2882 3.67761 28.1998 1.99977 23.94 1.99977C19.6802 1.99977 15.5918 3.67761 12.56 6.67C6.27 12.89 6.7 22.59 12.56 29.2C18.56 36 21.79 40.2 23.93 44.5C26.09 40.24 29.3 36 35.32 29.2C41.18 22.59 41.6 12.89 35.32 6.67ZM32.93 27.09C29.6968 30.6193 26.6908 34.3501 23.93 38.26C21.1659 34.3526 18.16 30.622 14.93 27.09C12.6026 24.5257 11.2721 21.2118 11.18 17.75C11.1416 16.1096 11.4434 14.4789 12.0664 12.9609C12.6894 11.4429 13.6202 10.0704 14.8 8.93C17.2332 6.52694 20.5152 5.17942 23.935 5.17942C27.3548 5.17942 30.6368 6.52694 33.07 8.93C34.248 10.0713 35.1769 11.4442 35.7982 12.9621C36.4195 14.4801 36.7197 16.1103 36.68 17.75C36.5923 21.2127 35.2612 24.5281 32.93 27.09Z" />
          <text x="50%" y="55%" fontSize="1.8rem" textAnchor="middle">
            {cluster.properties.point_count}
          </text>
        </g>
      </svg>
    );
  }
}
