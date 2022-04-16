import React, { useRef } from 'react';

import { FilteredItem } from '../../domain/search-list-input/search-list-input.dto';
import useOutsideClick from '../hooks/useOutsideClick';

import ResultListItem from './ResultListItem';

import styles from '../SearchListInput.module.scss';

type Props = {
  results: FilteredItem[];
  focusedItemIndex?: number;
  onItemSelected: (country: FilteredItem) => void;
  onBlur: () => void;
};

const ResultListComp: React.FC<Props> = ({ focusedItemIndex, results, onItemSelected, onBlur }) => {
  const listRef = useRef<HTMLDivElement>(null);
  useOutsideClick(listRef, onBlur);

  return (
    <div className={styles.resultList} ref={listRef}>
      {results.map((country, index) => {
        const isFocused = index === focusedItemIndex;
        const onSelected = () => onItemSelected(country);

        return <ResultListItem key={country.cca2} isFocused={isFocused} onSelected={onSelected} results={country} />;
      })}
    </div>
  );
};

export const ResultList = React.memo(ResultListComp);
export default ResultList;
