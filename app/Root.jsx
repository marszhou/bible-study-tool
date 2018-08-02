import React from 'react'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import { Switch, Route } from 'react-router'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import HomePage from './pages/HomePage';

class Root extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { store, history } = this.props;
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
