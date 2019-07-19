import styled from 'styled-components';

const SecondaryTitle = styled.h2`
  font-size: 1.3rem;
  display: block;
  font-family: ${props => props.theme.fonts.fontFamilyBold};
  margin-top: -1.5rem;
  line-height: 1.2;
  width: 20rem;
  opacity: 0.7;
`;

export default SecondaryTitle;
