// @flow
import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import counter from './counter'
import books, * as fromBooks from './books'
import bookGroups, * as fromBookGroups from './bookGroups'

const rootReducer = combineReducers({
  counter,
  router,
  books,
  bookGroups
})

type stateType = {
  books: fromBooks.booksStateType,
  bookGroups: fromBookGroups.bookGroupsStateType
};

export default rootReducer

export const getGroupedBooks = (state: stateType, groupId: string | number) =>
  fromBooks.getGroupedBooks(
    state.books,
    fromBookGroups.getBookGroup(state.bookGroups, groupId)
  )
