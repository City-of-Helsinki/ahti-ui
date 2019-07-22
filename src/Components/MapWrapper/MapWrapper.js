import styled from 'styled-components';

const MapWrapper = styled.div`
  box-sizing: border-box;
  position: absolute;
  position: fixed;
  width: 100%;
  min-height: 92vh;
  top: 8vh;

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
`;

export default MapWrapper;
