import { createMachine, MachineConfig, StateSchema } from 'xstate';

import countries from '../data/countries.json';

import { searchTextEntered } from './country-selector.actions';
import { ActionTypes } from './country-selector.constants';
import { CountrySelectorContext, CountrySelectorStateSchema } from './country-selector.dto';

const defaultContext: CountrySelectorContext = {
  searchText: '',
  displayText: '',
  focusedCountry: undefined,
  selectedCountry: undefined,
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
    searchTextEntered,
  },
};

export const countrySelectorMachine = createMachine<CountrySelectorContext>(
  countrySelectorMachineConfig,
  countrySelectorMachineOptions
);

export default countrySelectorMachine;
