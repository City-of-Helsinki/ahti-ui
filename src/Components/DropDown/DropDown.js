import React from 'react';
import { Link } from 'react-router-dom';
import BodyText from '../BodyText/BodyText';
import BaseButton from '../BaseButton/BaseButton';

import { ReactComponent as Exit } from '../../assets/icons/exit.svg';

import styled from 'styled-components';

const Container = styled.div`
  background-color: ${props => props.theme.colors.white};
  position: absolute;
  z-index: 5000;
  height: 80vh;
  min-width: 100%;
  padding-top: 1rem;

  ${BodyText} {
    color: ${props => props.theme.colors.black};
  }
`;

const TextSection = styled.section`
  padding: 1.5rem 2rem;
`;

const ExitButton = styled(BaseButton)`
  z-index: 10000;
  top: 2rem;
  right: 2rem;
  position: absolute;
`;

const Line = styled.hr`
  margin: 0;
`;

const BackgroundShade = styled.div`
  position: absolute;
  top: 80vh;
  height: 20vh;
  width: 100%;
  z-index: 5000;
  background-color: rgb(0, 0, 0, 0.3);
  opacity: 50%;
`;

const DropDown = ({ onExit }) => {
  return (
    <React.Fragment>
      <ExitButton onClick={onExit}>
        <Exit />
      </ExitButton>
      <Container>
        <TextSection>
          <Link to="/">
            <BodyText>Moving around</BodyText>
          </Link>
          <Link to="/">
            <BodyText>Islands</BodyText>
          </Link>
        </TextSection>
        <Line />
        <TextSection>
          <Link to="/">
            <BodyText>Add location or service</BodyText>
          </Link>
          <Link to="/">
            <BodyText>Give feedback</BodyText>
          </Link>
        </TextSection>
        <Line />
        <TextSection>
          <Link to="/">
            <BodyText>About ahti</BodyText>
          </Link>
        </TextSection>
      </Container>
      <BackgroundShade />
    </React.Fragment>
  );
};

export default DropDown;
