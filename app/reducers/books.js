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

// ↓↓↓↓ selectors ↓↓↓↓
export const getAllBooks = (state) =>
  state.allIds.map(id => state.byIds[id])

export const getGroupedBooks = (
  state,
  bookIds
) => bookIds.map(id => state.byIds[id])


