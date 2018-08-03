import { React, PropTypes, cx, ReactDOM } from "app/bootstrap"; // eslint-disable-line
import "./Modal.css";

let modalRoot = document.getElementById('modal-root');
if (!modalRoot) {
  modalRoot = document.createElement('div');
  modalRoot.setAttribute('id', 'modal-root');
  document.body.appendChild(modalRoot);
}

class Modal extends React.Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ])
  }
  static defaultProps = {
    children: null
  }
  constructor(props) {
    super(props);
    this.state = {}
    this.el = document.createElement('div');
  }

  componentDidMount() {
    // Append the element into the DOM on mount. We'll render
    // into the modal container element (see the HTML tab).
    modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    // Remove the element from the DOM when we unmount
    modalRoot.removeChild(this.el);
  }

  render() {
    // Use a portal to render the children into the element
    return ReactDOM.createPortal(
      // Any valid React child: JSX, strings, arrays, etc.
      <div className="modal">{this.props.children}</div>,
      // A DOM element
      this.el,
    );
  }
}

export default Modal;
