import { useMachine } from '@xstate/react';
import React, { useMemo } from 'react';

import { FilteredCountry } from '../domain/country-selector/country-selector.dto';
import {
  inputFocusedEvent,
  itemFocusedEvent,
  itemSelectedEvent,
  listBlurredEvent,
  searchTextEnteredEvent,
} from '../domain/country-selector/country-selector.events';
import countrySelectorMachine from '../domain/country-selector/country-selector.machine';

import CountryList from './components/CountryList';
import Input from './components/Input';
import { KEY_CODE_DOWN, KEY_CODE_UP } from './config/constants';

import styles from './CountrySelector.module.scss';

const CountrySelectorComp: React.FC = () => {
  const [{ context }, publish] = useMachine(countrySelectorMachine, { devTools: true });
  const { searchText, focusedCountryIndex, showCountryList, filteredCountryList, selectedCountry } = context;

  const focusedCountry = useMemo(() => {
    return focusedCountryIndex ? filteredCountryList[focusedCountryIndex] : undefined;
  }, [focusedCountryIndex, filteredCountryList]);

  const onCountrySelected = (country: FilteredCountry) => publish(itemSelectedEvent(country));
  const onInputFocus = () => publish(inputFocusedEvent);
  const onListBlurred = () => publish(listBlurredEvent);
  const onInputChange = (value: string) => publish(searchTextEnteredEvent(value));
  const onInputKeyPress = (key: string) => {
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
        <Input search={text} onChange={onInputChange} onFocus={onInputFocus} onKeyDown={onInputKeyPress} />
        {showCountryList && filteredCountryList.length > 0 && (
          <CountryList countries={filteredCountryList} onCountrySelected={onCountrySelected} onBlur={onListBlurred} />
        )}
      </div>
    </div>
  );
};

export const CountrySelector = React.memo(CountrySelectorComp);
export default CountrySelector;
