import styled from 'styled-components';

const SecondaryTitle = styled.h2`
  font-size: 2rem;
  display: block;
  font-family: ${props => props.theme.fonts.fontFamilyBold};
  margin-bottom: 2rem;
  line-height: 1.25;
  width: 60%;
`;

export default SecondaryTitle;
