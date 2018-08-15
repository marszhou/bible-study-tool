const verseCount = (state={}) => {
  return state
}

export default verseCount

export const getVerseCountByBookAndChapter = (
  state,
  bookId,
  chapter
) => state[bookId][chapter]
