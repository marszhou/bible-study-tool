import React, { Component } from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import { v1 } from 'uuid'
import { connect } from 'react-redux'
import * as layoutActions from '../actions/layout'
import { layoutSelectors } from '../reducers'
import { TabPane } from '../components/tabs'
import getConnectedBibleView from 'app/components/bible-view/BibleView'

class BibleFramePage extends Component {
  componentDidMount() {
    const { tabs, history, match, tabRecoverActivated, tabNew } = this.props
    if (tabs.length === 0) {
      tabNew()
    } else {
      tabRecoverActivated()
    }
  }

  handleItemRenderer = item => {
    const BibleView = getConnectedBibleView(item.id)
    return <BibleView />
  }

  handleTabSort = (sourceId, targetId, before) => {
    const { tabs, tabSort } = this.props

    const items = tabs
    const pos = items.findIndex(item => item.id === targetId) + (before ? 0 : 1)
    const source = items.find(item => item.id === sourceId)
    const newItems = [
      ...items.slice(0, pos).filter(item => item.id !== sourceId),
      source,
      ...items.slice(pos).filter(item => item.id !== sourceId)
    ]
    tabSort(newItems.map(item => item.id))
  }

  render() {
    const {
      tabs,
      activated,
      tabNew,
      tabSort,
      tabRemove,
      tabActivate,
      match
    } = this.props
    return (
      <div style={{ marginTop: 10 }}>
        {tabs.length > 0
          ? [
            <TabPane
              key="tab"
              ref={tabPane => (this.tabPane = tabPane)}
              items={tabs}
              selectedId={activated}
              bodyRendererComponent={({ children }) => <div>{children}</div>}
              onTabClick={tabActivate}
              onTabClose={tabRemove}
              onTabSort={this.handleTabSort}
              onAdd={() => tabNew()}
            />,
            <Route
              key="view"
              path={`${match.path}/:tabId/:bookId?/:chapterIndex?`}
              component={require('./BibleViewPage')}
            />
            ]
          : null}
      </div>
    )
  }
}

BibleFramePage = connect(
  state => {
    return {
      tabs: layoutSelectors.getTabs(state),
      activated: layoutSelectors.getActivated(state)
    }
  },
  layoutActions
)(BibleFramePage)

export default BibleFramePage
