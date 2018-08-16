import { React, PropTypes, cx } from 'app/bootstrap'; // eslint-disable-line
import BookItem, { PropType_BookItem } from './BookItem';
import {filterBooks} from '../../consts/bible'
import styles from './BibleSelector.css';

const BookGroup = ({ group, currentBookId, listStyle, filter, onSelect }) => {
  const books = filterBooks(filter, group.books);
  return books.length > 0 ? (
    <div className={styles.bookGroup}>
      <div className={styles.title}>{group.name_cn}</div>
      {
        <ul className={styles[listStyle]}>
          {books.map(book => (
            <BookItem
              key={book.id}
              book={book}
              listStyle={listStyle}
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
  books: PropTypes.arrayOf(PropType_BookItem),
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
