import styled from 'styled-components';
import LinkBox from '../LinkBox/LinkBox';
import BodyText from '../BodyText/BodyText';
import { PROMOTIONS_features_edges_node_properties_images } from '../../domain/api/generatedTypes/PROMOTIONS';
import { getFirstImageUrl } from '../../common/utils/images';

interface SectionProps {
  readonly images?: PROMOTIONS_features_edges_node_properties_images[];
  readonly widthShadow?: boolean;
}

const Section = styled.section<SectionProps>`
  box-sizing: border-box;
  width: 100%;
  min-height: 25rem;

  padding: 4rem 2rem;

  background-color: ${props => props.theme.colors.white};

  background-image: url(${props =>
    props.images ? getFirstImageUrl(props.images) : null});
  background-repeat: no-repeat;
  background-size: cover;

  box-shadow: ${props =>
    props.images && props.widthShadow
      ? 'inset 4rem 7rem 21rem 0.5rem rgba(0,0,0,0.5)'
      : null};

  color: ${props =>
    props.images ? props.theme.colors.white : props.theme.colors.black};
  .slick-slider {
    margin-right: -2rem;
  }

  ${BodyText} {
    margin-top: -1rem;
  }

  ${LinkBox} {
    margin-top: 1.5rem;
  }
`;

export default Section;
