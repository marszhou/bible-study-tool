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
    modal: PropTypes.bool,
    open: PropTypes.bool,
    title: PropTypes.string,
    content: PropTypes.string,
    closeButtons: PropTypes.array,
    cancelButtons: PropTypes.array,
    x: PropTypes.number,
    y: PropTypes.number,
    backgroundColor: PropTypes.string,
    onClose: PropTypes.func
  }

  static defaultProps = {
    title: null,
    content: null,
    modal: true,
    open: false,
    x: null,
    y: null,
    backgroundColor: null,
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
    const { onClose } = this.props
    this.el.close(btn)
    onClose(isCancel, btn)
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
      backgroundColor
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
    return (
      <div>
        <style>{`dialog#${this.id}::backdrop ${toStyleString(pesudo)}`}</style>
        <dialog
          id={this.id}
          className={styles.dialog}
          style={style}
          ref={el => (this.el = el)}
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
