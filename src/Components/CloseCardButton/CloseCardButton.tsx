import React from 'react';
import UnstyledLink from '../UnstyledLink/UnstyledLink';
import { ReactComponent as Exit } from '../../assets/icons/exit.svg';

import styled from 'styled-components';

const Link = styled(UnstyledLink)`
  position: absolute;
  z-index: 1399;
  right: 1rem;

  padding: 1rem;

  background-color: ${props => props.theme.colors.white};
  border-radius: 50%;
  box-shadow: 2px 4px 8px 2px rgba(0, 0, 0, 0.15);
  transform: translateY(-50%);
`;

export default ({ closeCardLink }: { closeCardLink: string }) => {
  return (
    <Link to={closeCardLink}>
      <Exit />
    </Link>
  );
};
