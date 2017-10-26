import { React, PropTypes, cx } from 'app/bootstrap'; // eslint-disable-line

export const PropType_Book = PropTypes.shape({
  id: PropTypes.number,
  name: PropTypes.string,
  chapterCount: PropTypes.number,
});

const Book = ({ book, highlighted, onClick }) => {
  return (
    <li className={cx({ highlighted })}>
      <span onClick={onClick} role="button" tabIndex="0">
        {book.name}
      </span>
    </li>
  );
};

Book.propTypes = {
  book: PropType_Book.isRequired,
  highlighted: PropTypes.boolean,
  onClick: PropTypes.func,
};

Book.defaultProps = {
  highlighted: false,
  onClick: () => {},
};

export default Book;
