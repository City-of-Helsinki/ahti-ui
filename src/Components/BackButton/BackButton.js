import React from 'react';

import styled from 'styled-components';

const Button = styled.button`
  position: relative;
  height: 3vh;
  top: -63vh;
  margin-bottom: -3vh;
`;
export default onBack => {
  return <Button onClick={() => onBack()}>back</Button>;
};
