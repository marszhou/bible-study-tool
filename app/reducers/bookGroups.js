// @flow
import { combineReducers } from 'redux'

const allIds = (state: Array<number | string> = []) => {
  return state
}
const byIds = (state: { [key: string]: any } = {}) => {
  return state
}

export default combineReducers({
  allIds,
  byIds
})
// ↑↑↑↑ reducers ↑↑↑↑

// define reducer type
export type bookGroupsStateType = {
  allIds: Array<string | number>,
  byIds: { [key: string | number]: any }
};

// ↓↓↓↓ selectors ↓↓↓↓
export const getAllBookGroups = (state: bookGroupsStateType) =>
  state.allIds.map((id: number | string) => state.byIds[id])

export const getBookGroup = (state: bookGroupsStateType, id: string | number) =>
  state.byIds[id]
