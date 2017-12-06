import { React, PropTypes, cx, ReactDOM } from 'app/bootstrap'; // eslint-disable-line
import delay from 'lodash/delay';
import GoChevronLeft from '../../vendors/react-icons/lib/go/chevron-left';
import GoChevronRight from '../../vendors/react-icons/lib/go/chevron-right';
import TiDelete from '../../vendors/react-icons/lib/ti/delete';
import {
  Tabs,
  TabControl,
  TabControlList,
  TabHead,
  TabPanel,
  TabPanelList,
  TabTitle,
  TabTitleList,
} from './index';
import styles from './styles.css';

// main index component
class TabPane extends React.Component {
  static propTypes = {
    items: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.any,
        title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
        props: PropTypes.object,
      }),
    ),
    bodyRendererComponent: PropTypes.func.isRequired,
    selectedId: PropTypes.string,
    onTabClick: PropTypes.func,
    onTabClose: PropTypes.func,
    onTabSort: PropTypes.func,
  };

  static defaultProps = {
    items: [],
    selectedId: null,
    onTabClick: () => {},
    onTabClose: () => {},
    onTabSort: () => {},
  };

  constructor(props) {
    super(props);
    this.state = {
      showLeftScrollBtn: false,
      showRightScrollBtn: false,
    };
    this.tabTitleScrollInfo = {
      width: 0,
      scrollWidth: 0,
      scrollLeft: 0,
    };
  }

  componentDidMount() {
    delay(() => this.dealWithTabTitleScroll());
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    this.dealWithTabTitleScroll();
  };

  dealWithTabTitleScroll() {
    this.tabTitleScrollInfo = this.tab.getTabTitleScrollInfo();

    const { width, scrollLeft, scrollWidth } = this.tabTitleScrollInfo;
    const showLeftScrollBtn = scrollLeft > 0;
    const showRightScrollBtn = scrollWidth > width + scrollLeft;
    this.setState({ showLeftScrollBtn, showRightScrollBtn }, () => {
      this.tabTitleScrollInfo = this.tab.getTabTitleScrollInfo();
    });
  }

  handleScrollTabTitle(direction) {
    const { width, scrollLeft, scrollWidth } = this.tabTitleScrollInfo;
    const scrollStep = width / 3;

    let nextScrollLeft = scrollLeft + direction * scrollStep;
    nextScrollLeft =
      nextScrollLeft < 0
        ? 0
        : nextScrollLeft + width > scrollWidth
          ? scrollWidth - width
          : nextScrollLeft;
    this.tab.scrollTabTitleTo(nextScrollLeft);
    this.dealWithTabTitleScroll();
  }

  handleTabClick(id) {
    this.setState({
      selectedId: id,
    });
  }

  handleTabClose(e, id) {
    e.preventDefault();
    e.stopPropagation();

    this.props.onTabClose(id);
  }

  renderItemContent(item, index) {
    const { bodyRendererComponent: Body } = this.props;
    return <Body {...item.props} />;
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
        <TiDelete />
      </a>,
    ];
  }

  render() {
    const { showLeftScrollBtn, showRightScrollBtn } = this.state;
    const { selectedId, items, onTabClick, onTabSort } = this.props;
    return (
      <Tabs selectedId={selectedId} ref={node => (this.tab = node)}>
        {items.length > 0
          ? [
            <TabHead key="tabHead">
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
              {showLeftScrollBtn || showRightScrollBtn ? (
                <TabControlList type="rear">
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
            </TabHead>,
            <TabPanelList key="tabBody">
              {items.map((item, index) => (
                <TabPanel id={item.id} key={item.id}>
                  {this.renderItemContent(item, index)}
                </TabPanel>
                ))}
            </TabPanelList>,
            ]
          : null}
      </Tabs>
    );
  }
}

export default TabPane;
