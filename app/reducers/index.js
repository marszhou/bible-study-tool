import { combineReducers } from 'redux'
import books, * as fromBooks from './books'
import bookGroups, * as fromBookGroups from './bookGroups'
import verseCount, * as fromVerseCount from './verseCount'
import layout, * as fromLayout from './layout'

const rootReducer = combineReducers({
  books,
  bookGroups,
  verseCount,
  layout
})

export default rootReducer

// ↓↓↓↓ selectors ↓↓↓↓
export const getGroupedBooks = (state, groupId) =>
  fromBooks.getGroupedBooks(
    state.books,
    fromBookGroups.getBookGroup(state.bookGroups, groupId)
  )

export const getAllBookGroups = (state) =>
  fromBookGroups.getAllBookGroups(state.bookGroups)

export const getOldTestmentBooks = (state) =>
  getGroupedBooks(state, 1)

export const getNewTestmentBooks = (state) =>
  getGroupedBooks(state, 2)

export const getVerseCountByBookAndChapter = (state, bookId, chapterIndex) =>
  fromVerseCount.getVerseCountByBookAndChapter(
    state.verseCount,
    bookId,
    chapterIndex
  )
