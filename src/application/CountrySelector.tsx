import { useMachine } from '@xstate/react';
import React from 'react';

import { inputFocusedEvent, searchTextEnteredEvent } from '../domain/country-selector/country-selector.events';
import countrySelectorMachine from '../domain/country-selector/country-selector.machine';

import styles from './CountrySelector.module.scss';

const CountrySelectorComp: React.FC = () => {
  const [
    {
      context: { displayText, filteredCountryList },
    },
    publish,
  ] = useMachine(countrySelectorMachine, { devTools: true });

  const onInputFocus = () => publish(inputFocusedEvent);
  // TODO: make debounced change
  const onInputChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) =>
    publish(searchTextEnteredEvent(value));

  return (
    <div className={styles.container}>
      <label id="country-selector-label" htmlFor="country-selector-input">
        Search country
      </label>
      <div className={styles.inputContainer}>
        <input
          id="country-selector-input"
          type="search"
          value={displayText}
          onFocus={onInputFocus}
          onChange={onInputChange}
        />
        {filteredCountryList.length > 0 && (
          <div className={styles.countryList}>
            {filteredCountryList.map((country) => {
              return (
                <div key={country.code} className={styles.countryListItem}>
                  <span className={styles.countryListItemName}>{country.name}</span>
                  <span className={styles.countryListItemCode}>{country.code}</span>
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
