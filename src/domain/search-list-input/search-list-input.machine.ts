import { createMachine, MachineConfig, StateSchema } from 'xstate';

import countries from '../data/countries.json';

import {
  clearSearchText,
  focusedItemSelected,
  hideResults,
  inputBlurred,
  inputFocused,
  itemSelected,
  listBlurred,
  nextItemFocused,
  prevItemFocused,
  searchTextEntered,
  showResults,
} from './search-list-input.actions';
import { ActionTypes } from './search-list-input.constants';
import { SearchListInputContext, SearchListInputStateSchema } from './search-list-input.dto';

const defaultContext: SearchListInputContext = {
  searchText: '',
  showResults: false,
  focusedItemIndex: undefined,
  selectedItem: undefined,
  filteredResults: countries,
};

export const countrySelectorMachineConfig: MachineConfig<
  SearchListInputContext,
  StateSchema<SearchListInputStateSchema>,
  any
> = {
  id: 'searchListInputMachine',
  context: defaultContext,
  initial: 'initial' as any,
  states: {
    initial: {
      on: {
        [ActionTypes.INPUT_FOCUSED]: {
          target: 'searching',
          actions: ['clearSearchText', 'showResults'],
        },
      },
    },
    searching: {
      on: {
        [ActionTypes.INPUT_FOCUSED]: {
          actions: ['showResults'],
        },
        [ActionTypes.SEARCH_TEXT_ENTERED]: {
          target: 'resultList',
          actions: ['searchTextEntered', 'showResults'],
        },
        [ActionTypes.NEXT_ITEM_FOCUSED]: {
          actions: ['nextItemFocused'],
        },
        [ActionTypes.PREV_ITEM_FOCUSED]: {
          actions: ['prevItemFocused'],
        },
        [ActionTypes.FOCUSED_ITEM_SELECTED]: {
          actions: ['focusedItemSelected', 'hideResults'],
        },
        [ActionTypes.ITEM_SELECTED]: {
          target: 'itemSelected',
          actions: ['itemSelected', 'hideResults'],
        },
      },
    },
    resultList: {
      on: {
        [ActionTypes.INPUT_FOCUSED]: {
          actions: ['clearSearchText'],
        },
        [ActionTypes.INPUT_BLURRED]: {
          actions: ['hideResults'],
        },
        [ActionTypes.SEARCH_TEXT_ENTERED]: {
          actions: ['searchTextEntered', 'showResults'],
        },
        [ActionTypes.NEXT_ITEM_FOCUSED]: {
          actions: ['nextItemFocused'],
        },
        [ActionTypes.PREV_ITEM_FOCUSED]: {
          actions: ['prevItemFocused'],
        },
        [ActionTypes.FOCUSED_ITEM_SELECTED]: {
          actions: ['focusedItemSelected', 'hideResults'],
        },
        [ActionTypes.ITEM_SELECTED]: {
          target: 'itemSelected',
          actions: ['itemSelected', 'hideResults'],
        },
        [ActionTypes.LIST_BLURRED]: {
          target: 'searching',
          actions: ['hideResults'],
        },
      },
    },
    itemSelected: {
      on: {
        [ActionTypes.INPUT_FOCUSED]: {
          target: 'resultList',
          actions: ['showResults'],
        },
      },
    },
  },
};

export const countrySelectorMachineOptions = {
  guards: {},
  actions: {
    inputBlurred,
    inputFocused,
    searchTextEntered,
    clearSearchText,
    hideResults,
    showResults,
    nextItemFocused,
    prevItemFocused,
    focusedItemSelected,
    itemSelected,
    listBlurred,
  },
};

export const searchListInputMachine = createMachine<SearchListInputContext>(
  countrySelectorMachineConfig,
  countrySelectorMachineOptions
);

export default searchListInputMachine;
