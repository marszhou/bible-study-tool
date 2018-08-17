import { combineReducers } from 'redux'
import { Types } from '../actions/bible'

const info = (state = { versions: ['cuvs'] }, action) => {
  switch (action.type) {
    case Types.SET_DISPLAY_INFO:
      return { ...state, ...action.info }
    default:
      return state
  }
}

const selectedVerses = (state=[], action) => {
  return state
}

const verses = (state=[], action) => {

}

const bibleView = combineReducers({
  info
})

const bibleViews = (state = {}, action) => {
  if (action.tabId) {
    return {
      ...state,
      [action.tabId]: bibleView(state[action.tabId], action)
    }
  }
  return state
}

const versesById = (state = {}, action) => {
  return state
}

const bible = combineReducers({
  bibleViews,
  versesById
})

export default bible
