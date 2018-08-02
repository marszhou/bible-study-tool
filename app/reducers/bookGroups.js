import { combineReducers } from 'redux'

const allIds = (state=[]) => {
  return state
}
const byIds = (state={}) => {
  return state
}

export default combineReducers({
  allIds,
  byIds
})
// ↑↑↑↑ reducers ↑↑↑↑

// ↓↓↓↓ selectors ↓↓↓↓
export const getAllBookGroups = (state) =>
  state.allIds.map((id: number | string) => state.byIds[id])

export const getBookGroup = (state, id) =>
  state.byIds[id]
