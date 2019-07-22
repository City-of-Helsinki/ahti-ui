import styled from 'styled-components';

const CardImageContainer = styled.div`
  box-sizing: border-box;
  position: relative;
  width: 100%;
  min-height: 30vh;
  max-height: 30vh;
  padding: 2.5rem 2.2rem;

  background-image: url(${props => props.imageURL || null});
  background-repeat: no-repeat;
  background-size: cover;

  box-shadow: ${props =>
    props.imageURL ? `inset 4rem 7rem 21rem 0.5rem rgba(0,0,0,0.75)` : null};

  color: ${props =>
    props.imageURL ? props.theme.colors.white : props.theme.colors.black};

  p {
    margin-top: -1rem;
  }
`;
export default CardImageContainer;
