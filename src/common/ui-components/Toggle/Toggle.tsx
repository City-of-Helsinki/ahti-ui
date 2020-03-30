import React, { ReactNode } from 'react';
import classNames from 'classnames/bind';

import styles from './Toggle.module.scss';

const cx = classNames.bind(styles);

export interface ToggleProps {
  readonly className?: string;
  readonly onIcon: ReactNode;
  readonly onIconText?: string;
  readonly offIcon: ReactNode;
  readonly offIconText?: string;
  readonly toggleState: boolean;
  onToggle(): void;
}

const Toggle: React.FC<ToggleProps> = ({
  className,
  onToggle,
  toggleState,
  onIcon,
  onIconText,
  offIcon,
  offIconText,
}) => {
  return (
    <div>
      <div className={cx(styles.container, className)}>
        <button
          className={cx(styles.toggle, { toggleOn: toggleState })}
          onClick={() => onToggle()}
        >
          <div className={styles.iconContainer}>{onIcon}</div>
          <div className={styles.text}>{onIconText}</div>
        </button>
        <button
          className={cx(styles.toggle, { toggleOn: !toggleState })}
          onClick={() => onToggle()}
        >
          <div className={styles.iconContainer}>{offIcon}</div>
          <div className={styles.text}>{offIconText}</div>
        </button>
      </div>
    </div>
  );
};

export default Toggle;
