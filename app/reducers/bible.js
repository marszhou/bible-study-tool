import { combineReducers } from 'redux'
import { Types } from '../actions/bible'
import { Types as LayoutTypes } from '../actions/layout'
import versions from 'app/consts/versions';

const selectedVersions = (state = ['cuvs'], action) => {
  switch(action.type) {
    case Types.SET_VERSIONS:
      return action.versions
    default:
      return state
  }
}

const isDisplayCode = (state = false, action) => {
  switch(action.type) {
    case Types.SET_IS_DISPLAY_CODE:
      return action.isDisplayCode
    default:
      return state
  }
}

const selectedVerses = (state = [], action) => {
  switch (action.type) {
    case Types.TOGGLE_VERSE:
      return state.indexOf(action.verseId) === -1
        ? [...state, action.verseId]
        : state.filter(vid => vid !== action.verseId)
    default:
      return state
  }
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
  selectedVersions,
  isDisplayCode,
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

export const getVersesByTabId = (state, tabId) => {
  const view = state.views[tabId]
  return Object.keys(view.versionVerses).reduce((ret, version) => {
    return {
      ...ret,
      [version]: view.versionVerses[version].map(
        verseId => state.versionVersesById[version][verseId]
      )
    }
  }, {})
}
export const getSelectedVersesByTabId = (state, tabId) =>
  state.views[tabId].selectedVerses
export const getVersionsByTabId = (state, tabId) =>
  state.views[tabId].selectedVersions
export const getIsDisplayCodeByTabId = (state, tabId) =>
  state.views[tabId].isDisplayCode
export const getVersions = () => versions
export const getIsShowCodeDisabled = (state, tabId) => {
  const versions = getVersions()
  const selectedVersions = getVersionsByTabId(state, tabId)
  return (
    selectedVersions.length > 1 ||
    !selectedVersions.map(id => versions.find(version => id === version.id))[0].hasCode
  )
}
