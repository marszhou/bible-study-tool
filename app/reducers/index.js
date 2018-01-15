// @flow
import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import books, * as fromBooks from './books'
import bookGroups, * as fromBookGroups from './bookGroups'
import verseCount, * as fromVerseCount from './verseCount'

const rootReducer = combineReducers({
  router,
  books,
  bookGroups,
  verseCount
})

export type stateType = {
  books: fromBooks.booksStateType,
  bookGroups: fromBookGroups.bookGroupsStateType,
  verseCount: fromVerseCount.verseCountType
};

export default rootReducer

// ↓↓↓↓ selectors ↓↓↓↓
export const getGroupedBooks = (state: stateType, groupId: string | number) =>
  fromBooks.getGroupedBooks(
    state.books,
    fromBookGroups.getBookGroup(state.bookGroups, groupId)
  )

export const getAllBookGroups = (state: stateType) =>
  fromBookGroups.getAllBookGroups(state.bookGroups)

export const getOldTestmentBooks = (state: stateType) =>
  getGroupedBooks(state, 1)

export const getNewTestmentBooks = (state: stateType) =>
  getGroupedBooks(state, 2)

export const getVerseCountByBookAndChapter = (state: stateType, bookId: string, chapterIndex: string) =>
  fromVerseCount.getVerseCountByBookAndChapter(
    state.verseCount,
    bookId,
    chapterIndex
  )
