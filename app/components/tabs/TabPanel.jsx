import { React, PropTypes, cx } from 'app/bootstrap'; // eslint-disable-line
import styles from './styles.css';

const TabPanel = ({ children, classNames, style, id }, { selectedId }, ...rest) => {
  return id !== selectedId ? null : (
    <div
      className={cx({
        [styles.tabPanel]: true,
        ...classNames
      })}
      style={style}
    >
      {children}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  classNames: PropTypes.object,
  style: PropTypes.object,
  id: PropTypes.string.isRequired
};

TabPanel.defaultProps = {
  children: null,
  classNames: {},
  style: {}
};

TabPanel.contextTypes = {
  selectedId: PropTypes.string
}

export default TabPanel;
