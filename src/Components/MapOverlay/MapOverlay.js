import styled from 'styled-components';
import SecondaryTitle from '../SecondaryTitle/SecondaryTitle';
import mapImage from '../../assets/map_placeholder.png';

const MapOverlay = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 38rem;
  max-height: 38rem;
  padding: 2rem 1.75rem 6rem 1.75rem;
  background-image: url(${mapImage});
  background-size: cover;

  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  flex-direction: column;

  ${SecondaryTitle} {
    max-width: 80%;
  }
`;

export default MapOverlay;
