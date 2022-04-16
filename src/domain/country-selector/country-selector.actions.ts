import { assign } from 'xstate';

import { CountrySelectorContext } from './country-selector.dto';
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
});
