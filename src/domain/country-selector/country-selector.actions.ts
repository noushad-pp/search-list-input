import { go as fuzzySearch } from 'fuzzysort';
import { assign } from 'xstate';

import countries from '../data/countries.json';

import { Country, CountrySelectorContext } from './country-selector.dto';
import { InputBlurredEvent, InputFocusedEvent, SearchTextEnteredEvent } from './country-selector.events';

export const inputFocused = assign<CountrySelectorContext, InputFocusedEvent>({
  showCountryList: () => true,
});

export const inputBlurred = assign<CountrySelectorContext, InputBlurredEvent>({
  showCountryList: () => false,
});

export const searchTextEntered = assign<CountrySelectorContext, SearchTextEnteredEvent>({
  displayText: (_context, { search }) => search,
  searchText: (_, { search }) => search,
  showCountryList: () => true,
  filteredCountryList: (_, { search }) => {
    if (!search) {
      return countries;
    }

    const results = fuzzySearch<Country>(search, countries, {
      keys: ['name', 'code'],
    });

    return results.map((result) => ({
      ...result.obj,
      nameMatchIndexes: result[0] ? [result[0].indexes] : [],
      codeMatchIndexes: result[1] ? [result[1].indexes] : [],
    }));
  },
});
