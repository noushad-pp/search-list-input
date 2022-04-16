import { go as fuzzySearch } from 'fuzzysort';
import { assign } from 'xstate';

import countries from '../data/countries.json';

import { SearchItem, SearchListInputContext } from './search-list-input.dto';
import {
  ClearSearchTextEvent,
  HideResultsEvent,
  InputBlurredEvent,
  InputFocusedEvent,
  ItemFocusedEvent,
  ItemSelectedEvent,
  ListBlurredEvent,
  SearchTextEnteredEvent,
  ShowResultsEvent,
} from './search-list-input.events';

const getFilteredItems = (search: string) => {
  if (!search) {
    return countries;
  }

  const results = fuzzySearch<SearchItem>(search, countries, {
    keys: ['name', 'code'],
  });

  return results.map((result) => ({
    ...result.obj,
    nameMatchIndexes: result[0] ? result[0].indexes : [],
    codeMatchIndexes: result[1] ? result[1].indexes : [],
  }));
};

export const inputFocused = assign<SearchListInputContext, InputFocusedEvent>({
  focusedItemIndex: () => undefined,
  filteredResults: ({ searchText }) => getFilteredItems(searchText),
});

export const inputBlurred = assign<SearchListInputContext, InputBlurredEvent>({
  focusedItemIndex: () => undefined,
});

export const showResults = assign<SearchListInputContext, ShowResultsEvent>({
  showResults: () => true,
});

export const hideResults = assign<SearchListInputContext, HideResultsEvent>({
  showResults: () => false,
});

export const searchTextEntered = assign<SearchListInputContext, SearchTextEnteredEvent>({
  searchText: (_, { search }) => search,
  focusedItemIndex: () => undefined,
  selectedItem: () => undefined,
  filteredResults: (_, { search }) => getFilteredItems(search),
});

export const clearSearchText = assign<SearchListInputContext, ClearSearchTextEvent>({
  searchText: () => '',
  focusedItemIndex: () => undefined,
  selectedItem: () => undefined,
  filteredResults: (_) => getFilteredItems(''),
});

export const itemFocused = assign<SearchListInputContext, ItemFocusedEvent>({
  focusedItemIndex: (_, { index }) => index,
});

export const listBlurred = assign<SearchListInputContext, ListBlurredEvent>({
  focusedItemIndex: () => undefined,
});

export const itemSelected = assign<SearchListInputContext, ItemSelectedEvent>({
  searchText: (_, { item }) => item.name,
  focusedItemIndex: () => undefined,
  filteredResults: () => countries,
  selectedItem: (_, { item }) => item,
});
