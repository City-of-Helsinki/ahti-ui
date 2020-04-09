import React from 'react';
import Slider from 'react-slick';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

import '../Slider.scss';
import { CommonSliderProps } from '../Slider';
import { Filter } from '../../../../../alltypes';
import Slide from '../Slide/Slide';

export type ContentSliderItem = {
  readonly categoryFilters: Filter[];
  readonly tagFilters: Filter[];
  readonly title: string;
  readonly imageUrl: string;
};

export interface ContentSliderProps extends CommonSliderProps {
  readonly className?: string;
  readonly items: ContentSliderItem[];
  readonly translated?: boolean;
  onClick?(item: ContentSliderItem): void;
}

const ContentSlider: React.FC<ContentSliderProps> = ({
  className,
  slideClassName,
  items,
  translated,
  onClick,
  infinite = false,
  initialSlide = 0,
  slidesToScroll = 1,
  slidesToShow = 2,
  speed = 500,
}) => {
  const sliderSettings = {
    arrows: true,
    initialSlide: initialSlide,
    infinite: infinite,
    speed: speed,
    slidesToShow: slidesToShow,
    slidesToScroll: slidesToScroll,
  };

  const { t } = useTranslation();

  return (
    <div className={classNames(className, 'commonSlider')}>
      <Slider {...sliderSettings}>
        {items.map((item: ContentSliderItem, id: number) => (
          <Slide
            key={id}
            imageUrl={item.imageUrl}
            className={slideClassName}
            onClick={() => onClick && onClick(item)}
          >
            <p>{translated ? t(item.title) : item.title}</p>
          </Slide>
        ))}
      </Slider>
    </div>
  );
};

export default ContentSlider;
