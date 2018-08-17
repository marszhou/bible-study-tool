export const Types = {
  SELECT_VERSE: 'SELECT_VERSE',
  SET_DISPLAY_INFO: 'SET_DISPLAY_INFO'
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

}

export const selectVerse = verseId => ({
  type: Types.SELECT_VERSE,
  verseId
})
