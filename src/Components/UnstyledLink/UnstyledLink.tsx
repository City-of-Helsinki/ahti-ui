import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface UnstyledLinkProp {
  readonly isOpen?: boolean;
}

/**
 * A version of react-router's link without the default `a` styles.
 * There is an assumption here that the link is obvious, but that could be wrong!
 */
const UnstyledLink = styled(Link)<UnstyledLinkProp>`
  /* Remove the default link underline. */
  text-decoration: none;
`;

export default UnstyledLink;
