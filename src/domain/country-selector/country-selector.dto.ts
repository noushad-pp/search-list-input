export type Country = {
  code: string;
  name: string;
};

export interface FilteredCountry extends Country {
  nameMatchIndexes?: number[];
  codeMatchIndexes?: number[];
}

export interface CountrySelectorContext {
  searchText: string;
  focusedCountryIndex?: number;
  selectedCountry?: Country;
  showCountryList: boolean;
  filteredCountryList: FilteredCountry[];
}

type CountrySelectorStates = 'initial' | 'searching' | 'listShown' | 'countrySelected';
export type CountrySelectorStateSchema = {
  [k in CountrySelectorStates]: Record<string, any>;
};
