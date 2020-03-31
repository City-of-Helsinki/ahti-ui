import React from 'react';

export interface AhtiLogo {
  readonly fillColor: '#001A33' | 'white';
}

const AhtiLogo: React.FC<AhtiLogo> = ({ fillColor }) => {
  return (
    <svg
      width="56"
      height="22"
      viewBox="0 0 56 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Ahti"
      focusable="false"
    >
      <g clip-path="url(#clip0)">
        <path
          d="M17.5569 13.93L12.7444 0H7.24438L2.50063 13.93L0.0256348 21.14C0.644385 21.56 1.40063 21.84 2.22563 21.84C3.11938 21.84 3.87563 21.56 4.56313 21.07L5.93813 16.87H13.8444L13.9819 17.29L15.1506 20.79C15.8381 21.49 16.8006 21.91 17.8319 21.91C18.6569 21.91 19.3444 21.7 19.9631 21.28L17.5569 13.93ZM9.10063 7.28C9.51313 6.02 9.92563 4.41 9.92563 4.41H9.99438C9.99438 4.41 10.4069 6.02 10.8194 7.28L12.6756 13.02H7.24438L9.10063 7.28Z"
          fill={fillColor}
        />
        <path
          d="M51.8606 0C50.4169 0 49.3169 1.05 49.3169 2.52C49.3169 3.99 50.4169 5.04 51.8606 5.04C53.3044 5.04 54.4044 3.99 54.4044 2.52C54.4044 1.05 53.3044 0 51.8606 0Z"
          fill={fillColor}
        />
        <path
          d="M54.0606 5.95007V21.1401C53.4419 21.5601 52.6856 21.8401 51.8606 21.8401C51.0356 21.8401 50.2794 21.5601 49.6606 21.1401V5.95007H54.0606Z"
          fill={fillColor}
        />
        <path
          d="M47.5516 20.44C47.0016 20.93 45.5578 21.84 43.7703 21.84C41.0203 21.84 39.3016 20.44 39.3016 17.01V9.31H36.7578V5.95H39.3016V2.45L43.5641 0V5.95H47.0703V9.38H43.5641V16.66C43.5641 17.92 43.9078 18.27 44.6641 18.27C45.2828 18.27 45.6953 17.64 45.9016 17.29L47.5516 20.44Z"
          fill={fillColor}
        />
        <path
          d="M25.6275 8.33C26.3838 6.86 27.6213 5.53 30.165 5.53C33.19 5.53 35.0463 7.7 35.0463 11.62V20.86C34.3588 21.42 33.465 21.84 32.5025 21.84C31.815 21.84 31.1963 21.7 30.6463 21.35V12.53C30.6463 10.43 29.9588 9.31 28.3088 9.31C26.6588 9.31 25.6275 10.57 25.6275 12.39V21.7C25.3525 21.77 25.0088 21.84 24.7338 21.84C23.2213 21.84 21.915 20.93 21.2275 19.67V0H25.6275V8.33Z"
          fill={fillColor}
        />
      </g>
      <defs>
        <clipPath id="clip0">
          <rect
            width="55"
            height="22"
            fill="white"
            transform="translate(0.0256348)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default AhtiLogo;
