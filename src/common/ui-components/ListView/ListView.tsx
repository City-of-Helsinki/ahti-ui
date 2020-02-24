import React from 'react';
import ListViewCard from './ListViewCard';
import { Feature } from '../../../domain/api/generated/types.d';
import styles from './ListView.module.scss';
import classNames from 'classnames';

export interface ListViewProps {
  readonly className?: string;
  readonly features: Feature[];
}

const ListView: React.FC<ListViewProps> = ({ className, features }) => {
  return (
    <div className={classNames(styles.container, className)}>
      {features.map((feature: Feature, id: number) => {
        return (
          <React.Fragment key={id}>
            <ListViewCard key={id} feature={feature} />
            <hr className={styles.line} />
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default ListView;
