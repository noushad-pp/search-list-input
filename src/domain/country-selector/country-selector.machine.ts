import { createMachine, MachineConfig, StateSchema } from 'xstate';

import countries from '../data/countries.json';

import {
  inputBlurred,
  inputFocused,
  itemFocused,
  itemSelected,
  listBlurred,
  searchTextEntered,
} from './country-selector.actions';
import { ActionTypes } from './country-selector.constants';
import { CountrySelectorContext, CountrySelectorStateSchema } from './country-selector.dto';

const defaultContext: CountrySelectorContext = {
  searchText: '',
  focusedCountryIndex: undefined,
  selectedCountry: undefined,
  showCountryList: false,
  filteredCountryList: countries,
};

export const countrySelectorMachineConfig: MachineConfig<
  CountrySelectorContext,
  StateSchema<CountrySelectorStateSchema>,
  any
> = {
  id: 'countrySelectorMachine',
  context: defaultContext,
  initial: 'initial' as any,
  states: {
    initial: {
      on: {
        [ActionTypes.INPUT_FOCUSED]: {
          target: 'searching',
          actions: ['inputFocused'],
        },
      },
    },
    searching: {
      on: {
        [ActionTypes.INPUT_FOCUSED]: {
          actions: ['inputFocused'],
        },
        [ActionTypes.SEARCH_TEXT_ENTERED]: {
          target: 'listShown',
          actions: ['searchTextEntered'],
        },
        [ActionTypes.ITEM_SELECTED]: {
          target: 'countrySelected',
          actions: ['itemSelected'],
        },
      },
    },
    listShown: {
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
          actions: ['listBlurred'],
        },
        [ActionTypes.ITEM_SELECTED]: {
          target: 'countrySelected',
          actions: ['itemSelected'],
        },
      },
    },
    countrySelected: {
      on: {
        [ActionTypes.INPUT_FOCUSED]: {
          target: 'searching',
          actions: ['inputFocused'],
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
    searchTextEntered,
  },
};

export const countrySelectorMachine = createMachine<CountrySelectorContext>(
  countrySelectorMachineConfig,
  countrySelectorMachineOptions
);

export default countrySelectorMachine;
