import { React, PropTypes, cx, Component, Route, Link } from 'app/bootstrap' // eslint-disable-line

import { Switch } from 'react-router'
import {push} from 'connected-react-router'
import { withRouter } from 'react-router-dom'
import styles from './Main.css'
import GlobalComputedCss from './GlobalComputedCss'
import SideBar from './side-bar/SideBar'
import Samples from '../pages/samples'
import { primaryItems, toolItems } from '../consts/siderbar'

class Main extends Component {
  state = {}

  componentDidMount() {
    const cssLoaded = e => this.setState({ cssLoaded: true })

    Promise.all(
      Array.prototype.slice
        .call(document.querySelectorAll('link[rel="stylesheet"]'))
        .map(
          el =>
            new Promise((resolve, reject) => {
              el.addEventListener('load', () => {
                resolve()
              })
            })
        )
    )
      .then(cssLoaded)
      .catch(cssLoaded)
  }

  handleSidebarClik = (type, index) => {
    if (type === 'primary') {
      push(primaryItems[index].path)
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

  render() {
    const { cssLoaded } = this.state
    return cssLoaded ? (
      <div>
        <div className={styles.container} data-tid="container">
          {this.renderSideBar()}
          <div className="bst-content">
            <Link to='/search'>xxx</Link>
            <Switch>
              <Route exact path="/" render={() => <h1>read</h1>} />
              <Route exact path="/search" render={() => <h1>search</h1>} />
              <Route exact path="/favorite" render={() => <h1>favorite</h1>} />
              <Route exact path="/dictionary" render={() => <h1>dictionary</h1>} />
            </Switch>
            <Samples />
          </div>
          <GlobalComputedCss />
        </div>
      </div>
    ) : null
  }
}

export default withRouter(Main)
