import {React, PropTypes} from 'app/bootstrap'; // eslint-disable-line
import styles from "./SideBar.css";
import SideBarItem, { ItemPropType } from "./SiderBarItem";

export default class extends React.Component {
  static propTypes = {
    primaryItems: PropTypes.arrayOf(ItemPropType),
    toolItems: PropTypes.arrayOf(ItemPropType),
    style: PropTypes.object,
  };

  static defaultProps = {
    style: {},
    primaryItems: [],
    toolItems: [],
  };

  render() {
    return (
      <div className={styles.sidebar} style={this.props.style}>
        <div className={styles.sidebarPrimaryItems}>
          {this.props.primaryItems.map(item => (
            <SideBarItem item={item} type="primary" highlighted={false} />
          ))}
        </div>
        <div className={styles.sidebarToolItems}>
          {this.props.toolItems.map(item => (
            <SideBarItem item={item} type="tool" />
          ))}
        </div>
      </div>
    );
  }
}
