import styled from 'styled-components';

const MapWrapper = styled.div`
  box-sizing: border-box;
  position: absolute;
  width: 100%;
  min-height: 100vh;

  // todo: fix this later;

  .map {
    width: 100%;
    height: 100% !important;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }

  button {
    position: absolute;
    bottom: 0;
    z-index: 100000000;
  }
`;

export default MapWrapper;
