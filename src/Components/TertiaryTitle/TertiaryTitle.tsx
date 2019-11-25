import styled from 'styled-components';

const TertiaryTitle = styled.h3`
  font-size: 14px;
  font-family: ${props => props.theme.fonts.fontFamilyRegular};
  line-height: 1.25;
  text-align: center;
  font-weight: 400;
  color: ${props => props.theme.colors.black};
`;

export default TertiaryTitle;
