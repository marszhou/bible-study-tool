import { React, PropTypes, cx } from "app/bootstrap"; // eslint-disable-line
import styles from "./SideBar.css";
import SideBarItem, { ItemPropType } from "./SiderBarItem";

export default class extends React.Component {
  static propTypes = {
    primaryItems: PropTypes.arrayOf(ItemPropType),
    toolItems: PropTypes.arrayOf(ItemPropType),
    style: PropTypes.object,
    onItemClick: PropTypes.func,
  };

  static defaultProps = {
    style: {},
    primaryItems: [],
    toolItems: [],
    onItemClick: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      current: -1,
    };
  }

  handleItemClick(type, index, event) {
    if (type === "primary") {
      const { current } = this.state;
      let next = index;
      if (current === index) {
        next = -1;
      }
      this.setState({
        current: next,
      });
    }

    const { onItemClick } = this.props;
    if (onItemClick && typeof onItemClick === "function") {
      onItemClick(type, index, event.nativeEvent);
    }
  }

  render() {
    const size = (this.props.style.width || 48) * 0.8;
    const itemStyle = {
      fontSize: size * 0.5,
      lineHeight: size + "px",
      height: size,
      width: size,
    };
    return (
      <div
        className={cx({ [styles.sideBar]: true })}
        style={{
          ...{ position: "absolute", top: 0, bottom: 0 },
          ...this.props.style,
        }}
      >
        <div className={styles.sideBarPrimaryItems}>
          {this.props.primaryItems.map((item, index) => (
            <SideBarItem
              key={item.key}
              item={item}
              type="primary"
              highlighted={index === this.state.current}
              style={itemStyle}
              onClick={this.handleItemClick.bind(this, "primary", index)}
            />
          ))}
        </div>
        <div className={styles.sideBarToolItems}>
          {this.props.toolItems.map((item, index) => (
            <SideBarItem
              key={item.key}
              item={item}
              type="tool"
              style={itemStyle}
              onClick={this.handleItemClick.bind(this, "tool", index)}
            />
          ))}
        </div>
      </div>
    );
  }
}
