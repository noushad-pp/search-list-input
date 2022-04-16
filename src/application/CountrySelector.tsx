import { useMachine } from '@xstate/react';
import React from 'react';

import {
  inputBlurredEvent,
  inputFocusedEvent,
  itemFocusedEvent,
  searchTextEnteredEvent,
} from '../domain/country-selector/country-selector.events';
import countrySelectorMachine from '../domain/country-selector/country-selector.machine';

import HighlightedText from './components/HighlightedText';

import styles from './CountrySelector.module.scss';

const CountrySelectorComp: React.FC = () => {
  const [
    {
      context: { searchText, focusedCountry, showCountryList, filteredCountryList },
    },
    publish,
  ] = useMachine(countrySelectorMachine, { devTools: true });

  const onInputFocus = () => publish(inputFocusedEvent);
  const onInputBlur = () => publish(inputBlurredEvent);
  // TODO: make debounced change
  const onInputChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) =>
    publish(searchTextEnteredEvent(value));

  const text = focusedCountry?.name || searchText;

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
        />
        {showCountryList && filteredCountryList.length > 0 && (
          <div className={styles.countryList}>
            {filteredCountryList.map((country) => {
              const onFocused = () => publish(itemFocusedEvent(country));
              const onBlurred = () => publish(itemFocusedEvent());

              return (
                <div
                  key={country.code}
                  className={styles.countryListItem}
                  tabIndex={0}
                  onFocus={onFocused}
                  onBlur={onBlurred}
                  onMouseEnter={onFocused}
                  onMouseLeave={onBlurred}
                >
                  <HighlightedText text={country.name} indexesToHighlight={country.nameMatchIndexes} />
                  <HighlightedText text={country.code} indexesToHighlight={country.codeMatchIndexes} />
                </div>
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
