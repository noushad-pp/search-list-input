import { createMachine, MachineConfig, StateSchema } from 'xstate';

import countries from '../data/countries.json';

import { inputBlurred, inputFocused, searchTextEntered } from './country-selector.actions';
import { ActionTypes } from './country-selector.constants';
import { CountrySelectorContext, CountrySelectorStateSchema } from './country-selector.dto';

const defaultContext: CountrySelectorContext = {
  searchText: '',
  displayText: '',
  focusedCountry: undefined,
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
  strict: true,
  initial: 'initial' as any,
  states: {
    initial: {
      on: {
        [ActionTypes.INPUT_FOCUSED]: {
          target: 'searching',
        },
      },
    },
    searching: {
      on: {
        [ActionTypes.INPUT_FOCUSED]: {
          actions: ['inputFocused'],
        },
        [ActionTypes.INPUT_BLURRED]: {
          actions: ['inputBlurred'],
        },
        [ActionTypes.SEARCH_TEXT_ENTERED]: {
          actions: ['searchTextEntered'],
        },
      },
    },
  },
};

export const countrySelectorMachineOptions = {
  guards: {},
  actions: {
    inputFocused,
    inputBlurred,
    searchTextEntered,
  },
};

export const countrySelectorMachine = createMachine<CountrySelectorContext>(
  countrySelectorMachineConfig,
  countrySelectorMachineOptions
);

export default countrySelectorMachine;
