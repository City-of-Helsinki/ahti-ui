import React from 'react';
import classNames from 'classnames';

import ListViewCard from './ListViewCard';
import { Feature } from '../../../domain/api/generated/types.d';
import styles from './ListView.module.scss';

export interface ListViewProps {
  readonly className?: string;
  readonly features: Feature[];
  onClick?(feature: Feature): void;
}

const ListView: React.FC<ListViewProps> = ({
  className,
  features,
  onClick,
}) => {
  return (
    <div className={classNames(className)}>
      {features.length > 0 && <hr className={styles.line} />}
      {features.map((feature: Feature, id: number) => {
        return (
          <React.Fragment key={id}>
            <ListViewCard
              key={id}
              feature={feature}
              onClick={() => onClick && onClick(feature)}
            />
            <hr className={styles.line} />
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default ListView;
