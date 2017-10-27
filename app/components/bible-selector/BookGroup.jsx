import { React, PropTypes, cx } from 'app/bootstrap'; // eslint-disable-line
import Book, { PropType_Book } from './Book';
import styles from './BibleSelector.css'

const BookGroup = ({ group, currentBookId, onSelect }) => {
  return (
    <div className={styles.bookGroup}>
      <div className={styles.title}>{group.name}</div>
      <ul>
        {group.books.map(book => (
          <Book
            key={book.id}
            book={book}
            highlighted={currentBookId === book.id}
            onClick={() => onSelect(book)}
          />
        ))}
      </ul>
    </div>
  );
};

export const PropType_BookGroup = PropTypes.shape({
  id: PropTypes.number,
  name: PropTypes.string,
  books: PropTypes.arrayOf(PropType_Book),
});

BookGroup.propTypes = {
  group: PropType_BookGroup.isRequired,
  currentBookId: PropTypes.number,
  onSelect: PropTypes.func,
};

BookGroup.defaultProps = {
  currentBookId: -1,
  onSelect: () => {},
};

export default BookGroup;
