import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import Root from './containers/Root'
import { configureStore, history } from './store/configureStore'
import {booksById, bookAllIds, groupsById, groupAllIds, verseCountByBook} from './consts/bible';
import './app.global.css'

const store = configureStore({
  books: { allIds: bookAllIds, byIds: booksById },
  bookGroups: {allIds: groupAllIds, byIds: groupsById},
  verseCount: verseCountByBook
})

render(
  <AppContainer>
    <Root store={store} history={history} />
  </AppContainer>,
  document.getElementById('root')
)

if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    const NextRoot = require('./containers/Root') // eslint-disable-line global-require
    render(
      <AppContainer>
        <NextRoot store={store} history={history} />
      </AppContainer>,
      document.getElementById('root')
    )
  })
}
