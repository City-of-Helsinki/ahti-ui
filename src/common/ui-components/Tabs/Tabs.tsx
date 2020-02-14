import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Tabs.module.scss';
import { NonEmptyArray } from '../../../../alltypes';

const cx = classNames.bind(styles);

interface TabProps {
  readonly title: string;
  readonly children: React.ReactNode;
  readonly disabled?: boolean;
}

const Tab: React.FC<TabProps> = () => {
  throw new Error(
    '`Tab` components are not meant to be rendered ' +
      'and should only be used as direct children of `Tabs`.'
  );
};

interface TabsProps {
  readonly children: NonEmptyArray<React.ReactElement<TabProps>>;
}

const Tabs: React.FC<TabsProps> = ({ children }) => {
  const [selected, setSelected] = useState(-1);

  useEffect(() => {
    if (
      selected === -1 ||
      selected >= children.length ||
      children[selected].props.disabled
    ) {
      setSelected(children.findIndex(child => !child.props.disabled));
    }
  }, [children, selected]);

  const renderLink = (child: React.ReactElement<TabProps>, id: number) => {
    return (
      <button
        key={id}
        className={cx({
          unselected: selected !== id,
          disabled: child.props.disabled
        })}
        onClick={() => setSelected(id)}
        role={'tab'}
        disabled={child.props.disabled}
      >
        {child.props.title}
      </button>
    );
  };

  const renderContent = (child: React.ReactElement<TabProps>, id: number) => {
    return (
      <div
        key={id}
        className={cx({ tabItem: true, unselected: selected !== id })}
        role={'tabpanel'}
      >
        {child.props.children}
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.navigation} role={'tablist'}>
        {children.map(renderLink)}
      </div>
      <div className={styles.tabContentContainer}>
        {children.map(renderContent)}
      </div>
    </div>
  );
};

export { Tab, Tabs };
