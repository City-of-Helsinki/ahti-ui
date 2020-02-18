import React, { useState } from 'react';
import { IconCheck, IconClose } from 'hds-react/lib';
import classNames from 'classnames/bind';
import styles from './Filter.module.scss';

const cx = classNames.bind(styles);

export interface FilterItem<T> {
  readonly name: string;
  readonly key: T;
}

export interface FilterOptions<T> {
  readonly type: string;
  readonly items: FilterItem<T>[];
}

export interface FilterProps<T> {
  readonly title?: string;
  readonly show?: string;
  readonly noMatches?: string;
  readonly clear?: string;
  readonly className?: string;
  readonly type: string;
  readonly options: FilterOptions<T>[];
  onShow(selectedFilters: T[]): void;
  onClose(): void;
  countMatches(selectedFilters: T[]): number;
}

export type FilterI<T = any> = React.FC<FilterProps<T>>;

const Filter: FilterI = ({
  title = 'Filters',
  show = 'Show',
  noMatches = 'No matches',
  clear = 'Clear',
  className,
  type,
  options,
  onShow,
  onClose,
  countMatches
}) => {
  const [selected, setSelected] = useState<Set<any>>(new Set());

  const onToggle = (toggleItem: any) => {
    const newSelection = new Set(selected);
    if (selected.has(toggleItem)) {
      newSelection.delete(toggleItem);
    } else {
      newSelection.add(toggleItem);
    }
    setSelected(newSelection);
  };

  const showButton = () => {
    const matches = countMatches(Array.from(selected));
    return (
      <button
        className={matches > 0 ? styles.showButton : styles.showButtonDisabled}
        onClick={() => onShow(Array.from(selected))}
        disabled={matches === 0}
      >
        {matches > 0 ? `${show} ${matches}` : noMatches}
      </button>
    );
  };

  return (
    <div className={cx(styles.container, className)}>
      <div>
        <div className={styles.headerContainer}>
          <button onClick={() => onClose()} className={styles.closeButton}>
            <IconClose className={styles.icons} />
          </button>
          <div className={styles.textContainer}>
            <div className={styles.filterTitle}>{title}</div>
            <div className={styles.filterType}>{type}</div>
          </div>
        </div>
        <div className={styles.optionContainer}>
          {options.map((option, id) => (
            <div className={styles.filterOptionContainer} key={id}>
              <div>{option.type}</div>
              <div>
                {option.items.map((item, id) => (
                  <button
                    key={id}
                    onClick={() => onToggle(item.key)}
                    className={cx(styles.filterOption, {
                      activeButton: selected.has(item.key)
                    })}
                  >
                    {selected.has(item.key) && (
                      <IconCheck
                        className={cx(styles.icons, styles.iconsCheck)}
                      />
                    )}
                    {item.name}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.footerContainer}>
        <button
          className={styles.clearButton}
          onClick={() => setSelected(new Set())}
        >
          {clear}
        </button>
        {showButton()}
      </div>
    </div>
  );
};

export default Filter;
