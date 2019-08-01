import styled from 'styled-components';
import mapImage from '../../assets/map_placeholder.png';

const MapOverlay = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 33rem;
  max-height: 33rem;
  padding: 2rem 1.75rem;
  background-image: url(${mapImage});
  background-size: cover;

  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  flex-direction: column;
`;

export default MapOverlay;
