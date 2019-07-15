import styled from 'styled-components';

const MapOverlay = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 33rem;
  max-height: 33rem;
  padding: 2rem 1.75rem;
  background: ${props => props.theme.gradients.blockGradient};

  // flex most likely wont work on most mobile devices, refactor this later
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
`;

export default MapOverlay;
