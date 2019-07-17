import styled from 'styled-components';

const Button = styled.button`
  box-sizing: border-box;
  min-width: 13rem;
  max-width: 26rem;
  height: 3rem;

  border: ${props => props.theme.borders.buttonBorder};
  border-color: ${props =>
    props.whiteBtn ? props.theme.colors.white : props.theme.colors.black};
  color: ${props =>
    props.whiteBtn ? props.theme.colors.white : props.theme.colors.black};
  background-color: ${props => props.theme.colors.transparent};

  padding: 1rem 2rem;
  font-family: ${props => props.theme.fonts.fontFamilyBold};
  font-size: 1.3rem;
  line-height: 1.3rem;
`;

export default Button;
