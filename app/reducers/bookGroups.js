// @flow
import { combineReducers } from 'redux'

const allIds = (state: Array<number> = []) => {
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
  allIds: Array<number>,
  byIds: { [key: string | number]: any }
};

// ↓↓↓↓ selectors ↓↓↓↓
export const getAllBookGroups = (state: bookGroupsStateType) =>
  state.allIds.map((id: number | number) => state.byIds[id])

export const getBookGroup = (state: bookGroupsStateType, id: string | number) =>
  state.byIds[id]
