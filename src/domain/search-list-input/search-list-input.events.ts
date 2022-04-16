import { ActionTypes } from './search-list-input.constants';
import { FilteredItem } from './search-list-input.dto';

export type InputFocusedEvent = { type: ActionTypes.INPUT_FOCUSED };
export const inputFocusedEvent: InputFocusedEvent = {
  type: ActionTypes.INPUT_FOCUSED,
};

export type InputBlurredEvent = { type: ActionTypes.INPUT_BLURRED };
export const inputBlurredEvent: InputBlurredEvent = {
  type: ActionTypes.INPUT_BLURRED,
};

export type SearchTextEnteredEvent = { type: ActionTypes.SEARCH_TEXT_ENTERED; search: string };
export const searchTextEnteredEvent = (search: string): SearchTextEnteredEvent => ({
  type: ActionTypes.SEARCH_TEXT_ENTERED,
  search,
});

export type ClearSearchTextEvent = { type: ActionTypes.CLEAR_SEARCH_TEXT };
export const clearSearchTextEvent: ClearSearchTextEvent = {
  type: ActionTypes.CLEAR_SEARCH_TEXT,
};

export type ShowResultsEvent = { type: ActionTypes.SHOW_RESULTS };
export const showResultsEvent: ShowResultsEvent = {
  type: ActionTypes.SHOW_RESULTS,
};

export type HideResultsEvent = { type: ActionTypes.HIDE_RESULTS };
export const hideResultsEvent: HideResultsEvent = {
  type: ActionTypes.HIDE_RESULTS,
};

export type ItemFocusedEvent = { type: ActionTypes.ITEM_FOCUSED; index?: number };
export const itemFocusedEvent = (index?: number): ItemFocusedEvent => ({
  type: ActionTypes.ITEM_FOCUSED,
  index,
});

export type ListBlurredEvent = { type: ActionTypes.LIST_BLURRED; index?: number };
export const listBlurredEvent: ListBlurredEvent = {
  type: ActionTypes.LIST_BLURRED,
};

export type ItemSelectedEvent<T = FilteredItem> = { type: ActionTypes.ITEM_SELECTED; item: T };
export const itemSelectedEvent = (item: FilteredItem): ItemSelectedEvent => ({
  type: ActionTypes.ITEM_SELECTED,
  item,
});
