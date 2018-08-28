import React, { Component } from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import { v1 } from 'uuid'
import { connect } from 'react-redux'
import * as layoutActions from '../actions/layout'
import { layoutSelectors } from '../reducers'
import { TabPane } from '../components/tabs'
import { getTabTitle } from 'app/components/bible-selector/BibleSelector'

class BibleFramePage extends Component {
  componentDidMount() {
    const { tabs, tabRecoverActivated, tabNew, tabUpdate } = this.props
    if (tabs.length === 0) {
      const tabId = tabNew()
      tabUpdate(tabId, {bookId: 1153072783907, chapter: 1})
    } else {
      tabRecoverActivated()
    }
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
      <div className="client-height">
        <div style={{ marginTop: 10, height: '100%' }}>
          {tabs.length > 0
            ? [
              <TabPane
                key="tab"
                ref={tabPane => (this.tabPane = tabPane)}
                items={tabs}
                selectedId={activated}
                bodyRendererComponent={({ children }) => (
                  <div>{children}</div>
                  )}
                onTabClick={tabActivate}
                onTabClose={tabRemove}
                onTabSort={this.handleTabSort}
                onAdd={() => tabNew()}
              />,
              <Route
                key="view"
                path={`${match.path}/:tabId/:bookId?/:chapter?/:verse?`}
                component={require('./BibleViewPage')}
              />
              ]
            : null}
        </div>
      </div>
    )
  }
}

BibleFramePage = connect(
  state => {
    const tabs = layoutSelectors
      .getTabs(state)
      .map(tabItem => ({ ...tabItem, title: getTabTitle(tabItem) }))

    return {
      tabs,
      activated: layoutSelectors.getActivated(state)
    }
  },
  layoutActions
)(BibleFramePage)

export default BibleFramePage
