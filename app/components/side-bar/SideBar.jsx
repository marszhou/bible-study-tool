import { React, PropTypes, cx } from 'app/bootstrap' // eslint-disable-line
import styles from './SideBar.css'
import SideBarItem, { PropType_Item } from './SiderBarItem'

export default class extends React.Component {
  static propTypes = {
    primaryItems: PropTypes.arrayOf(PropType_Item),
    toolItems: PropTypes.arrayOf(PropType_Item),
    style: PropTypes.object,
    onItemClick: PropTypes.func
  }

  static defaultProps = {
    style: {},
    primaryItems: [],
    toolItems: [],
    onItemClick: null
  }

  constructor(props) {
    super(props)
  }

  handleItemClick(type, index, event) {
    const { onItemClick } = this.props
    if (onItemClick && typeof onItemClick === 'function') {
      onItemClick(type, index, event.nativeEvent)
    }
  }

  render() {
    const size = (this.props.style.width || 48) * 0.8
    const itemStyle = {
      fontSize: size * 0.5,
      lineHeight: size + 'px',
      height: size,
      width: size
    }
    const current = 0

    return (
      <div
        className={cx({ [styles.sideBar]: true })}
        style={{
          ...{ position: 'absolute', top: 0, bottom: 0 },
          ...this.props.style
        }}
      >
        <div className={styles.sideBarPrimaryItems}>
          {this.props.primaryItems.map((item, index) => (
            <SideBarItem
              key={item.key}
              item={item}
              type="primary"
              highlighted={index === current}
              style={itemStyle}
              onClick={this.handleItemClick.bind(this, 'primary', index)}
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
              onClick={this.handleItemClick.bind(this, 'tool', index)}
            />
          ))}
        </div>
      </div>
    )
  }
}
