import React, { useState } from 'react';
import { ReactComponent as AhtiLogo } from '../../assets/icons/ahti_logo.svg';
import { ReactComponent as Search } from '../../assets/icons/search.svg';
import DropdownMenu from '../../Components/DropdownMenu/DropdownMenu';
import UnstyledLink from '../../Components/UnstyledLink/UnstyledLink';

import styled from 'styled-components';
import BaseButton from '../../Components/BaseButton/BaseButton';

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

const SearchContainer = styled(BaseButton)`
  z-index: 5001;
  position: absolute;
  top: 1rem;
  right: 8rem;
  background-color: ${props => props.theme.colors.white};
  border-radius: 50%;
  width: 5rem;
  height: 5rem;
  &:focus {
    outline: 4px solid transparent;
    box-shadow: 0 0 0 4px rgba(0, 0, 0, 0.4);
  }
  box-shadow: 2px 4px 8px 2px rgba(0, 0, 0, 0.15);
  cursor: pointer;
`;

// TODO: Rename to Navigation
const ApplicationHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav>
      <UnstyledLink to="/">
        <TitleContainer>
          <AhtiLogo />
        </TitleContainer>
      </UnstyledLink>
      <UnstyledLink to="/search">
        <SearchContainer>
          <Search />
        </SearchContainer>
      </UnstyledLink>
      <DropdownMenu
        isOpen={menuOpen}
        onOpen={() => {
          document.body.style.overflowY = 'hidden';
          setMenuOpen(true);
        }}
        onClose={() => {
          document.body.style.overflowY = 'scroll';
          setMenuOpen(false);
        }}
      />
    </nav>
  );
};

export default ApplicationHeader;
