import wave from '../../assets/images/helsinki_wave.svg';
import yellowWave from '../../assets/images/helsinki_wave_yellow.svg';

import styled from 'styled-components';

interface HelsinkiWaveProps {
  readonly color?: 'yellow';
}

const HelsinkiWave = styled.div<HelsinkiWaveProps>`
  position: relative;
  height: 30px;
  margin-top: -30px;
  z-index: 1400;

  background-image: ${props =>
    props.color === 'yellow' ? `url(${yellowWave})` : `url(${wave})`};
  background-repeat: repeat-x;
  background-size: 50px 100%;
`;

export default HelsinkiWave;
