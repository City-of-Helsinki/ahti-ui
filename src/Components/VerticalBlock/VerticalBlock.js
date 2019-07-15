import styled from 'styled-components';

const VerticalBlock = styled.div`
  background-color: ${props => props.theme.colors.white};

  background-image: url(${props => (props.withImage ? props.imageURL : null)});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;

  box-sizing: border-box;
  height: 28rem;
  width: 20rem;
  margin-right: -1rem;

  color: ${props =>
    props.withImage ? props.theme.colors.white : props.theme.colors.black};

  padding: 4rem 2rem;
`;

export default VerticalBlock;
