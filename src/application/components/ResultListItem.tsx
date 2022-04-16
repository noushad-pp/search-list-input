import cn from 'classnames';
import React, { useEffect, useRef } from 'react';

import { FilteredItem } from '../../domain/search-list-input/search-list-input.dto';

import HighlightedText from './HighlightedText';

import styles from './ResultListItem.module.scss';

type Props = {
  isFocused: boolean;
  results: FilteredItem;
  onSelected: () => void;
};

const ResultListItemComp: React.FC<Props> = ({ results, isFocused, onSelected }) => {
  const resultItemRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (isFocused && resultItemRef.current) {
      resultItemRef.current.scrollIntoView();
    }
  }, [isFocused]);

  const onItemSelected = (e: React.MouseEvent) => {
    e.stopPropagation(); // prevent bubbling up and triggering the list blur event
    onSelected();
  };

  return (
    <div
      ref={resultItemRef}
      className={cn(styles.resultListItem, { [styles.isFocused]: isFocused })}
      onClick={onItemSelected}
    >
      <div className={styles.nameAndFlag}>
        <span className={styles.flag}>{results.flag}</span>
        <HighlightedText text={results.name.common} indexesToHighlight={results.nameMatchIndexes} />
      </div>
      <div className={styles.codeName}>
        <HighlightedText text={results.cca2.toUpperCase()} indexesToHighlight={results.codeMatchIndexes} />
      </div>
    </div>
  );
};

export const ResultListItem = React.memo(ResultListItemComp);
export default ResultListItem;
