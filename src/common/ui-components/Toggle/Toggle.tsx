import React, { ReactNode } from 'react';
import classNames from 'classnames/bind';

import styles from './Toggle.module.scss';

const cx = classNames.bind(styles);

export interface ToggleProps {
  readonly className?: string;
  readonly onIcon: ReactNode;
  readonly offIcon: ReactNode;
  readonly toggleState: boolean;
  onToggle(): void;
}

const Toggle: React.FC<ToggleProps> = ({
  className,
  onToggle,
  toggleState,
  onIcon,
  offIcon
}) => {
  return (
    <div className={cx(styles.container, className)} onClick={() => onToggle()}>
      <div className={cx(styles.toggle, { toggleOn: toggleState })}>
        {onIcon}
      </div>
      <div className={cx(styles.toggle, { toggleOn: !toggleState })}>
        {offIcon}
      </div>
    </div>
  );
};

export default Toggle;
