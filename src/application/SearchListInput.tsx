import { useMachine } from '@xstate/react';
import React, { useMemo } from 'react';

import { FilteredItem } from '../domain/search-list-input/search-list-input.dto';
import {
  inputFocusedEvent,
  itemFocusedEvent,
  itemSelectedEvent,
  listBlurredEvent,
  searchTextEnteredEvent,
} from '../domain/search-list-input/search-list-input.events';
import searchListInputMachine from '../domain/search-list-input/search-list-input.machine';

import Input from './components/Input';
import ResultList from './components/ResultList';
import { KEY_CODE_DOWN, KEY_CODE_UP } from './config/constants';

import styles from './SearchListInput.module.scss';

const SearchListInputComp: React.FC = () => {
  const [{ context }, publish] = useMachine(searchListInputMachine, { devTools: true });
  const { searchText, focusedItemIndex, showResults, filteredResults, selectedItem } = context;

  const focusedItem = useMemo(() => {
    return focusedItemIndex ? filteredResults[focusedItemIndex] : undefined;
  }, [focusedItemIndex, filteredResults]);

  const onItemSelected = (item: FilteredItem) => publish(itemSelectedEvent(item));
  const onInputFocus = () => publish(inputFocusedEvent);
  const onListBlurred = () => publish(listBlurredEvent);
  const onInputChange = (value: string) => publish(searchTextEnteredEvent(value));
  const onInputKeyPress = (key: string) => {
    const currentIndex = focusedItemIndex;
    const lastIndex = filteredResults.length - 1;

    switch (key) {
      case KEY_CODE_DOWN: {
        const nextItemIndex = currentIndex === undefined || currentIndex === lastIndex ? 0 : currentIndex + 1;
        publish(itemFocusedEvent(nextItemIndex));
        break;
      }

      case KEY_CODE_UP: {
        const prevItemIndex = !currentIndex ? lastIndex : currentIndex - 1;
        publish(itemFocusedEvent(prevItemIndex));
        break;
      }

      default: {
        break;
      }
    }
  };

  const text = focusedItem?.name || selectedItem?.name || searchText;

  return (
    <div className={styles.container}>
      <label id="item-selector-label" htmlFor="item-selector-input">
        Search country
      </label>
      <div className={styles.inputContainer}>
        <Input search={text} onChange={onInputChange} onFocus={onInputFocus} onKeyDown={onInputKeyPress} />
        {showResults && filteredResults.length > 0 && (
          <ResultList results={filteredResults} onItemSelected={onItemSelected} onBlur={onListBlurred} />
        )}
      </div>
    </div>
  );
};

export const SearchListInput = React.memo(SearchListInputComp);
export default SearchListInput;
