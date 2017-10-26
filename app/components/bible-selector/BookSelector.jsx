import { React, PropTypes, cx } from 'app/bootstrap'; // eslint-disable-line
import BookGroup, { PropType_BookGroup } from './BookGroup';

class BookSelector extends React.Component {
  static propTypes = {
    currentBookId: PropTypes.number,
    bookGroups: PropTypes.arrayOf(PropType_BookGroup),
    onSelect: PropTypes.func,
  };

  static defaultProps = {
    currentBookId: -1,
    bookGroups: [],
    onSelect: () => {},
  };

  render() {
    const { bookGroups, currentBookId, onSelect } = this.props;

    return (
      <div>
        bible selector
        {bookGroups.map(group => (
          <BookGroup
            key={group.id}
            group={group}
            currentBookId={currentBookId}
            onSelect={onSelect}
          />
        ))}
      </div>
    );
  }
}

export default BookSelector;
