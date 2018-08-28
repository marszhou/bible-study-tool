import Promise from 'bluebird'
import * as db from '../utils/databases'
import { bibleSelectors } from 'app/reducers';

export const Types = {
  TOGGLE_VERSE: 'TOGGLE_VERSE',
  SET_DISPLAY_INFO: 'SET_DISPLAY_INFO',
  FETCH_VERSES_REQUEST: 'FETCH_VERSES_REQUEST',
  FETCH_VERSES_COMPLETED: 'FETCH_VERSES_COMPLETED',
  TOGGLE_VERSION: 'TOGGLE_VERSION',
  SET_IS_DISPLAY_CODE: 'SET_IS_DISPLAY_CODE'
}

export const toggleVersion = (tabId, version) => ({
  type: Types.TOGGLE_VERSION,
  tabId,
  version
})

export const setIsDisplayCode = (tabId, isDisplayCode) => ({
  type: Types.SET_IS_DISPLAY_CODE,
  tabId,
  isDisplayCode
})

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

export const selectVerse = ({verseId, version}) => ({
  type: Types.TOGGLE_VERSE,
  verseId,
  version // explicitly
})
