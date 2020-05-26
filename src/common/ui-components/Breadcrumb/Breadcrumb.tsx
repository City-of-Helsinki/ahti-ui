import React from 'react';
import classNames from 'classnames';

import Pill from './Pill';
import styles from './Breadcrumb.module.scss';

export type BreadcrumbItem = {
  readonly name?: string;
  readonly id: string;
};

export interface BreadcrumbProps {
  readonly className?: string;
  readonly items: BreadcrumbItem[];
  readonly translations: Map<string, string>;
  onClose(id: string): void;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  className,
  items,
  onClose,
  translations,
}) => {
  return (
    <div className={classNames(styles.container, className)}>
      {items.map((item: BreadcrumbItem, id: number) => {
        return (
          <Pill
            category={item.id}
            name={translations.get(item.id) ?? (item.name || '')}
            key={id}
            onClose={() => onClose(item.id)}
          />
        );
      })}
    </div>
  );
};

export default Breadcrumb;
