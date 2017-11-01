import { React, PropTypes, cx } from 'app/bootstrap'; // eslint-disable-line
import styles from './styles.css';

const TabControlList = ({ children, type, classNames, style }) => {
  return (
    <ul
      className={cx({
        [styles.tabControlList]: true,
        [styles[`tabControlList_${type}`]]: true,
        ...classNames,
      })}
      style={style}
    >
      {children}
    </ul>
  );
};

TabControlList.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  classNames: PropTypes.object,
  style: PropTypes.object,
  type: PropTypes.oneOf(['front', 'rear'])
};

TabControlList.defaultProps = {
  children: null,
  classNames: {},
  style: {},
  type: 'front'
};

export default TabControlList;
