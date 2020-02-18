import React, { useEffect, useState } from 'react';
import styles from './Search.module.scss';
import { IconClose, IconSearch } from 'hds-react';
import {
  FeatureProperties,
  useFeaturesSearchQuery
} from '../../../domain/api/generated/types.d';
import { IconLocation } from 'hds-react';
import escapeRegExp from './utils/escapeRegExp';
import classNames from 'classnames';

export interface SearchData {
  readonly id: string;
  readonly name: string;
  readonly location?: string;
  readonly category?: string;
}

interface CategoryIconProps {
  readonly category?: string;
}

const CategoryIcon: React.FC<CategoryIconProps> = ({ category }) => {
  // BE only has ahti:category:island for the time being
  // other categories are null.
  if (category === 'ahti:category:island') {
    return <IconLocation className={styles.bigIcon} />;
  } else {
    return <IconLocation className={styles.bigIcon} />;
  }
};

interface SearchItemProps extends SearchData {
  readonly currentSearch: string;
  onSelect(id: string): void;
}

export const SearchItem: React.FC<SearchItemProps> = ({
  id,
  name,
  location,
  category,
  currentSearch,
  onSelect
}) => {
  const re = new RegExp(`(${escapeRegExp(currentSearch)})`, 'gi');
  const parts = name.split(re);

  return (
    <div className={styles.searchItem} onClick={() => onSelect(id)}>
      <CategoryIcon category={category} />
      <div className={styles.infoContainer}>
        <div className={styles.name}>
          {parts.map((part: string, id: number) =>
            re.test(part) ? (
              <mark key={id} className={styles.nameMark}>
                {part}
              </mark>
            ) : (
              <span key={id}>{part}</span>
            )
          )}
        </div>
        <div className={styles.address}>{location}</div>
      </div>
    </div>
  );
};

interface SearchProps {
  readonly className?: string;
  readonly maxItems?: number;
  onSelect(id: string): void;
}

const Search: React.FC<SearchProps> = ({
  className,
  maxItems = 20,
  onSelect
}) => {
  const { data } = useFeaturesSearchQuery();
  const [searchResults, setSearchResults] = useState<SearchData[]>([]);
  const [currentSearch, setCurrentSearch] = useState<string>('');

  useEffect(() => {
    if (data && data.features && currentSearch !== '') {
      const properties = data.features.edges.reduce((acc, edge) => {
        if (edge && edge.node && edge.node.properties) {
          return [...acc, edge.node.properties];
        }
        return acc;
      }, []);
      setSearchResults(
        properties
          .map((property: FeatureProperties) => {
            return {
              id: property.ahtiId,
              name: property.name,
              location: property?.contactInfo?.address?.municipality,
              category: property.category?.id
            };
          })
          .filter((searchResult: SearchData) =>
            searchResult.name
              .toLowerCase()
              .includes(currentSearch.toLowerCase())
          )
          .slice(0, maxItems)
      );
    } else {
      setSearchResults([]);
    }
  }, [currentSearch, data]);

  return (
    <div className={classNames(styles.container, className)}>
      <div className={styles.search}>
        <div className={styles.searchInputWithIcon}>
          <IconSearch className={styles.bigIcon} />
          <input
            type="text"
            value={currentSearch}
            className={styles.searchInput}
            onChange={event => setCurrentSearch(event.target.value)}
          />
          <button aria-label="close" onClick={() => setCurrentSearch('')}>
            <IconClose className={styles.bigIcon} />
          </button>
        </div>
      </div>
      {searchResults.map((item: SearchData, id: number) => (
        <SearchItem
          key={id}
          {...item}
          currentSearch={currentSearch}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
};

export default Search;
