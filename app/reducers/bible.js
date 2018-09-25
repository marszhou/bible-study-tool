import { combineReducers } from 'redux'
import zip from 'lodash/zip'
import { Types } from '../actions/bible'
import { Types as LayoutTypes } from '../actions/layout'
import versions, { sortVersions, getVersion } from 'app/consts/versions'
import { stripCode } from 'app/components/bible-display/utils'
import { getBook } from 'app/consts/bible'

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

const selectedVerses = (state = [], action) => {
  switch (action.type) {
    case Types.TOGGLE_VERSE:
      return state.indexOf(action.index) === -1
        ? [...state, action.index]
        : state.filter(vid => vid !== action.index)
    case Types.CLEAN_VERSE_SELECTION:
      return []
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
          [version]: action.response[version].map(verse => getVerseId(verse))
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
  versionVerses,
  selectedVerses
})

const views = (state = {}, action) => {
  switch (action.type) {
    case 'TAB_REMOVE': {
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
      [getVerseId(verse)]: verse
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

//
const getVerseId = verse => `${verse.book_id}_${verse.chapter}_${verse.verse}`

// selectors
export const getVersesByTabId = (state, tabId) => {
  const view = state.views[tabId]
  const selectedVersions = getVersionsByTabId(state, tabId)
  const currentVersions = sortVersions(
    Object.keys(view.versionVerses).filter(
      v => selectedVersions.indexOf(v) > -1
    )
  )
  return zip(
    ...currentVersions.map(version =>
      view.versionVerses[version].map(verseId => ({
        ...state.versionVersesById[version][verseId],
        version
      }))
    )
  ).map(verse => ({
    index: verse[0].verse,
    versions: verse.map(version => ({
      version: version.version,
      verseId: version.id,
      text: version.org_text || version.scripture
    }))
  }))
}
export const getSelectedVersesByTabId = (state, tabId) =>
  [...state.views[tabId].selectedVerses].sort((a, b) => (a < b ? -1 : 1))
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
export const getCopyVerseText = (state, bookId, chapter, selectedVerses, versions) => {
  const verses = selectedVerses.reduce((ret, index) => {
    ret[index] = versions.reduce((ret2, version) => {
      ret2[version] = state.versionVersesById[version][getVerseId({
        book_id: bookId, chapter, verse: index
      })]
      return ret2
    }, {})
    return ret
  }, {})

  // const versions = getVersions()

  return Object.keys(verses)
    .map(index => {
      return Object.keys(verses[index])
        .map(version => {
          const verse = verses[index][version]
          const book = getBook(verse.book_id)
          const versionName =
            versions.length > 1 ? `[${getVersion(version).name}] ` : ''
          return `${versionName}${book.abbr_cn}${verse.chapter}:${
            verse.verse
          } ${stripCode(verse.scripture)}`
        })
        .join('\n')
    })
    .join('\n')
}
