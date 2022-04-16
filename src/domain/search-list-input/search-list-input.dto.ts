export type SearchItem = {
  name: {
    common: string;
  };
  cca2: string;
  flag: string;
};

export interface FilteredItem extends SearchItem {
  nameMatchIndexes?: number[];
  codeMatchIndexes?: number[];
}

export interface SearchListInputContext<T = SearchItem> {
  searchText: string;
  showResults: boolean;
  focusedItemIndex?: number;
  selectedItem?: T;
  filteredResults: FilteredItem[];
}

type SearchListInputStates = 'initial' | 'searching' | 'resultList' | 'keyboardMode' | 'itemSelected';
export type SearchListInputStateSchema = {
  [k in SearchListInputStates]: Record<string, any>;
};
