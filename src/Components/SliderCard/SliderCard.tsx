import React, { memo } from 'react';
import { LazyImage } from 'react-lazy-images';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import SecondaryTitle from '../SecondaryTitle/SecondaryTitle';
import BodyText from '../BodyText/BodyText';
import UnstyledLink from '../UnstyledLink/UnstyledLink';
import TypeTitle from '../TypeTitle/TypeTitle';
import { getFirstImageUrl } from '../../common/utils/images';

interface ContainerProps {
  readonly imageURL?: string;
}

const Container = styled.div<ContainerProps>`
  box-sizing: border-box;
  width: 100%;
  height: 8rem;
  padding: 1.5rem 2rem;

  background-image: url(${props => props.imageURL || null});
  background-color: ${props => props.theme.colors.lightGray};
  background-repeat: no-repeat;
  background-size: cover;

  box-shadow: ${props =>
    props.imageURL ? `inset 4rem 7rem 21rem 0.5rem rgba(0,0,0,0.75)` : null};

  color: ${props => props.theme.colors.white};

  .slick-slider {
    margin-right: -2rem;
  }

  ${SecondaryTitle} {
    margin-top: 0.7rem;
    margin-bottom: 1rem;
    max-width: 100%;
    font-size: 1.7rem;
  }

  /* Enhance to a larger card size on taller screens */
  @media screen and (min-height: 32rem) {
    & {
      height: 16rem;
    }
  }
`;

const SliderCard = ({
  point,
  query,
}: {
  readonly point: any;
  readonly query: string;
}) => {
  const { t } = useTranslation();
  const imageURL = getFirstImageUrl(point.properties.images);
  return (
    <UnstyledLink
      to={{
        pathname: '/map',
        search: query,
      }}
    >
      {'IntersectionObserver' in window && (
        <LazyImage
          src={imageURL}
          placeholder={({ ref }) => (
            <Container ref={ref}>
              {point.properties.name && (
                <BodyText>{point.properties.name}</BodyText>
              )}
              <TypeTitle>{t(`types.${point.properties.type}`)}</TypeTitle>
            </Container>
          )}
          actual={() => (
            <Container imageURL={imageURL}>
              {point.properties.name && (
                <BodyText>{point.properties.name}</BodyText>
              )}
              <TypeTitle>{t(`types.${point.properties.type}`)}</TypeTitle>
            </Container>
          )}
        />
      )}
      {!('IntersectionObserver' in window) && (
        <Container imageURL={imageURL}>
          {point.properties.name && (
            <BodyText>{point.properties.name}</BodyText>
          )}
          <TypeTitle>{t(`types.${point.properties.type}`)}</TypeTitle>
        </Container>
      )}
    </UnstyledLink>
  );
};

export default memo(SliderCard);
