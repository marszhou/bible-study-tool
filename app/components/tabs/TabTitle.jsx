import { React, PropTypes, cx, ReactDOM } from 'app/bootstrap' // eslint-disable-line

import { DragSource, DropTarget } from 'react-dnd'
import styles from './styles.css'

const source = {
  beginDrag(props) {
    const { id } = props
    return { sourceId: id }
  },

  endDrag(props, monitor) {
    const { sourceId } = monitor.getItem()
    const didDrop = monitor.didDrop()
    if (didDrop) {
      const { targetId, before } = monitor.getDropResult()
      const { onSort } = props
      if (onSort && typeof onSort === 'function') {
        onSort(sourceId, targetId, before)
      }
    }
  }
}

const target = {
  canDrop({ id: targetId }, monitor) {
    const { sourceId } = monitor.getItem()
    return sourceId !== targetId
  },

  drop({ id }, monitor, component) {
    const targetDOM = ReactDOM.findDOMNode(component)
    const targetRect = targetDOM.getBoundingClientRect()
    const { x } = monitor.getClientOffset()
    const before = x - targetRect.left <= targetRect.width / 2

    return { targetId: id, before }
  },

  hover({ id }, monitor, component) {
    const targetDOM = ReactDOM.findDOMNode(component)
    const targetRect = targetDOM.getBoundingClientRect()
    const { x } = monitor.getClientOffset()
    const before = x - targetRect.left <= targetRect.width / 2
    component.setState({
      overInfo: { id, before }
    })
  }
}

@DragSource('item', source, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))
@DropTarget('item', target, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  isOverCurrent: monitor.isOver({ shallow: true }),
  canDrop: monitor.canDrop(),
  itemType: monitor.getItemType()
}))
export default class TabTitle extends React.Component {
  static propTypes = {
    classNames: PropTypes.object,
    style: PropTypes.object,
    id: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    // connectDragSource: PropTypes.func,
    // connectDropTarget: PropTypes.func,
    onSort: PropTypes.func
  }

  static defaultProps = {
    classNames: {},
    style: {},
    onClick: () => {},
    // connectDragSource: a => a,
    // connectDropTarget: a => a,
    onSort: () => {}
  }

  static contextTypes = {
    selectedId: PropTypes.string
  }

  constructor(props) {
    super(props)
    this.state = {
      overInfo: null
    }
  }

  render() {
    const {
      children,
      classNames,
      style,
      id,
      isOver,
      isOverCurrent,
      canDrop,
      onClick,
      connectDragSource,
      connectDropTarget,
      isDragging
    } = this.props
    const { selectedId } = this.context
    const { overInfo } = this.state
    const overPart = (overInfo && overInfo.before) ? 'overBefore':'overAfter'

    return connectDropTarget(
      connectDragSource(
        <li
          className={cx({
            [styles.tabTitle]: true,
            [styles.tabTitleSelected]: id === selectedId,
            [styles.isDragging]: isDragging,
            [styles.isOver]: isOver,
            [styles[overPart]]: isOver,
            ...classNames
          })}
          style={style}
          onClick={onClick}
          role="button"
        >
          {children}
        </li>
      )
    )
  }
}
