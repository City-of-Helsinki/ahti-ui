import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// TODO: center title text properly
const RoundBox = styled.div`
  box-sizing: border-box;
  position: relative;
  display: block;
  width: 8rem;
  max-width: 8rem;
  height: 8rem;

  background-color: ${props => props.theme.colors.pink};
  border-radius: 50%;

  padding: 4rem;
  margin: 0;
  margin-bottom: 1rem;

  svg {
    width: 3.5rem;
    height: 3.5rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  h3 {
    width: 100%;
    text-align: center;
  }
`;

const RoundBoxWithText = ({ icon, title, pathToList }) => {
  console.log('pathToList', pathToList);
  return (
    <Link to={pathToList}>
      <RoundBox>{icon}</RoundBox>
      {title}
    </Link>
  );
};

export default RoundBoxWithText;
