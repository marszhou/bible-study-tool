import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import { Switch, Route } from 'react-router'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import HomePage from './pages/HomePage'

import db from './utils/databases'
;

(async function() {
  console.log(await db.book.all())
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
