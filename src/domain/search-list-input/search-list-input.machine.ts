import { createMachine, MachineConfig, StateSchema } from 'xstate';

import countries from '../data/countries.json';

import {
  hideResults,
  inputBlurred,
  inputFocused,
  itemFocused,
  itemSelected,
  listBlurred,
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
          actions: ['showResults'],
        },
      },
    },
    searching: {
      on: {
        [ActionTypes.INPUT_FOCUSED]: {
          actions: ['showResults'],
        },
        // [ActionTypes.LIST_BLURRED]: {
        //   actions: ['hideResults'],
        // },
        [ActionTypes.SEARCH_TEXT_ENTERED]: {
          target: 'resultList',
          actions: ['searchTextEntered', 'showResults'],
        },
        [ActionTypes.ITEM_SELECTED]: {
          target: 'itemSelected',
          actions: ['itemSelected', 'hideResults'],
        },
      },
    },
    resultList: {
      on: {
        [ActionTypes.INPUT_BLURRED]: {
          actions: ['inputBlurred'],
        },
        [ActionTypes.SEARCH_TEXT_ENTERED]: {
          actions: ['searchTextEntered'],
        },
        [ActionTypes.ITEM_FOCUSED]: {
          actions: ['itemFocused'],
        },
        [ActionTypes.LIST_BLURRED]: {
          target: 'searching',
          actions: ['hideResults'],
        },
        [ActionTypes.ITEM_SELECTED]: {
          target: 'itemSelected',
          actions: ['itemSelected'],
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
    itemFocused,
    itemSelected,
    listBlurred,
    hideResults,
    showResults,
    searchTextEntered,
  },
};

export const searchListInputMachine = createMachine<SearchListInputContext>(
  countrySelectorMachineConfig,
  countrySelectorMachineOptions
);

export default searchListInputMachine;
