import React, { useEffect, useRef, useState } from 'react';
import styles from './Search.module.scss';
import { useTranslation } from 'react-i18next';
import mapData from '../../data/mapData.json';
import { escapeRegExp } from 'lodash';
import { useHistory } from 'react-router-dom';

import searchIcon from '../../assets/icons/search.svg';
import exitIcon from '../../assets/icons/cross.svg';

const features = mapData.features;

interface MapData {
  readonly name: string;
  readonly location: string;
  readonly type: string;
}

interface SearchItem extends MapData {
  readonly matchedPart: string;
}

const SearchItem: React.FC<SearchItem> = props => {
  const re = new RegExp(`(${escapeRegExp(props.matchedPart)})`, 'gi');
  const parts = props.name.split(re);

  let history = useHistory();

  return (
    <div
      className={styles.searchItem}
      onClick={() => history.push(`/map?name=${props.name}`)}
    >
      <img
        src={`/icons/type/${props.type}.svg`}
        alt="info image"
        style={{
          height: 30,
          width: 30,
          cursor: 'pointer',
        }}
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

const Search: React.FC = () => {
  const [currentSearch, setCurrentSearch] = useState<string>('');
  const { i18n } = useTranslation();
  const history = useHistory();

  const inputRef = useRef<any>(null);
  useEffect(() => {
    if (inputRef) {
      inputRef.current.focus();
    }
  });

  const data: MapData[] = features.map((feature: any) => {
    const name = feature.properties[i18n.language].name;
    const location = feature.properties.address;
    const type = feature.properties.type;
    return { name, location, type };
  });

  return (
    <div className={styles.container}>
      <div className={styles.search}>
        <img src={exitIcon} alt="close" onClick={() => history.goBack()} />
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
          .filter((place: MapData) =>
            place.name.toLowerCase().includes(currentSearch.toLowerCase())
          )
          .map((place: MapData) => (
            <SearchItem {...place} matchedPart={currentSearch} />
          ))}
    </div>
  );
};

export default Search;
