import cn from 'classnames';
import React, { useEffect, useRef } from 'react';

import { FilteredCountry } from '../../domain/country-selector/country-selector.dto';

import HighlightedText from './HighlightedText';

import styles from './CountryListItem.module.scss';

type Props = {
  isFocused: boolean;
  country: FilteredCountry;
  onSelected: () => void;
};

const CountryListItemComp: React.FC<Props> = ({ country, isFocused, onSelected }) => {
  const countryItemRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (isFocused && countryItemRef.current) {
      countryItemRef.current.scrollIntoView();
    }
  }, [isFocused]);

  const onCountrySelected = () => onSelected();

  return (
    <div
      ref={countryItemRef}
      className={cn(styles.countryListItem, { [styles.isFocused]: isFocused })}
      onClick={onCountrySelected}
    >
      <HighlightedText text={country.name} indexesToHighlight={country.nameMatchIndexes} />
      <HighlightedText text={country.code} indexesToHighlight={country.codeMatchIndexes} />
    </div>
  );
};

export const CountryListItem = React.memo(CountryListItemComp);
export default CountryListItem;
