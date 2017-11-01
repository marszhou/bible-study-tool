import { React, PropTypes, cx } from 'app/bootstrap'; // eslint-disable-line
import styles from './styles.css';

const TabHead = ({ children, classNames, style }) => {
  return (
    <div
      className={cx({
        [styles.tabHead]: true,
        ...classNames,
      })}
      style={style}
    >
      {children}
      <hr className={styles.tabLine} />
    </div>
  );
};

TabHead.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  classNames: PropTypes.object,
  style: PropTypes.object,
};

TabHead.defaultProps = {
  children: null,
  classNames: {},
  style: {},
};

export default TabHead;
