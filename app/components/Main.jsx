import { React, PropTypes, cx, Component, Route, Link } from 'app/bootstrap' // eslint-disable-line
import { Switch, Redirect } from 'react-router'
import { withRouter } from 'react-router-dom'
import SideBar from './side-bar/SideBar'
import Samples, {getSampleRoutes} from '../pages/samples'
import { primaryItems, toolItems } from '../consts/siderbar'
import styles from './Main.css'

class Main extends Component {
  handleSidebarClik = (type, index) => {
    if (type === 'primary') {
      this.props.history.push(primaryItems[index].path)
    }
  }

  renderSideBar() {
    return (
      <SideBar
        style={{ width: 48 }}
        onItemClick={this.handleSidebarClik}
        primaryItems={primaryItems}
        toolItems={toolItems}
      />
    )
  }

  renderRoutes() {
    return (
      <div className="bst-content">
        <Switch>
          <Route
            path="/bible"
            component={require('../pages/BibleFramePage')}
          />
          <Route
            exact
            path="/search"
            component={require('../pages/SearchPage')}
          />
          <Route
            exact
            path="/favorite"
            component={require('../pages/FavoritePage')}
          />
          <Route
            exact
            path="/dictionary"
            component={require('../pages/DictionaryPage')}
          />
          {
            getSampleRoutes()
          }
          <Redirect to="/bible" />
        </Switch>
        <Samples />
      </div>
    )
  }

  render() {
    return (
      <div>
        <div className={styles.container} data-tid="container">
          {this.renderSideBar()}
          {this.renderRoutes()}
        </div>
      </div>
    )
  }
}

export default withRouter(Main)
