import React from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import Pill from './Pill';
import styles from './Breadcrumb.module.scss';

export type BreadcrumbItem = {
  readonly name?: string;
  readonly id: string;
};

export interface BreadcrumbProps {
  readonly className?: string;
  readonly items: BreadcrumbItem[];
  readonly translated?: boolean;
  onClose(id: string): void;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  className,
  items,
  translated = false,
  onClose
}) => {
  const { t } = useTranslation();

  return (
    <div className={classNames(styles.container, className)}>
      {items.map((item: BreadcrumbItem, id: number) => {
        return (
          <Pill
            category={
              item.id.startsWith('ahti:category:') ? item.id : undefined
            }
            name={
              translated ? t(`categories_and_tags.${item.id}`) : item.name || ''
            }
            key={id}
            onClose={() => onClose(item.id)}
          />
        );
      })}
    </div>
  );
};

export default Breadcrumb;
