import { React, PropTypes, cx } from 'app/bootstrap'; // eslint-disable-line
import styles from './styles.css';

class Tabs extends React.Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
    selectedId: PropTypes.string,
  };

  static defaultProps = {
    children: null,
    selectedId: null,
  };

  static childContextTypes = {
    selectedId: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  getChildContext() {
    return {
      selectedId: this.props.selectedId || this.getFisrtTabId(),
    };
  }

  getFisrtTabId() {
    const panelList = React.Children
      .toArray(this.props.children)
      .find(child => child.type.displayName === 'TabPanelList');
    if (panelList && panelList.props.children.length > 0) {
      return React.Children.toArray(panelList.props.children)[0].props.id;
    }
    return undefined;
  }

  getTabTitileListDOM() {
    if (!this.tabTitleList) {
      this.tabTitleList = this.dom.querySelector('.' + styles.tabTitleList);
    }
    return this.tabTitleList;
  }

  getTabTitleScrollInfo() {
    const tabTitleList = this.getTabTitileListDOM();
    if (tabTitleList) {
      const width = tabTitleList.getBoundingClientRect().width;
      const { scrollWidth, scrollLeft } = tabTitleList;
      return {
        width,
        scrollWidth,
        scrollLeft,
      };
    }
    return {
      width: 0, scrollWidth: 0, scrollLeft: 0
    }

  }

  scrollTabTitleTo(next) {
    const tabTitleList = this.getTabTitileListDOM();
    tabTitleList.scrollLeft = next;
  }

  render() {
    const { children } = this.props;

    return (
      <div className={styles.tabs} ref={node => (this.dom = node)}>
        {children}
      </div>
    );
  }
}

export default Tabs;
