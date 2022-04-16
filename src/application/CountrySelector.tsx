import { useMachine } from '@xstate/react';
import React, { useMemo } from 'react';

import {
  // inputBlurredEvent,
  inputFocusedEvent,
  itemFocusedEvent,
  itemSelectedEvent,
  searchTextEnteredEvent,
} from '../domain/country-selector/country-selector.events';
import countrySelectorMachine from '../domain/country-selector/country-selector.machine';

import CountryListItem from './components/CountryListItem';
import { KEY_CODE_DOWN, KEY_CODE_UP } from './config/constants';

import styles from './CountrySelector.module.scss';

const CountrySelectorComp: React.FC = () => {
  const [
    {
      context: { searchText, focusedCountryIndex, showCountryList, filteredCountryList, selectedCountry },
    },
    publish,
  ] = useMachine(countrySelectorMachine, { devTools: true });

  const focusedCountry = useMemo(() => {
    return focusedCountryIndex ? filteredCountryList[focusedCountryIndex] : undefined;
  }, [focusedCountryIndex, filteredCountryList]);

  const onInputFocus = () => publish(inputFocusedEvent);
  const onInputBlur = () => ({});
  // TODO: make debounced change
  const onInputChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) =>
    publish(searchTextEnteredEvent(value));

  const onInputKeyPress = ({ key }: React.KeyboardEvent) => {
    const currentIndex = focusedCountryIndex;
    const lastIndex = filteredCountryList.length - 1;

    switch (key) {
      case KEY_CODE_DOWN: {
        const nextItemIndex = currentIndex === undefined || currentIndex === lastIndex ? 0 : currentIndex + 1;
        publish(itemFocusedEvent(nextItemIndex));
        break;
      }

      case KEY_CODE_UP: {
        const prevItemIndex = !currentIndex ? lastIndex : currentIndex - 1;
        publish(itemFocusedEvent(prevItemIndex));
        break;
      }

      default: {
        break;
      }
    }
  };

  const text = focusedCountry?.name || selectedCountry?.name || searchText;

  return (
    <div className={styles.container}>
      <label id="country-selector-label" htmlFor="country-selector-input">
        Search country
      </label>
      <div className={styles.inputContainer}>
        <input
          id="country-selector-input"
          type="search"
          placeholder="Search here.."
          value={text}
          onFocus={onInputFocus}
          onBlur={onInputBlur}
          onChange={onInputChange}
          onKeyDown={onInputKeyPress}
        />
        {showCountryList && filteredCountryList.length > 0 && (
          <div className={styles.countryList}>
            {filteredCountryList.map((country, index) => {
              const isFocused = index === focusedCountryIndex;
              const onSelected = () => publish(itemSelectedEvent(country));

              return (
                <CountryListItem key={country.code} isFocused={isFocused} onSelected={onSelected} country={country} />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export const CountrySelector = React.memo(CountrySelectorComp);
export default CountrySelector;
