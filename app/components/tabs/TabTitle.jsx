import { React, PropTypes, cx } from 'app/bootstrap'; // eslint-disable-line
import styles from './styles.css';

class TabTitle extends React.PureComponent {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
    classNames: PropTypes.object,
    style: PropTypes.object,
    id: PropTypes.string.isRequired,
    onClick: PropTypes.func,
  };

  static defaultProps = {
    children: null,
    classNames: {},
    style: {},
    onClick: () => {},
  };

  static contextTypes = {
    selectedId: PropTypes.string,
  };

  render() {
    const { children, classNames, style, id, onClick } = this.props;
    const { selectedId } = this.context;
    return (
      <li
        className={cx({
          [styles.tabTitle]: true,
          [styles.tabTitleSelected]: id === selectedId,
          ...classNames,
        })}
        style={style}
        onClick={onClick}
        role="button"
      >
        {children}
      </li>
    );
  }
}

export default TabTitle;
