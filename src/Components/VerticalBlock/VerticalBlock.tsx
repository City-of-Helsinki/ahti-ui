import styled from 'styled-components';
import { PROMOTIONS_features_edges_node_properties_images } from '../../domain/api/generatedTypes/PROMOTIONS';
import { getFirstImageUrl } from '../../common/utils/images';

interface VerticalBlockProps {
  readonly images?: PROMOTIONS_features_edges_node_properties_images[];
}

const VerticalBlock = styled.div<VerticalBlockProps>`
  position: relative;
  background-color: ${props => props.theme.colors.white};

  background-image: url(${props =>
    props.images ? getFirstImageUrl(props.images) : null});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;

  box-sizing: border-box;
  height: 31rem;
  width: 20rem;
  // hack for now
  width: 100%;
  margin-right: 1rem;

  color: ${props =>
    props.images ? props.theme.colors.white : props.theme.colors.black};

  padding: 4rem 2rem;
  box-shadow: inset 0px -200px 202px -140px rgba(0, 0, 0, 0.85);

  // TODO: refactor later!!!!!
  // flex most likely wont work on most mobile devices, refactor this later
  display: flex;
  justify-content: flex-end;
  flex-direction: column;

  h2 {
    display: inline;
    margin: 0;
    width: 100%;
    color: ${props =>
      props.images ? props.theme.colors.white : props.theme.colors.black};
  }
`;

export default VerticalBlock;
