import { React, PropTypes, cx } from 'app/bootstrap'; // eslint-disable-line
import styles from './styles.css';

const TabTitle = (
  { children, classNames, style, id, onClick },
  { selectedId },
) => {
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
};

TabTitle.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  classNames: PropTypes.object,
  style: PropTypes.object,
  id: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

TabTitle.defaultProps = {
  children: null,
  classNames: {},
  style: {},
  onClick: () => {},
};

TabTitle.contextTypes = {
  selectedId: PropTypes.string,
};

export default TabTitle;
