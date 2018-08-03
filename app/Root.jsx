import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { Switch, Route } from 'react-router'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import HomePage from './pages/HomePage'

import db from './utils/databases'
;

(async function() {
  console.log(await db.book.all())
  console.log(await db.bookGroup.all())
  console.log(await db.bookGroupSet.getBooksByGroup(1153220277234))
  console.log(await db.verse('cuvs').get(1)),
  console.log(await db.verse('lzz').get(1))
  console.log(await db.verse('cuvs').getVerses(1153072783907, 1))
  console.log(await db.verseCount.getCount(1153072783907, 1))
  console.log(await db.dictionary('en').get('H0001'))
  console.log(await db.dictionary('cn').get('H0001'))
})()

class Root extends React.Component {

  static propTypes = {
    store: PropTypes.any.isRequired,
    history: PropTypes.any.isRequired,
  }

  constructor(props) {
    super(props)
  }

  render() {
    const { store, history } = this.props
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" component={HomePage} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    )
  }
}

export default DragDropContext(HTML5Backend)(Root)
