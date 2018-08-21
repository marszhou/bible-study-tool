import { combineReducers } from 'redux'
import { Types } from '../actions/bible'
import { Types as LayoutTypes } from '../actions/layout'

const info = (state = { versions: ['cuvs'] }, action) => {
  switch (action.type) {
    case Types.SET_DISPLAY_INFO:
      return { ...state, ...action.info }
    default:
      return state
  }
}

const selectedVerses = (state = [], action) => {
  return state
}

const versionVerses = (state = {}, action) => {
  switch (action.type) {
    case Types.FETCH_VERSES_COMPLETED:
      return Object.keys(action.response).reduce(
        (ret, version) => ({
          ...ret,
          [version]: action.response[version].map(verse => verse.id)
        }),
        {}
      )
    default:
      return state
  }
}

const view = combineReducers({
  info,
  selectedVerses,
  versionVerses
})

const views = (state = {}, action) => {
  switch (action.type) {
    case LayoutTypes.TAB_REMOVE: {
      const nextState = { ...state }
      delete nextState[action.id]
      return nextState
    }
    default: {
      const { tabId } = action
      if (tabId) {
        return {
          ...state,
          [tabId]: view(state[tabId], action)
        }
      }
      return state
    }
  }
}

const versesById = (state = {}, verses) =>
  verses.reduce(
    (ret, verse) => ({
      ...ret,
      [verse.id]: verse
    }),
    state
  )

const versionVersesById = (state = {}, action) => {
  switch (action.type) {
    case Types.FETCH_VERSES_COMPLETED:
      return Object.keys(action.response).reduce(
        (ret, version) => ({
          ...ret,
          [version]: versesById(ret[version], action.response[version])
        }),
        state
      )
    default:
      return state
  }
}

const bible = combineReducers({
  views,
  versionVersesById
})

export default bible
