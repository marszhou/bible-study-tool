import Promise from 'bluebird'
import * as db from '../utils/databases'

export const Types = {
  TOGGLE_VERSE: 'TOGGLE_VERSE',
  SET_DISPLAY_INFO: 'SET_DISPLAY_INFO',
  FETCH_VERSES_REQUEST: 'FETCH_VERSES_REQUEST',
  FETCH_VERSES_COMPLETED: 'FETCH_VERSES_COMPLETED',
  SET_VERSIONS: 'SET_VERSIONS',
  SET_IS_DISPLAY_CODE: 'SET_IS_DISPLAY_CODE'
}
export const setDisplayInfo = (tabId, info) => ({
  type: Types.SET_DISPLAY_INFO,
  tabId,
  info
})

export const setVersions = (tabId, versions) =>
  setDisplayInfo(tabId, { versions })

export const displayCode = (tabId, isDisplayCode) =>
  setDisplayInfo(tabId, { isDisplayCode })

export const fetchVersesForChapter = (tabId, bookId, chapter, versions) => (
  dispatch,
  getState
) => {
  dispatch({
    type: Types.FETCH_VERSES_REQUEST,
    tabId
  })
  return Promise.props(
    versions.reduce((promises, version) => {
      return {
        ...promises,
        [version]: db.verse(version).getVerses(bookId, chapter)
      }
    }, {})
  ).then(response => {
    dispatch({
      type: Types.FETCH_VERSES_COMPLETED,
      tabId,
      response
    })
    return response
  })
}

export const selectVerse = verseId => ({
  type: Types.TOGGLE_VERSE,
  verseId
})
