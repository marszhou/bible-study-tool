const verseCount = (state={}) => {
  return state
}

export default verseCount

export const getVerseCountByBookAndChapter = (
  state,
  bookId,
  chapterIndex
) => state[bookId][chapterIndex]
