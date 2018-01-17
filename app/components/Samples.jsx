import { React, PropTypes, cx, Component, Route, Link } from 'app/bootstrap' // eslint-disable-line

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
const Samples = () => {
  return [
    <div key="menu" style={{ position: 'fixed', top: 0, right: 0, zIndex: 1 }}>
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

export default Samples
