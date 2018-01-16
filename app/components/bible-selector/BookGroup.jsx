import { React, PropTypes, cx } from 'app/bootstrap'; // eslint-disable-line
import escapeStringRegexp from 'escape-string-regexp';
import Book, { PropType_Book } from './Book';
import styles from './BibleSelector.css';

export const filterBooks = (filter, books) => {
  if (!filter) return books;

  return books.filter(book => {
    return book.name.match(new RegExp(escapeStringRegexp(filter)));
  });
}

const BookGroup = ({ group, currentBookId, listStyle, filter, onSelect }) => {
  const books = filterBooks(filter, group.books);
  return books.length > 0 ? (
    <div className={styles.bookGroup}>
      <div className={styles.title}>{group.name}</div>
      {
        <ul className={styles[listStyle]}>
          {books.map(book => (
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
  ) : null;
};

export const PropType_BookGroup = PropTypes.shape({
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  name: PropTypes.string,
  books: PropTypes.arrayOf(PropType_Book),
});

BookGroup.propTypes = {
  group: PropType_BookGroup.isRequired,
  currentBookId: PropTypes.number,
  listStyle: PropTypes.oneOf(['list', 'grid']),
  filter: PropTypes.string,
  onSelect: PropTypes.func,
};

BookGroup.defaultProps = {
  currentBookId: -1,
  listStyle: 'list',
  filter: '',
  onSelect: () => {},
};

export default BookGroup;
