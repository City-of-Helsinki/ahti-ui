import React from 'react';
import { Link } from 'react-router-dom';
import BodyText from '../BodyText/BodyText';
import BaseButton from '../BaseButton/BaseButton';

import { ReactComponent as Exit } from '../../assets/icons/exit.svg';

import styled, { keyframes } from 'styled-components';

const slideIn = keyframes`
  from {
    height: 0vh;
  }
  to {
    height: 80vh;
  }
`;

const Container = styled.div`
  z-index: 5000;
  position: absolute;

  height: 100vh;
  width: 100%;
`;

const Body = styled.div`
  background-color: ${props => props.theme.colors.white};
  position: absolute;
  height: 80vh;
  width: 100%;
  padding-top: 1rem;
  animation: ${slideIn} 0.4s;
  overflow: hidden;

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
  z-index: 4999;
  background-color: rgb(0, 0, 0, 0.3);
`;

const LanguageButton = styled(BaseButton)`
  padding: 1rem;
  font-size: 1.4rem;
  font-weight: 600;
  }
`;

const DropDown = ({ onExit, onLanguageFI, onLanguageEN }) => {
  return (
    <Container>
      <ExitButton onClick={onExit}>
        <Exit />
      </ExitButton>
      <Body>
        <LanguageButton onClick={onLanguageFI}>Suomeksi</LanguageButton>
        <LanguageButton onClick={onLanguageEN}>In English</LanguageButton>
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
      </Body>
      <BackgroundShade />
    </Container>
  );
};

export default DropDown;
