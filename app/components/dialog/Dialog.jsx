import { React, PropTypes, cx, Component, Route, Link } from 'app/bootstrap' // eslint-disable-line
import uuid from 'uuid/v1'
import { Icon, Button } from 'semantic-ui-react'
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
    width: PropTypes.number,
    height: PropTypes.number,
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
    width: null,
    height: null,
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
      const { pageX: x, pageY: y } = e
      const bound = this.el.getBoundingClientRect()
      if (
        x < bound.left ||
        x > bound.right ||
        y < bound.top ||
        y > bound.bottom
      ) {
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
      width,
      height,
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
    if (width !== null) {
      style.width = width
    }
    if (height !== null) {
      style.height = height
    }
    const pesudo = {}
    if (backgroundColor) {
      pesudo.background = backgroundColor
    }

    const dialogContent = content && content.length > 0 ? content : children
    const classNames = cx({
      [styles.dialog]: true,
      [styles.dialogOpacity]: transition && open
    })
    const buttons =
      closeButtons.length || cancelButtons.length
        ? [
          <div className={styles.buttonsPlaceholder} key="placeholder" />,
          <div className={styles.buttons} key="buttons">
            {closeButtons.map(btn => (
              <Button
                key={btn}
                positive
                compact
                onClick={() => this.handleClose(false, btn)}
              >
                {btn}
              </Button>
              ))}
            {cancelButtons.map(btn => (
              <Button
                key={btn}
                negative
                compact
                onClick={() => this.handleClose(true, btn)}
              >
                {btn}
              </Button>
              ))}
          </div>
          ]
        : null
    return (
      <div>
        <style>{`dialog#${this.id}::backdrop ${toStyleString(pesudo)}`}</style>
        <dialog
          id={this.id}
          role="button"
          className={classNames}
          style={style}
          ref={el => (this.el = el)}
          onClose={this._handleClose}
          onClick={this.handleClick}
        >
          <a
            className={styles.close}
            href=""
            onClick={e => {
              e.preventDefault()
              this.handleClose(true)
            }}
          >
            <Icon name="window close" size="large" />
          </a>
          {title && <h2 className={styles.title}>{title}</h2>}
          {dialogContent && (
            <div className={styles.content}>{dialogContent}</div>
          )}
          {buttons}
        </dialog>
      </div>
    )
  }
}

export default MessageDialog
