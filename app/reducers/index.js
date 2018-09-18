import { combineReducers } from 'redux'
import books, * as fromBooks from './books'
import bookGroups, * as fromBookGroups from './bookGroups'
import verseCount, * as fromVerseCount from './verseCount'
import layout, * as fromLayout from './layout'
import bible, * as fromBible from './bible'
import toolbar, * as fromToolbar from './toolbar'
import dictionary, * as fromDictionary from './dictionary'

const rootReducer = combineReducers({
  books,
  bookGroups,
  verseCount,
  layout,
  bible,
  toolbar,
  dictionary
})

export default rootReducer

// ↓↓↓↓ selectors ↓↓↓↓
const makeGroupSelectors = (namespace, statePath) =>
  _.keys(namespace).reduce(
    (ret, name) => ({
      ...ret,
      [name]: (state, ...args) => namespace[name](_.get(state, statePath), ...args)
    }),
    {}
  )

export const layoutSelectors = makeGroupSelectors(fromLayout, 'layout')
export const bibleSelectors = makeGroupSelectors(fromBible, 'bible')
export const toolbarSelectors = makeGroupSelectors(fromToolbar, 'toolbar')
export const dictionarySelectors = makeGroupSelectors(fromDictionary, 'dictionary')

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

export const getVerseCountByBookAndChapter = (state, bookId, chapter) =>
  fromVerseCount.getVerseCountByBookAndChapter(
    state.verseCount,
    bookId,
    chapter
  )
