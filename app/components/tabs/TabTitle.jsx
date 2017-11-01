import { React, PropTypes, cx } from 'app/bootstrap'; // eslint-disable-line
import styles from './styles.css';

const TabTitle = ({ children, classNames, style, id }, { selectedId }) => {
  return (
    <li
      className={cx({
        [styles.tabTitle]: true,
        [styles.tabTitleSelected]: id === selectedId,
        ...classNames
      })}
      style={style}
    >
      {children}
    </li>
  );
};

TabTitle.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  classNames: PropTypes.object,
  style: PropTypes.object,
  id: PropTypes.string.isRequired
};

TabTitle.defaultProps = {
  children: null,
  classNames: {},
  style: {},
};

TabTitle.contextTypes = {
  selectedId: PropTypes.string
}

export default TabTitle;
