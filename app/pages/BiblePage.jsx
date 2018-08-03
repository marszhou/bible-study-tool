import React, { Component } from 'react'
import { v1 } from 'uuid'
import { connect } from 'react-redux'
import * as layoutActions from '../actions/layout'
import { layoutSelectors } from '../reducers'
import { TabPane } from '../components/tabs'
import getConnectedBibleView from '../components/bible-view/BibleView'

class BiblePage extends Component {
  componentWillMount() {
    this.props.tabInit(this.createTabItem())
  }

  createTabItem() {
    return {
      id: v1()
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
      actived,
      tabAdd,
      tabSort,
      tabRemove,
      tabActivate
    } = this.props

    return (
      <div style={{ marginTop: 10 }}>
        <TabPane
          ref={tabPane => (this.tabPane = tabPane)}
          items={tabs}
          selectedId={actived}
          bodyRendererComponent={({ children }) => <div>{children}</div>}
          onTabClick={tabActivate}
          onTabClose={tabRemove}
          onTabSort={this.handleTabSort}
          onAdd={() => tabAdd(this.createTabItem())}
        />
      </div>
    )
  }
}

BiblePage = connect(
  state => {
    return {
      tabs: layoutSelectors.getTabs(state),
      actived: layoutSelectors.getActived(state)
    }
  },
  layoutActions
)(BiblePage)

export default BiblePage
