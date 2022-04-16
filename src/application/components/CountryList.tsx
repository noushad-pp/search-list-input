import React, { useRef } from 'react';

import { FilteredCountry } from '../../domain/country-selector/country-selector.dto';
import useOutsideClick from '../hooks/useOutsideClick';

import CountryListItem from './CountryListItem';

import styles from '../CountrySelector.module.scss';

type Props = {
  countries: FilteredCountry[];
  focusedCountryIndex?: number;
  onCountrySelected: (country: FilteredCountry) => void;
  onBlur: () => void;
};

const CountryListComp: React.FC<Props> = ({ focusedCountryIndex, countries, onCountrySelected, onBlur }) => {
  const listRef = useRef<HTMLDivElement>(null);
  const onOutsideClickCallBack = () => {
    // eslint-disable-next-line no-console
    console.log('blurring');
    setTimeout(() => onBlur(), 0);
  };
  useOutsideClick(listRef, onOutsideClickCallBack);

  return (
    <div className={styles.countryList} ref={listRef}>
      {countries.map((country, index) => {
        const isFocused = index === focusedCountryIndex;
        const onSelected = () => onCountrySelected(country);

        return <CountryListItem key={country.code} isFocused={isFocused} onSelected={onSelected} country={country} />;
      })}
    </div>
  );
};

export const CountryList = React.memo(CountryListComp);
export default CountryList;
