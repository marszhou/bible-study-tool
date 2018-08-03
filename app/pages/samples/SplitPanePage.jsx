import { React, PropTypes, cx, update } from 'app/bootstrap' // eslint-disable-line
import SplitPane from 'react-split-pane'
import uuid from 'uuid/v1'
import { TabPane } from '../../components/tabs'

class SplitPanePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedId: null,
      items: [
        {
          id: '1',
          title: '创合梦含介懂洋京？压雷压牛盖护值祖许幸！',
          content: 'test'
        },
        {
          id: '2',
          title: '住有尼状段赶药办马本够牛授持？利屋局你？',
          content: 'test'
        },
        {
          id: '3',
          title: '民才密鸟七耳哪找打智严刘挥例！愿较言送？',
          content: 'test'
        },
        {
          id: '4',
          title: 'Qui enim soluta et sapiente consequatur praesentium atque.',
          content: 'test'
        },
        {
          id: '5',
          title: 'Qui magna aliquip et ea reprehenderit dolore incididunt anim est exercitation.',
          content: 'test'
        }
      ]
    }
  }

  componentWillMount() {
    if (!this.state.selectedId && this.state.items.length > 0) {
      this.setState({ selectedId: this.state.items[0].id })
    }
  }

  genNewItem() {
    return {
      id: uuid(),
      title: uuid(),
      content: <div>{'test ' + uuid()}</div>
    }
  }

  handleAddClick = () => {
    const nextState = update(this.state, {
      items: {
        $push: [this.genNewItem()]
      }
    })
    if (nextState.items.length === 1) {
      nextState.selectedId = nextState.items[0].id
    }
    this.setState(nextState, this.tabPane.handleResize)
  }

  handleTabClick = itemId => {
    this.setState({
      selectedId: itemId
    })
  }

  handleTabClose = itemId => {
    const { items, selectedId } = this.state
    const nextItems = items.filter(item => item.id !== itemId)
    let nextSelectedId = selectedId
    if (itemId === selectedId) {
      const findIndex = items.findIndex(item => item.id === itemId)
      const neighborItem =
        findIndex - 1 > -1
          ? items[findIndex - 1]
          : findIndex + 1 < items.length
            ? items[findIndex + 1]
            : null
      nextSelectedId = (neighborItem || {}).id
    }
    this.setState(
      {
        items: nextItems,
        selectedId: nextSelectedId
      },
      this.tabPane.handleResize
    )
  }

  handleTabSort = (sourceId, targetId, before) => {
    const { items } = this.state
    const pos = items.findIndex(item => item.id === targetId) + (before ? 0 : 1)
    const source = items.find(item => item.id === sourceId)
    const newItems = [
      ...items.slice(0, pos).filter(item => item.id !== sourceId),
      source,
      ...items.slice(pos).filter(item => item.id !== sourceId)
    ]
    // console.log(items.map(item=>item.id),'->',newItems.map(item => item.id));
    this.setState({ items: newItems })
  }

  render() {
    const { items, selectedId } = this.state

    return (
      <SplitPane
        split="vertical"
        defaultSize={200}
        minSize="100"
        primary="second"
        onChange={() => this.tabPane.handleResize()}
      >
        <div style={{ marginTop: 10 }}>
          <TabPane
            ref={tabPane => (this.tabPane = tabPane)}
            items={items}
            selectedId={selectedId}
            bodyRendererComponent={({ children }) => <div>{children}</div>}
            onTabClick={this.handleTabClick}
            onTabClose={this.handleTabClose}
            onTabSort={this.handleTabSort}
          />
          <button onClick={this.handleAddClick}>add</button>
        </div>
        <div />
      </SplitPane>
    )
  }
}

export default SplitPanePage
