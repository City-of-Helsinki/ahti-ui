import styled from 'styled-components';

interface CardTextContainer {
  readonly imageURL?: string;
}

const CardTextContainer = styled.div<CardTextContainer>`
  box-sizing: border - box;
  padding: 2rem 2rem;
  position: relative;
  width: 100%;
  min-height: 30vh;
  background-color: ${props => props.theme.colors.white};
  color: ${props =>
    props.imageURL ? props.theme.colors.white : props.theme.colors.black};

  a {
    word-break: break-all;
    color: inherit;
  }
`;
export default CardTextContainer;
