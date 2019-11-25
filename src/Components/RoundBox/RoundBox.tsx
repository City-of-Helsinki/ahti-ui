import React from 'react';
import styled from 'styled-components';
import UnstyledLink from '../UnstyledLink/UnstyledLink';

const RoundBox = styled.div`
  margin: auto;
  margin-bottom: 1rem;
  background-color: ${props => props.theme.colors.pink};
  border-radius: 50%;
  height: 8rem;
  width: 8rem;

  img {
    width: 4rem;
    height: 4rem;
    transform: translate(50%, 50%);
  }
`;

const RoundBoxWithText = ({
  iconURL,
  title,
  pathToList,
}: {
  iconURL: string;
  title: any;
  pathToList: string;
}) => {
  return (
    <UnstyledLink to={pathToList}>
      <RoundBox>
        <img src={iconURL} alt="logo" />
      </RoundBox>
      {title}
    </UnstyledLink>
  );
};

export default RoundBoxWithText;
