import { React, PropTypes, cx, Component, Route, Link } from 'app/bootstrap' // eslint-disable-line
import uuid from 'uuid/v1'
import styles from './style.css'

const toStyleString = style => {
  return `{
    ${Object.keys(style)
      .map(key => `${key}: ${style[key]}`)
      .join(';')}
  }`
}

class MessageDialog extends Component {
  static propTypes = {
    transition: PropTypes.bool,
    modal: PropTypes.bool,
    open: PropTypes.bool,
    title: PropTypes.string,
    content: PropTypes.string,
    closeWhenClickOutside: PropTypes.bool,
    closeButtons: PropTypes.array,
    cancelButtons: PropTypes.array,
    x: PropTypes.number,
    y: PropTypes.number,
    backgroundColor: PropTypes.string,
    onClose: PropTypes.func
  }

  static defaultProps = {
    transition: true,
    title: null,
    content: null,
    modal: true,
    open: false,
    x: null,
    y: null,
    backgroundColor: null,
    closeWhenClickOutside: true,
    closeButtons: ['OK'],
    cancelButtons: ['Cancel'],
    onClose: () => {},
    onCancel: () => {}
  }

  constructor(props) {
    super(props)
    this.id = 'dialog-' + uuid()
  }

  componentDidMount() {
    const { modal, open } = this.props
    if (open) {
      this._open(modal)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.open !== this.props.open && nextProps.open) {
      this._open(nextProps.modal)
    }
  }

  handleClose = (isCancel, btn) => {
    this.el.close(JSON.stringify({ isCancel, btn }))
  }

  _handleClose = e => {
    e.stopPropagation()
    const { onClose } = this.props
    let ret
    try {
      ret = JSON.parse(this.el.returnValue)
    } catch (e) {
      ret = { isCancel: true }
    }
    onClose(ret)
  }

  handleClick = e => {
    if (!(this.props.modal && this.props.closeWhenClickOutside)) {
      return
    }
    if (e.target === this.el) {
      const {pageX: x, pageY: y} = e
      const bound = this.el.getBoundingClientRect()
      if ((x < bound.left || x > bound.left + bound.width) || (y < bound.top || y > bound.bottom)) {
        this.el.close()
      }
    }
  }

  _open(modal) {
    if (modal) {
      this.el.showModal()
    } else {
      this.el.show()
    }
  }

  render() {
    const {
      title,
      content,
      children,
      closeButtons,
      cancelButtons,
      x,
      y,
      backgroundColor,
      open,
      transition
    } = this.props

    const style = {}
    if (x !== null) {
      style.left = x + 'px'
    }
    if (y !== null) {
      style.top = y + 'px'
    }
    if (style.left) {
      style.margin = 0
    }

    const pesudo = {}
    if (backgroundColor) {
      pesudo.background = backgroundColor
    }

    const dialogContent = content && content.length > 0 ? content : children
    const classNames = cx({
      [styles.dialog]: true,
      [styles.dialogScale]: transition && open
    })
    return (
      <div>
        <style>{`dialog#${this.id}::backdrop ${toStyleString(pesudo)}`}</style>
        <dialog
          id={this.id}
          role='button'
          className={classNames}
          style={style}
          ref={el => (this.el = el)}
          onClose={this._handleClose}
          onClick={this.handleClick}
        >
          {title && <div className={styles.title}>{title}</div>}
          {dialogContent && (
            <div className={styles.content}>{dialogContent}</div>
          )}
          <div className={styles.buttons}>
            {closeButtons.map(btn => (
              <button
                key={btn}
                type="button"
                onClick={() => this.handleClose(false, btn)}
              >
                {btn}
              </button>
            ))}
            {cancelButtons.map(btn => (
              <button
                key={btn}
                type="button"
                onClick={() => this.handleClose(true, btn)}
              >
                {btn}
              </button>
            ))}
          </div>
        </dialog>
      </div>
    )
  }
}

export default MessageDialog
