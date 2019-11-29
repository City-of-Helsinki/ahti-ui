import React, { useCallback, useEffect, useState } from 'react';
import styles from './Filter.module.scss';
import { ReactComponent as Checkmark } from '../../assets/icons/checkmark.svg';
import { useTranslation } from 'react-i18next';

export interface FilterOptions<T> {
  type: string;
  items: T[];
}

export interface FilterProps<T> {
  readonly type: string;
  readonly options: FilterOptions<T>[];
  onShow(selectedFilters: T[]): void;
  countMatches(selectedFilters: T[]): number;
}

function Filter<T>({ type, options, onShow, countMatches }: FilterProps<T>) {
  const { t } = useTranslation();
  const [selected, setSelected] = useState<Set<T>>(new Set());
  const onToggle = (toggleItem: T) => {
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
        {matches > 0
          ? `${t('filter.show')} ${matches}`
          : t('filter.no_matches')}
      </button>
    );
  };
  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <div>{t('filter.title')}</div>
        <div>{type}</div>
      </div>
      <div className={styles.optionContainer}>
        {options.map((option, id) => (
          <div key={id}>
            <div>{option.type}</div>
            <div>
              {option.items.map((item, id) => (
                <button
                  key={id}
                  onClick={() => onToggle(item)}
                  className={
                    selected.has(item)
                      ? styles.activeButton + ' filterOption'
                      : 'filterOption'
                  }
                >
                  {selected.has(item) && <Checkmark />}
                  {item}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className={styles.footerContainer}>
        <button
          className={styles.clearButton}
          onClick={() => setSelected(new Set())}
        >
          {t('filter.clear')}
        </button>
        {showButton()}
      </div>
    </div>
  );
}

export default Filter;
