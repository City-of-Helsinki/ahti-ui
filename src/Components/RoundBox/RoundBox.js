import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const RoundBox = styled.div`
  margin: auto;
  margin-bottom: 1rem;
  background-color: ${props => props.theme.colors.pink};
  border-radius: 50%;
  height: 8rem;
  width: 8rem;

  svg {
    width: 4rem;
    height: 4rem;
    transform: translate(50%, 50%);
  }
`;

const RoundBoxWithText = ({ icon, title, pathToList }) => {
  return (
    <Link to={pathToList}>
      <RoundBox>{icon}</RoundBox>
      {title}
    </Link>
  );
};

export default RoundBoxWithText;
