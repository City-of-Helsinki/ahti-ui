import React, { useEffect, useRef, useState } from 'react';
import styles from './Search.module.scss';
import { useTranslation } from 'react-i18next';
import mapData from '../../data/mapData.json';
import { escapeRegExp } from 'lodash';
import { useHistory } from 'react-router-dom';

import searchIcon from '../../assets/icons/search.svg';
import exitIcon from '../../assets/icons/cross.svg';

const features = mapData.features;

export interface SearchData {
  readonly name: string;
  readonly location: string;
  readonly type: string;
}

interface SearchItemProps extends SearchData {
  readonly matchedPart: string;
  onSelect(item: string): void;
}

export const SearchItem: React.FC<SearchItemProps> = props => {
  const re = new RegExp(`(${escapeRegExp(props.matchedPart)})`, 'gi');
  const parts = props.name.split(re);

  return (
    <div
      className={styles.searchItem}
      onClick={() => props.onSelect(props.name)}
    >
      <img
        src={`/icons/type/${props.type}.svg`}
        alt="info image"
        className={styles.infoImage}
      />
      <div className={styles.infoContainer}>
        <div className={styles.name}>
          {parts.map((part, i) =>
            re.test(part) ? (
              <mark key={i}>{part}</mark>
            ) : (
              <span key={i}>{part}</span>
            )
          )}
        </div>
        <div className={styles.address}>{props.location}</div>
      </div>
    </div>
  );
};

interface SearchProps {
  readonly data: SearchData[];
  onClose(): void;
  onSelect(item: string): void;
}

const Search: React.FC<SearchProps> = ({ data, onClose, onSelect }) => {
  const [currentSearch, setCurrentSearch] = useState<string>('');
  const inputRef = useRef<any>(null);

  useEffect(() => {
    if (inputRef) {
      inputRef.current.focus();
    }
  });

  return (
    <div className={styles.container}>
      <div className={styles.search}>
        <img src={exitIcon} alt="close" onClick={() => onClose()} />
        <div className={styles.searchInputWithIcon}>
          <input
            ref={inputRef}
            type="text"
            onChange={event => setCurrentSearch(event.target.value)}
            className={styles.searchInput}
          />
          <img src={searchIcon} alt="search" />
        </div>
      </div>
      {currentSearch === '' && (
        <>
          <p>{'Viimeisimmät'}</p>
          <p>{'Suosittelemme'}</p>
        </>
      )}
      {currentSearch !== '' &&
        data
          .filter((item: SearchData) =>
            item.name.toLowerCase().includes(currentSearch.toLowerCase())
          )
          .map((item: SearchData, id: number) => (
            <SearchItem
              key={id}
              {...item}
              matchedPart={currentSearch}
              onSelect={onSelect}
            />
          ))}
    </div>
  );
};

export const SearchWithHistoryHook: React.FC = () => {
  const history = useHistory();
  const { i18n } = useTranslation();

  const data: SearchData[] = features.map((feature: any) => {
    const name = feature.properties[i18n.language].name;
    const location = feature.properties.address;
    const type = feature.properties.type;
    return { name, location, type };
  });
  return (
    <Search
      data={data}
      onClose={() => history.goBack()}
      onSelect={name => history.push(`/map?name=${name}`)}
    />
  );
};

export default Search;
