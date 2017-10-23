import { React, PropTypes, cx } from "app/bootstrap"; // eslint-disable-line
// import { remote } from "electron";
import styles from "./SideBar.css";
import SideBarItem, { ItemPropType } from "./SiderBarItem";
// const { remote } = require("electron");
// console.log(remote);

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
    const size = (this.props.style.width || 48) * 0.8;
    return (
      <div
        className={cx({ [styles.sideBar]: true })}
        style={Object.assign(
          { position: "absolute", top: 0, bottom: 0 },
          this.props.style,
        )}
      >
        <div className={styles.sideBarPrimaryItems}>
          {this.props.primaryItems.map(item => (
            <SideBarItem
              key={item.key}
              item={item}
              type="primary"
              highlighted={false}
              style={{ fontSize: size * 0.5, lineHeight: size+'px', height: size, width: size }}
            />
          ))}
        </div>
        <div className={styles.sideBarToolItems}>
          {this.props.toolItems.map(item => (
            <SideBarItem key={item.key} item={item} type="tool" />
          ))}
        </div>
      </div>
    );
  }
}
