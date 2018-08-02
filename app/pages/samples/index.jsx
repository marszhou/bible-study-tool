import { React, PropTypes, cx, Component, Route, Link } from 'app/bootstrap' // eslint-disable-line

const sampleRoutes = [
  {
    path: '/samples/bible-selector-demo',
    exact: true,
    name: 'bible-selector-demo',
    component: require('./BibleSelectorPage')
  },
  {
    path: '/samples/read-demo',
    exact: true,
    name: 'read-demo',
    component: require('./ReadPage')
  },
  {
    path: '/samples/icon-page',
    exact: true,
    name: 'icon-page',
    component: require('./IconPage')
  },
  {
    path: '/samples/split-pane-page',
    exact: true,
    name: 'split-pane-page',
    component: require('./SplitPanePage')
  },
  {
    path: '/samples/sqlite-page',
    exact: true,
    name: 'sqlite-page',
    component: require('./SqliteDemoPage')
  },
  {
    path: '/samples/common-components-page',
    exact: true,
    name: 'common-components',
    component: require('./CommomComponentPage')
  },
  {
    path: '/samples/dialog-page',
    exact: true,
    name: 'dialog',
    component: require('./DialogPage')
  },
  // {
  //   path: '/samples/read',
  //   exact: true,
  //   name: 'read',
  //   component: require('./Read')
  // }
]
const Samples = () => {
  return [
    <div key="menu" style={{ position: 'fixed', bottom: 0, right: 0, zIndex: 1 }}>
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
