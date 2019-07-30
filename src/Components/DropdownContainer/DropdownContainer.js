import React, { useState } from 'react';
import { ReactComponent as AhtiLogo } from '../../assets/icons/ahti_logo.svg';
import { ReactComponent as MenuLogo } from '../../assets/icons/menu.svg';
import Dropdown from '../../Components/Dropdown/Dropdown';
import UnstyledLink from '../../Components/UnstyledLink/UnstyledLink';
import BaseButton from '../../Components/BaseButton/BaseButton';
import { useTranslation } from 'react-i18next';

import styled from 'styled-components';

const TitleContainer = styled.div`
  z-index: 2000;
  position: absolute;
  top: 1rem;
  left: 1rem;

  background-color: ${props => props.theme.colors.white};
  box-shadow: 2px 4px 8px 2px rgba(0, 0, 0, 0.15);
  border-radius: 30% / 50%;
  padding: 1.5rem;
`;

const MenuButton = styled(BaseButton)`
  z-index: 2000;
  position: absolute;
  top: 1rem;
  right: 2rem;

  background-color: ${props => props.theme.colors.white};
  box-shadow: 2px 4px 8px 2px rgba(0, 0, 0, 0.15);
  border-radius: 50%;
  width: 5rem;
  height: 5rem;
`;

const DropdownContainer = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const { t, i18n } = useTranslation();
  return (
    <React.Fragment>
      {menuOpen && (
        <Dropdown
          onExit={() => {
            document.body.style.overflowY = 'scroll';
            setMenuOpen(false);
          }}
          onLanguageFI={() => i18n.changeLanguage('fi')}
          onLanguageEN={() => i18n.changeLanguage('en')}
        />
      )}
      {!menuOpen && (
        <React.Fragment>
          <UnstyledLink to="/">
            <TitleContainer>
              <AhtiLogo />
            </TitleContainer>
          </UnstyledLink>
          <MenuButton
            onClick={() => {
              document.body.style.overflowY = 'hidden';
              setMenuOpen(true);
            }}
          >
            <MenuLogo />
          </MenuButton>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default DropdownContainer;
