import { combineReducers } from 'redux'
import zip from 'lodash/zip'
import { Types } from '../actions/bible'
import { Types as LayoutTypes } from '../actions/layout'
import versions from 'app/consts/versions'

const selectedVersions = (state = ['cuvs'], action) => {
  switch (action.type) {
    case Types.TOGGLE_VERSION: {
      const { version } = action
      const index = state.indexOf(version)
      if (index === -1) return [...state, version]
      if (state.length === 1) return state
      return state.filter(v => v !== version)
    }
    default:
      return state
  }
}

const isDisplayCode = (state = false, action) => {
  switch (action.type) {
    case Types.SET_IS_DISPLAY_CODE:
      return action.isDisplayCode
    default:
      return state
  }
}

const selectedVersesByVersion = (state = [], action) => {
  switch (action.type) {
    case Types.TOGGLE_VERSE:
      return state.indexOf(action.verseId) === -1
        ? [...state, action.verseId]
        : state.filter(vid => vid !== action.verseId)
    default:
      return state
  }
}

const selectedVerses = (selectedVersions, state = {}, action) => {
  return selectedVersions.reduce((ret, version) => {
    if ((action.version && version === action.version) || !action.version) {
      ret[version] = selectedVersesByVersion(ret[version], action)
    }

    return ret
  }, {...state})
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

const view = (state = {}, action) => {
  const {selectedVerses: selectedVersesState, ...otherState} = state

  const reducer = combineReducers({
    selectedVersions,
    isDisplayCode,
    versionVerses
  })

  const nextState = reducer(otherState, action)
  nextState.selectedVerses = selectedVerses(
    nextState.selectedVersions,
    selectedVersesState,
    action
  )

  return nextState
}

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
  return zip(
    ...Object.keys(view.versionVerses).map(version =>
      view.versionVerses[version].map(
        verseId => state.versionVersesById[version][verseId]
      )
    )
  ).map(verse => ({
    index: verse[0].verse,
    versions: verse.map(version => ({
      verseId: version.id,
      text: version.org_text || version.scripture
    }))
  }))
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
    !selectedVersions.map(id => versions.find(version => id === version.id))[0]
      .hasCode
  )
}
