import React from 'react';
import classNames from 'classnames';

import styles from './ClusterIcon.module.scss';

interface ClusterIconProps {
  readonly pointCount: number;
  onClick?(): void;
}

const ClusterIcon: React.FC<ClusterIconProps> = ({ pointCount, onClick }) => {
  return (
    <svg
      width="41px"
      height="43px"
      viewBox="0 0 41 43"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      transform="translate(-20.5, -21.5)"
      onClick={onClick}
    >
      <g
        id="Map-View-Design"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <g
          id="cluster-pin-1"
          transform="translate(-24.000000, -17.000000)"
          fill="#E9F1F6"
          fillRule="nonzero"
          stroke="#000000"
          strokeWidth="2"
        >
          <g id="Group" transform="translate(25.000000, 18.000000)">
            <path
              d="M3.17360696,27.4548271 L3.17360696,27.4533035 C-0.929034857,22.6709156 -1.17209981,15.7471941 3.13677894,11.3380732 C5.23597627,9.19902494 8.05700287,8 11.0032448,8 C13.942121,8 16.7705132,9.19902494 18.862345,11.3373115 C23.1712237,15.7471941 22.9281588,22.6716774 18.8328825,27.4533035 L18.8328825,27.4533035 C14.9512089,31.9850693 12.6163122,35.0687116 10.9958791,38 C9.38281172,35.0489056 7.03318382,31.9850693 3.17360696,27.4548271 Z"
              id="Path"
            ></path>
            <path
              d="M23.5965875,29.5638617 L23.5965875,29.5626428 C20.2398806,25.7367325 20.0410092,20.1977553 23.5664555,16.6704586 C25.2839806,14.9592199 27.5920933,14 30.0026548,14 C32.4071899,14 34.721329,14.9592199 36.4328277,16.6698492 C39.9582739,20.1977553 39.7594026,25.7373419 36.4087221,29.5626428 L36.4087221,29.5626428 C33.2328073,33.1880555 31.3224372,35.6549693 29.9966284,38 C28.676846,35.6391245 26.7544231,33.1880555 23.5965875,29.5638617 Z"
              id="Path-Copy-10"
            ></path>
            <path
              d="M11.3086849,25.539 L11.3086849,25.537 C5.73868488,19.259 5.40868488,10.17 11.2586849,4.382 C14.1086849,1.574 17.9386849,2.48689958e-14 21.9386849,2.48689958e-14 C25.9286849,2.48689958e-14 29.7686849,1.574 32.6086849,4.381 C38.4586849,10.17 38.1286849,19.26 32.5686849,25.537 L32.5686849,25.537 C27.2986849,31.486 24.1286849,35.534 21.9286849,39.382 C19.7386849,35.508 16.5486849,31.486 11.3086849,25.539 Z"
              id="Path-Copy-9"
            ></path>
            <text x="22" y="20">
              <tspan
                className={classNames(styles.clusterText)}
                textAnchor="middle"
              >
                {pointCount}
              </tspan>
            </text>
          </g>
        </g>
      </g>
    </svg>
  );
};

export default ClusterIcon;
