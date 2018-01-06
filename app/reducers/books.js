// @flow
import { combineReducers } from 'redux'

const allIds = (state = []) => {
  return state
}
const byIds = (state = {}) => {
  return state
}

export type booksStateType = {
  allIds: Array<string>,
  byIds: { [key: string | number]: any }
};

export const getAllBooks = (state: booksStateType) =>
  state.allIds.map(id => state.byIds[id])

export const getGroupedBooks = (
  state: booksStateType,
  bookIds: Array<number>
) => bookIds.map(id => state.byIds[id])

export default combineReducers({
  allIds,
  byIds
})
