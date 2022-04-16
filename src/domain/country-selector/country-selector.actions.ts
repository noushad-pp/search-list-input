import { go as fuzzySearch } from 'fuzzysort';
import { assign } from 'xstate';

import countries from '../data/countries.json';

import { Country, CountrySelectorContext } from './country-selector.dto';
import {
  InputBlurredEvent,
  InputFocusedEvent,
  ItemFocusedEvent,
  ItemSelectedEvent,
  ListBlurredEvent,
  SearchTextEnteredEvent,
} from './country-selector.events';

const getFilteredCountries = (search: string) => {
  if (!search) {
    return countries;
  }

  const results = fuzzySearch<Country>(search, countries, {
    keys: ['name', 'code'],
  });

  return results.map((result) => ({
    ...result.obj,
    nameMatchIndexes: result[0] ? result[0].indexes : [],
    codeMatchIndexes: result[1] ? result[1].indexes : [],
  }));
};

export const inputFocused = assign<CountrySelectorContext, InputFocusedEvent>({
  showCountryList: () => true,
  focusedCountryIndex: () => undefined,
  filteredCountryList: ({ searchText }) => getFilteredCountries(searchText),
});

export const inputBlurred = assign<CountrySelectorContext, InputBlurredEvent>({
  showCountryList: () => false,
  focusedCountryIndex: () => undefined,
});

export const searchTextEntered = assign<CountrySelectorContext, SearchTextEnteredEvent>({
  searchText: (_, { search }) => search,
  showCountryList: () => true,
  focusedCountryIndex: () => undefined,
  selectedCountry: () => undefined,
  filteredCountryList: (_, { search }) => getFilteredCountries(search),
});

export const itemFocused = assign<CountrySelectorContext, ItemFocusedEvent>({
  focusedCountryIndex: (_, { index }) => index,
});

export const listBlurred = assign<CountrySelectorContext, ListBlurredEvent>({
  focusedCountryIndex: () => undefined,
  showCountryList: () => false,
});

export const itemSelected = assign<CountrySelectorContext, ItemSelectedEvent>({
  searchText: (_, { country }) => country.name,
  focusedCountryIndex: () => undefined,
  filteredCountryList: () => countries,
  showCountryList: () => false,
  selectedCountry: (_, { country }) => country,
});
