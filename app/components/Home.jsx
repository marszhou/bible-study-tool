import { React, PropTypes, cx, Component, Route, Link } from 'app/bootstrap' // eslint-disable-line
import styles from './Home.css'
import GlobalComputedCss from './GlobalComputedCss'
import SideBar from './side-bar/SideBar'

const sampleRoutes = [
  {
    path: '/bible-selector-demo',
    exact: true,
    name: 'bible-selector-demo',
    component: require('../pages/BibleSelectorPage')
  },
  {
    path: '/read-demo',
    exact: true,
    name: 'read-demo',
    component: require('../pages/ReadPage')
  },
  {
    path: '/icon-page',
    exact: true,
    name: 'icon-page',
    component: require('../pages/IconPage')
  },
  {
    path: '/split-pane-page',
    exact: true,
    name: 'split-pane-page',
    component: require('../pages/SplitPanePage')
  },
  {
    path: '/sqlite-page',
    exact: true,
    name: 'sqlite-page',
    component: require('../pages/SqliteDemoPage')
  },
  {
    path: '/samples/common-components-page',
    exact: true,
    name: 'common-components',
    component: require('../pages/samples/CommomComponentPage')
  }
]

export default class Home extends Component {
  renderSampleRoutes() {
    return [
      <div
        key="menu"
        style={{ position: 'fixed', top: 0, right: 0, zIndex: 1 }}
      >
        <ul>
          <li>
            <Link to="/">home</Link>
          </li>
          {sampleRoutes.map(route => (
            <li key={route.name}>
              <Link to={route.path}>{route.name}</Link>
            </li>
          ))}
        </ul>
      </div>,
      ...sampleRoutes.map(route => {
        const params = { ...route, key: route.name }
        return <Route {...params} />
      })
    ]
  }

  renderSideBar() {
    return (
      <SideBar
        style={{ width: 48 }}
        onItemClick={(type, index) => console.log(type, index)}
        primaryItems={[
          {
            text: '圣经',
            icon: 'book',
            key: 'book'
          },
          {
            text: '搜索',
            icon: 'search',
            key: 'search'
          },
          {
            text: '我的收藏',
            icon: 'star',
            key: 'favorite'
          },
          {
            text: '原文字典',
            icon: 'font',
            key: 'origin'
          }
        ]}
        toolItems={[
          {
            text: 'GitHub',
            icon: 'github',
            key: 'github'
          },
          {
            text: '设置',
            icon: 'cog',
            key: 'preference'
          }
        ]}
      />
    )
  }

  render() {
    return (
      <div>
        <div className={styles.container} data-tid="container">
          {this.renderSideBar()}
          <div className="content">{this.renderSampleRoutes()}</div>
          <GlobalComputedCss />
        </div>
      </div>
    )
  }
}
