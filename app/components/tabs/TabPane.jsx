import { React, PropTypes, cx, ReactDOM } from 'app/bootstrap' // eslint-disable-line
import delay from 'lodash/delay'
import { Icon } from 'semantic-ui-react'
import GoChevronLeft from '../../vendors/react-icons/lib/go/chevron-left'
import GoChevronRight from '../../vendors/react-icons/lib/go/chevron-right'
import GoDiffAdded from '../../vendors/react-icons/lib/md/add'
import {
  Tabs,
  TabControl,
  TabControlList,
  TabHead,
  TabPanel,
  TabPanelList,
  TabTitle,
  TabTitleList
} from './index'
import styles from './styles.css'

// main index component
class TabPane extends React.Component {
  static propTypes = {
    items: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.any,
        title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
        content: PropTypes.oneOfType([PropTypes.element, PropTypes.string])
      })
    ),
    bodyRendererComponent: PropTypes.func.isRequired,
    selectedId: PropTypes.string,
    onTabClick: PropTypes.func,
    onTabClose: PropTypes.func,
    onTabSort: PropTypes.func,
    onAdd: PropTypes.func
  }

  static defaultProps = {
    items: [],
    selectedId: null,
    onTabClick: () => {},
    onTabClose: () => {},
    onTabSort: () => {},
    onAdd: () => {}
  }

  constructor(props) {
    super(props)
    this.state = {
      showLeftScrollBtn: false,
      showRightScrollBtn: false
    }
    this.tabTitleScrollInfo = {
      width: 0,
      scrollWidth: 0,
      scrollLeft: 0
    }
  }

  componentDidMount() {
    delay(() => this.dealWithTabTitleScroll())
    window.addEventListener('resize', this.handleResize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }

  handleResize = () => {
    this.dealWithTabTitleScroll()
  }

  dealWithTabTitleScroll() {
    this.tabTitleScrollInfo = this.tab.getTabTitleScrollInfo()

    const { width, scrollLeft, scrollWidth } = this.tabTitleScrollInfo
    const showLeftScrollBtn = scrollLeft > 0
    const showRightScrollBtn = scrollWidth > width + scrollLeft
    this.setState({ showLeftScrollBtn, showRightScrollBtn }, () => {
      this.tabTitleScrollInfo = this.tab.getTabTitleScrollInfo()
    })
  }

  handleScrollTabTitle(direction) {
    const { width, scrollLeft, scrollWidth } = this.tabTitleScrollInfo
    const scrollStep = width / 3

    let nextScrollLeft = scrollLeft + direction * scrollStep
    nextScrollLeft =
      nextScrollLeft < 0
        ? 0
        : nextScrollLeft + width > scrollWidth
          ? scrollWidth - width
          : nextScrollLeft
    this.tab.scrollTabTitleTo(nextScrollLeft)
    this.dealWithTabTitleScroll()
  }

  handleTabClick(id) {
    this.setState({
      selectedId: id
    })
  }

  handleTabClose(e, id) {
    e.preventDefault()
    e.stopPropagation()

    this.props.onTabClose(id)
  }

  renderItemContent(item) {
    const { bodyRendererComponent: Body } = this.props
    return <Body>{item.content}</Body>
  }

  renderItemTitle(item) {
    return [
      <span key="content">{item.title}</span>,
      <a
        key="close"
        className={styles.close}
        role="button"
        tabIndex="0"
        href="###"
        onClick={e => this.handleTabClose(e, item.id)}
      >
        <Icon name="window close" size="small" />
      </a>
    ]
  }

  render() {
    const { showLeftScrollBtn, showRightScrollBtn } = this.state
    const { selectedId, items, onTabClick, onTabSort, onAdd } = this.props
    return (
      <Tabs selectedId={selectedId} ref={node => (this.tab = node)}>
        <TabHead key="tabHead">
          {showLeftScrollBtn || showRightScrollBtn ? (
            <TabControlList type="front">
              <TabControl>
                <button
                  onClick={() => this.handleScrollTabTitle(-1)}
                  disabled={!showLeftScrollBtn}
                >
                  <GoChevronLeft />
                </button>
              </TabControl>
              <TabControl>
                <button
                  onClick={() => this.handleScrollTabTitle(1)}
                  disabled={!showRightScrollBtn}
                >
                  <GoChevronRight />
                </button>
              </TabControl>
            </TabControlList>
          ) : null}
          <TabTitleList>
            {items.map(item => (
              <TabTitle
                id={item.id}
                key={item.id}
                onClick={() => onTabClick(item.id)}
                onSort={onTabSort}
              >
                {this.renderItemTitle(item)}
              </TabTitle>
            ))}
          </TabTitleList>
          <TabControlList type="front">
            <TabControl>
              <button onClick={onAdd}><GoDiffAdded /></button>
            </TabControl>
          </TabControlList>
        </TabHead>
        <TabPanelList key="tabBody">
          {items.map((item, index) => (
            <TabPanel id={item.id} key={item.id}>
              {this.renderItemContent(item, index)}
            </TabPanel>
          ))}
        </TabPanelList>
      </Tabs>
    )
  }
}

export default TabPane
