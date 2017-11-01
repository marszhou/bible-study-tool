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
    return React.Children.toArray(
      React.Children
        .toArray(this.props.children)
        .find(child => child.type.displayName === 'TabPanelList').props.children,
    )[0].props.id;
  }

  render() {
    const { children } = this.props;

    return <div className={styles.tabs}>{children}</div>;
  }
}

export default Tabs;
