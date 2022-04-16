import { ActionTypes } from './country-selector.constants';

export type InputFocusedEvent = { type: ActionTypes.INPUT_FOCUSED };
export const inputFocusedEvent: InputFocusedEvent = {
  type: ActionTypes.INPUT_FOCUSED,
};

export type SearchTextEnteredEvent = { type: ActionTypes.SEARCH_TEXT_ENTERED; search: string };
export const searchTextEnteredEvent = (search: string): SearchTextEnteredEvent => ({
  type: ActionTypes.SEARCH_TEXT_ENTERED,
  search,
});
