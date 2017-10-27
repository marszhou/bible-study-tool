import { React, PropTypes, cx } from 'app/bootstrap'; // eslint-disable-line
import Book, { PropType_Book } from './Book';
import styles from './BibleSelector.css'

const BookGroup = ({ group, currentBookId, listStyle, onSelect }) => {
  return (
    <div className={styles.bookGroup}>
      <div className={styles.title}>{group.name}</div>
      {
        <ul className={styles[listStyle]}>
          {group.books.map(book => (
            <Book
              key={book.id}
              book={book}
              highlighted={currentBookId === book.id}
              onClick={() => onSelect(book)}
            />
          ))}
        </ul>
      }

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
  listStyle: PropTypes.oneOf(['list', 'grid']),
  onSelect: PropTypes.func,
};

BookGroup.defaultProps = {
  currentBookId: -1,
  listStyle: 'list',
  onSelect: () => {},
};

export default BookGroup;
