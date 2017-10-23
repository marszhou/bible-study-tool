import {React, PropTypes} from 'app/bootstrap'; // eslint-disable-line

export const ItemPropType = PropTypes.shape({
  text: PropTypes.string,
  icon: PropTypes.string,
  key: PropTypes.string
});

const SideBarItem = () => {
  return <div>item</div>;
};

export const ItemTypes = ['primary', 'tool'];

SideBarItem.propTypes = {
  item: ItemPropType.isRequired,
  highlighted: PropTypes.bool,
  type: PropTypes.oneOf(ItemTypes)
}

SideBarItem.defaultProps = {
  highlighted: false,
  type: ItemTypes[0]
}
export default SideBarItem;
