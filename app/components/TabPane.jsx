import { React, PropTypes, cx, ReactDOM } from 'app/bootstrap'; // eslint-disable-line
import delay from 'lodash/delay';
import GoChevronLeft from '../vendors/react-icons/lib/go/chevron-left';
import GoChevronRight from '../vendors/react-icons/lib/go/chevron-right';
import {
  Tabs,
  TabControl,
  TabControlList,
  TabHead,
  TabPanel,
  TabPanelList,
  TabTitle,
  TabTitleList,
} from './tabs';

class TabPane extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedId: null,
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
    window.addEventListener('resize', this.handleResize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }

  handleResize = () => {
    console.log('resize')
    this.dealWithTabTitleScroll()
  }

  dealWithTabTitleScroll() {
    this.tabTitleScrollInfo = this.tab.getTabTitleScrollInfo();
    console.log(this.tabTitleScrollInfo);

    const { width, scrollLeft, scrollWidth } = this.tabTitleScrollInfo;
    const showLeftScrollBtn = scrollLeft > 0;
    const showRightScrollBtn = scrollWidth > width + scrollLeft;
    this.setState({ showLeftScrollBtn, showRightScrollBtn }, () => {
      this.tabTitleScrollInfo = this.tab.getTabTitleScrollInfo();
      console.log(this.tabTitleScrollInfo);
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

  render() {
    const { showLeftScrollBtn, showRightScrollBtn } = this.state;
    return (
      <Tabs selectedId={this.state.selectedId} ref={node => (this.tab = node)}>
        <TabHead>
          <TabTitleList>
            {[...Array(50)].map((v, index) => (
              <TabTitle id={index + ''} key={index}>
                {index}
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
        </TabHead>
        <TabPanelList>
          {[...Array(100)].map((v, index) => (
            <TabPanel id={index + ''} key={index}>
              {index}
            </TabPanel>
          ))}
        </TabPanelList>
      </Tabs>
    );
  }
}

export default TabPane;
