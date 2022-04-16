export type Country = {
  code: string;
  name: string;
};

export interface CountrySelectorContext {
  searchText: string;
  displayText: string;
  focusedCountry?: Country;
  selectedCountry?: Country;
  showCountryList: boolean;
  filteredCountryList: Country[];
}

type CountrySelectorStates = 'initial' | 'searching' | 'countryHighlighted' | 'countrySelected';
export type CountrySelectorStateSchema = {
  [k in CountrySelectorStates]: Record<string, any>;
};
