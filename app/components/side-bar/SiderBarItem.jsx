import { React, PropTypes, cx } from 'app/bootstrap'; // eslint-disable-line
import styles from './SideBar.css';

export const PropType_Item = PropTypes.shape({
  text: PropTypes.string,
  icon: PropTypes.string,
  key: PropTypes.string,
});

const SideBarItem = ({
  item,
  style,
  highlighted,
  type,
  onClick = () => {},
}) => {
  return (
    <div
      className={cx({
        [styles.sideBarItem]: true,
        [styles.highlightedItem]: highlighted,
        [type]: true,
      })}
    >
      <i
        className={cx({
          fa: true,
          ['fa-' + item.icon]: true,
          [styles.sideBarItemIcon]: true,
        })}
        aria-hidden="true"
        style={style}
        onClick={onClick}
      />
    </div>
  );
};

export const ItemTypes = ['primary', 'tool'];

SideBarItem.propTypes = {
  item: PropType_Item.isRequired,
  highlighted: PropTypes.bool,
  type: PropTypes.oneOf(ItemTypes),
  style: PropTypes.object,
  onClick: PropTypes.func,
};

SideBarItem.defaultProps = {
  highlighted: false,
  type: ItemTypes[0],
  style: {},
  onClick: null,
};
export default SideBarItem;
