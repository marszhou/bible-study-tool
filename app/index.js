import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import Root from './Root'
import { configureStore, history } from './store/configureStore'
import {booksById, bookAllIds, groupsById, groupAllIds, verseCountByBook} from './consts/bible';
import './app.global.css'
import { tabAdd } from './actions/layout';

const store = configureStore({
  books: { allIds: bookAllIds, byIds: booksById },
  bookGroups: {allIds: groupAllIds, byIds: groupsById},
  verseCount: verseCountByBook
})

store.dispatch(tabAdd({
  id: '1', title: null
}))

render(
  <AppContainer>
    <Root store={store} history={history} />
  </AppContainer>,
  document.getElementById('root')
)

if (module.hot) {
  module.hot.accept('./Root', () => {
    const NextRoot = require('./Root') // eslint-disable-line global-require
    render(
      <AppContainer>
        <NextRoot store={store} history={history} />
      </AppContainer>,
      document.getElementById('root')
    )
  })
}
