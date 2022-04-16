import { assign } from 'xstate';

import { CountrySelectorContext } from './country-selector.dto';
import { SearchTextEnteredEvent } from './country-selector.events';

export const searchTextEntered = assign<CountrySelectorContext, SearchTextEnteredEvent>({
  displayText: (_context, { search }) => search,
  searchText: (_, { search }) => search,
});
