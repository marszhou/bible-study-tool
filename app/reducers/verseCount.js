// @flow
export type verseCountType = {
  [bookId: string]: { [chapterIndex: string]: string }
};

const verseCount = (state: verseCountType = {}) => {
  return state
}

export default verseCount

export const getVerseCountByBookAndChapter = (
  state: verseCountType,
  bookId: string,
  chapterIndex: string
) => state[bookId][chapterIndex]
