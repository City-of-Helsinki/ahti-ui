import styled from 'styled-components';

const SecondaryTitle = styled.h2`
  font-size: 2rem;
  display: block;
  font-family: ${props => props.theme.fonts.fontFamilyBold};
  margin-bottom: 2rem;
  line-height: 1.15;
  width: 20rem;
`;

export default SecondaryTitle;
