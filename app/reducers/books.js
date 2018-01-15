// @flow
import { combineReducers } from 'redux'

const allIds = (state = []) => {
  return state
}
const byIds = (state = {}) => {
  return state
}

export default combineReducers({
  allIds,
  byIds
})
// ↑↑↑↑ reducers ↑↑↑↑

// define reducer type
export type booksStateType = {
  allIds: Array<string>,
  byIds: { [key: string | number]: any }
};

// ↓↓↓↓ selectors ↓↓↓↓
export const getAllBooks = (state: booksStateType) =>
  state.allIds.map(id => state.byIds[id])

export const getGroupedBooks = (
  state: booksStateType,
  bookIds: Array<number>
) => bookIds.map(id => state.byIds[id])


