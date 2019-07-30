import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import BodyText from '../BodyText/BodyText';
import BaseButton from '../BaseButton/BaseButton';
import { ReactComponent as Menu } from '../../assets/icons/menu.svg';
import { ReactComponent as Exit } from '../../assets/icons/exit.svg';

import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
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
  height: 80vh;
  width: 100%;
  padding-top: 1rem;
  overflow: hidden;

  ${BodyText} {
    color: ${props => props.theme.colors.black};
  }
`;

const TextSection = styled.div`
  padding: 1.5rem 2rem;
`;

const Line = styled.hr`
  margin: 0;
`;

const BackDrop = styled.div`
  display: ${props => !props.isOpen && 'none'};
  /* Play the animation when the display changes from none to initial */
  animation: ${fadeIn} 0.4s ease-in-out;
  position: absolute;
  height: 100vh;
  width: 100%;
  z-index: 4999;
  background-color: rgb(0, 0, 0, 0.3);
`;

const LanguageButton = styled(BaseButton)`
  padding: 1rem;
  font-size: 1.4rem;
  font-weight: ${props => (props.isActive ? 600 : 400)};
`;

const MenuButton = styled(BaseButton)`
  z-index: 5001;
  position: absolute;
  top: 1rem;
  right: 2rem;

  background-color: ${props => props.theme.colors.white};
  border-radius: 50%;
  width: 5rem;
  height: 5rem;

  /* Hide the box shadow when on top of the menu */
  box-shadow: ${props =>
    !props.isOpen && '2px 4px 8px 2px rgba(0, 0, 0, 0.15)'};

  &:focus {
    outline: 4px solid transparent;
    box-shadow: 0 0 0 4px rgba(0, 0, 0, 0.4);
  }
`;

const DropdownMenu = ({ isOpen, onOpen, onClose }) => {
  const { t, i18n } = useTranslation();

  return (
    <Container>
      <MenuButton
        isOpen={isOpen}
        onClick={isOpen ? onClose : onOpen}
        aria-expanded={isOpen}
        aria-label={t('dropdown.label')}
      >
        {isOpen ? <Exit /> : <Menu />}
      </MenuButton>
      <BackDrop isOpen={isOpen}>
        <Body>
          <TextSection>
            <LanguageButton
              onClick={() => i18n.changeLanguage('fi')}
              isActive={i18n.language === 'fi'}
            >
              fi
            </LanguageButton>
            <LanguageButton
              onClick={() => i18n.changeLanguage('en')}
              isActive={i18n.language === 'en'}
            >
              en
            </LanguageButton>
          </TextSection>
          <TextSection>
            <Link to="/">
              <BodyText>{t('dropdown.add_location')}</BodyText>
            </Link>
            <Link to="/">
              <BodyText>{t('dropdown.give_feedback')}</BodyText>
            </Link>
          </TextSection>
          <Line />
          <TextSection>
            <Link to="/">
              <BodyText>{t('dropdown.about')}</BodyText>
            </Link>
          </TextSection>
        </Body>
      </BackDrop>
    </Container>
  );
};

export default DropdownMenu;
