import { React, PropTypes, cx } from "app/bootstrap"; // eslint-disable-line
import styles from "./SideBar.css";

export const ItemPropType = PropTypes.shape({
  text: PropTypes.string,
  icon: PropTypes.string,
  key: PropTypes.string,
});

const SideBarItem = ({ item, style, highlighted, onClick = () => {} }) => {
  return (
    <div
      className={cx({
        [styles.sideBarItem]: true,
        [styles.highlightedItem]: highlighted,
      })}
    >
      <i
        className={cx({
          fa: true,
          ["fa-" + item.icon]: true,
          [styles.sideBarItemIcon]: true,
        })}
        aria-hidden="true"
        style={style}
        onClick={onClick}
      />
    </div>
  );
};

export const ItemTypes = ["primary", "tool"];

SideBarItem.propTypes = {
  item: ItemPropType.isRequired,
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
