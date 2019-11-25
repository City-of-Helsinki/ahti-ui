import React from 'react';

const pinStyle = {
  cursor: 'pointer',
  stroke: 'none',
};

interface CityPinProps {
  readonly cluster: any;
  readonly flyToPoint: any;
}

const CityPin: React.FC<CityPinProps> = ({ cluster, flyToPoint }) => {
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
        <path
          d="M35.3177 6.67023C32.2859 3.67784 28.1975 2 23.9377 2C19.6779 2 15.5895 3.67784 12.5577 6.67023C6.26768 12.8902 6.69768 22.5902 12.5577 29.2002C18.5577 36.0002 21.7877 40.2002 23.9277 44.5002C26.0877 40.2402 29.2977 36.0002 35.3177 29.2002C41.1777 22.5902 41.5977 12.8902 35.3177 6.67023Z"
          fill="#E9F1F6"
        />
        <path
          d="M35.3177 6.67023C32.2859 3.67784 28.1975 2 23.9377 2C19.6779 2 15.5895 3.67784 12.5577 6.67023C6.26768 12.8902 6.69768 22.5902 12.5577 29.2002C18.5577 36.0002 21.7877 40.2002 23.9277 44.5002C26.0877 40.2402 29.2977 36.0002 35.3177 29.2002C41.1777 22.5902 41.5977 12.8902 35.3177 6.67023V6.67023ZM32.9277 27.0902C29.6945 30.6195 26.6885 34.3503 23.9277 38.2602C21.1636 34.3528 18.1577 30.6222 14.9277 27.0902C12.6003 24.5259 11.2698 21.212 11.1777 17.7502C11.1392 16.1098 11.441 14.4792 12.0641 12.9612C12.6871 11.4432 13.6179 10.0707 14.7977 8.93023C17.2308 6.52717 20.5129 5.17965 23.9327 5.17965C27.3525 5.17965 30.6345 6.52717 33.0677 8.93023C34.2457 10.0715 35.1746 11.4444 35.7959 12.9624C36.4172 14.4803 36.7174 16.1105 36.6777 17.7502C36.59 21.2129 35.2589 24.5283 32.9277 27.0902"
          fill="#1A1A1A"
        />
        <text x="50%" y="55%" fontSize="1.8rem" textAnchor="middle">
          {cluster.properties.point_count}
        </text>
      </g>
    </svg>
  );
};

export default CityPin;
