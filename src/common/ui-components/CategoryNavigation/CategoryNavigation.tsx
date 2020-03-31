import React from 'react';
import Slider from 'react-slick';
import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';

import CategoryIcon from '../CategoryIcon/CategoryIcon';
import { Filter } from '../../../../alltypes';
import styles from './CategoryNavigation.module.scss';

import './CategoryNavigation.scss';

const cx = classNames.bind(styles);

export interface CategoryNavigationProps {
  readonly className?: string;
  readonly categories: Filter[];
  readonly selectedId?: string;
  readonly maxDisplayedCategories?: number;
  readonly translated?: boolean;
  onClick(categoryId: string): void;
}

const CategoryNavigation: React.FC<CategoryNavigationProps> = ({
  className,
  categories,
  selectedId,
  maxDisplayedCategories = 5,
  translated = false,
  onClick,
}) => {
  const { t, i18n } = useTranslation();
  const sliderSettings = {
    speed: 500,
    slidesToShow:
      categories.length > maxDisplayedCategories
        ? maxDisplayedCategories
        : categories.length,
    slidesToScroll: 1,
  };

  const enterPressed = (event: React.KeyboardEvent): boolean => {
    const code = event.keyCode || event.which;
    return code === 13;
  };

  return (
    <Slider
      className={cx('categoryNavigationSlider', className)}
      {...sliderSettings}
    >
      {categories.map((category, id: number) => (
        <div key={id}>
          <div
            role={'button'}
            className={cx(styles.categoryContainer, {
              categoryIconSelected: category.id === selectedId,
            })}
            onClick={() => onClick(category.id)}
            onKeyPress={(event) => enterPressed(event) && onClick(category.id)}
            tabIndex={0}
          >
            <div className={styles.categoryIconContainer}>
              <CategoryIcon category={category.id} className={styles.bigIcon} />
            </div>
            <div className={styles.categoryName}>
              {translated && i18n.exists(`categories_and_tags.${category.id}`)
                ? t(`categories_and_tags.${category.id}`)
                : category.name}
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default CategoryNavigation;
