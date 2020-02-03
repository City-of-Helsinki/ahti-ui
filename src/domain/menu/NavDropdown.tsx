import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './NavDropdown.module.scss';
import { IconAngleRight } from 'hds-react';

const cx = classNames.bind(styles);

interface NavDropdownProps {
  readonly title: string;
  readonly icon: React.ReactElement;
  readonly initiallyOpen?: boolean;
}

const NavDropdown: React.FC<NavDropdownProps> = ({
  title,
  icon,
  initiallyOpen = false,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(initiallyOpen);

  return (
    <div className={styles.container}>
      <div
        className={styles.headerContainer}
        onClick={() => setIsOpen(!isOpen)}
      >
        {React.cloneElement(icon, { className: styles.icon })}
        <h1>{title}</h1>
        <IconAngleRight
          className={cx({
            icon: true,
            angleIconOpen: isOpen,
            angleIconClosed: !isOpen,
          })}
        />
      </div>
      {isOpen && <div className={styles.childrenContainer}>{children}</div>}
    </div>
  );
};

export default NavDropdown;
